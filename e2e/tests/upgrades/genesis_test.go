package upgrades

import (
	"context"
	"encoding/json"
	"os"
	"testing"
	"time"

	tmjson "github.com/cometbft/cometbft/libs/json"
	"github.com/cosmos/ibc-go/e2e/testconfig"
	"github.com/cosmos/ibc-go/e2e/testsuite"
	cosmos "github.com/strangelove-ventures/interchaintest/v7/chain/cosmos"
	test "github.com/strangelove-ventures/interchaintest/v7/testutil"
	"github.com/stretchr/testify/suite"

	"github.com/cosmos/ibc-go/e2e/dockerutil"
	"github.com/cosmos/ibc-go/e2e/testvalues"
)

type GenesisState map[string]json.RawMessage

func TestGenesisTestSuite(t *testing.T) {
	suite.Run(t, new(GenesisTestSuite))
}

type GenesisTestSuite struct {
	testsuite.E2ETestSuite
	cosmos.ChainNode
}

func (s *GenesisTestSuite) TestIBCGenesis() {
	t := s.T()

	configFileOverrides := make(map[string]any)
	appTomlOverrides := make(test.Toml)

	appTomlOverrides["halt-height"] = haltHeight
	configFileOverrides["config/app.toml"] = appTomlOverrides
	chainOpts := func(options *testconfig.ChainOptions) {
		options.ChainAConfig.ConfigFileOverrides = configFileOverrides
	}

	// create chains with specified chain configuration options
	chainA, chainB := s.GetChains(chainOpts)

	ctx := context.Background()
	relayer, channelA := s.SetupChainsRelayerAndChannel(ctx)

	var (
		chainADenom    = chainA.Config().Denom
		chainBIBCToken = testsuite.GetIBCToken(chainADenom, channelA.Counterparty.PortID, channelA.Counterparty.ChannelID) // IBC token sent to chainB

	)

	chainAWallet := s.CreateUserOnChainA(ctx, testvalues.StartingTokenAmount)
	chainAAddress := chainAWallet.FormattedAddress()

	chainBWallet := s.CreateUserOnChainB(ctx, testvalues.StartingTokenAmount)
	chainBAddress := chainBWallet.FormattedAddress()

	s.Require().NoError(test.WaitForBlocks(ctx, 1, chainA, chainB), "failed to wait for blocks")

	t.Run("native IBC token transfer from chainA to chainB, sender is source of tokens", func(t *testing.T) {
		transferTxResp, err := s.Transfer(ctx, chainA, chainAWallet, channelA.PortID, channelA.ChannelID, testvalues.DefaultTransferAmount(chainADenom), chainAAddress, chainBAddress, s.GetTimeoutHeight(ctx, chainB), 0, "")
		s.Require().NoError(err)
		s.AssertValidTxResponse(transferTxResp)
	})

	t.Run("tokens are escrowed", func(t *testing.T) {
		actualBalance, err := s.GetChainANativeBalance(ctx, chainAWallet)
		s.Require().NoError(err)

		expected := testvalues.StartingTokenAmount - testvalues.IBCTransferAmount
		s.Require().Equal(expected, actualBalance)
	})

	t.Run("start relayer", func(t *testing.T) {
		s.StartRelayer(relayer)
	})

	t.Run("packets are relayed", func(t *testing.T) {
		s.AssertPacketRelayed(ctx, chainA, channelA.PortID, channelA.ChannelID, 1)

		actualBalance, err := chainB.GetBalance(ctx, chainBAddress, chainBIBCToken.IBCDenom())
		s.Require().NoError(err)

		expected := testvalues.IBCTransferAmount
		s.Require().Equal(expected, actualBalance)
	})

	s.Require().NoError(test.WaitForBlocks(ctx, 10, chainA, chainB), "failed to wait for blocks")

	t.Run("Halt chain and export genesis", func(t *testing.T) {
		s.HaltChainAndExportGenesis(ctx, chainA, int64(haltHeight))
	})

	t.Run("native IBC token transfer from chainA to chainB, sender is source of tokens", func(t *testing.T) {
		transferTxResp, err := s.Transfer(ctx, chainA, chainAWallet, channelA.PortID, channelA.ChannelID, testvalues.DefaultTransferAmount(chainADenom), chainAAddress, chainBAddress, s.GetTimeoutHeight(ctx, chainB), 0, "")
		s.Require().NoError(err)
		s.AssertValidTxResponse(transferTxResp)
	})

	t.Run("tokens are escrowed", func(t *testing.T) {
		actualBalance, err := s.GetChainANativeBalance(ctx, chainAWallet)
		s.Require().NoError(err)

		expected := testvalues.StartingTokenAmount - testvalues.IBCTransferAmount
		s.Require().Equal(expected, actualBalance)
	})

	s.Require().NoError(test.WaitForBlocks(ctx, 5, chainA, chainB), "failed to wait for blocks")
}

func (s *GenesisTestSuite) HaltChainAndExportGenesis(ctx context.Context, chain *cosmos.CosmosChain, haltHeight int64) {
	var genesisState GenesisState

	timeoutCtx, timeoutCtxCancel := context.WithTimeout(ctx, time.Minute*2)
	defer timeoutCtxCancel()

	err := test.WaitForBlocks(timeoutCtx, int(haltHeight), chain)
	s.Require().Error(err, "chain did not halt at halt height")

	state, err := chain.ExportState(ctx, int64(haltHeight))
	s.Require().NoError(err)

	err = tmjson.Unmarshal([]byte(state), &genesisState)
	s.Require().NoError(err)

	genesisJson, err := tmjson.MarshalIndent(genesisState, "", "  ")
	s.Require().NoError(err)
	err = os.WriteFile("/tmp/genesis.json", genesisJson, 0777)
	s.Require().NoError(err)

	err = chain.StopAllNodes(ctx)
	s.Require().NoError(err, "error stopping node(s)")

	dockerutil.ReconfigureHaltHeight(s.T(), ctx, chain)
	err = chain.StartAllNodes(ctx)
	s.Require().NoError(err, "error starting node(s)")

	s.Require().NoError(err)
	err = dockerutil.SetGenesisContentsToContainer(s.T(), ctx, chain)
	s.Require().NoError(err)

	err = chain.Validators[0].UnsafeResetAll(ctx)
	s.Require().NoError(err)

	timeoutCtx, timeoutCtxCancel = context.WithTimeout(ctx, time.Minute*2)
	defer timeoutCtxCancel()

	err = test.WaitForBlocks(timeoutCtx, int(blocksAfterUpgrade), chain)
	s.Require().NoError(err, "chain did not produce blocks after halt")

	height, err := chain.Height(ctx)
	s.Require().NoError(err, "error fetching height after halt")

	s.Require().Greater(height, haltHeight, "height did not increment after halt")
}
