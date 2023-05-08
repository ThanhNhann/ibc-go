#!/bin/bash

set -eo pipefail

ENTRY_POINT="${1}"
TEST="${2}"

# export CHAIN_A_TAG="${CHAIN_A_TAG:-latest}"
# export CHAIN_IMAGE="${CHAIN_IMAGE:-ibc-go-simd}"
# export CHAIN_BINARY="${CHAIN_BINARY:-simd}"

export CHAIN_A_TAG="v4.3.0"
export CHAIN_B_TAG="v4.3.0"
export CHAIN_IMAGE="ghcr.io/cosmos/ibc-go-simd"
export CHAIN_BINARY="simd"
export CHAIN_UPGRADE_TAG="v5.1.0"
export CHAIN_UPGRADE_PLAN="normal upgrade"

go test -v ./tests/... --run ${ENTRY_POINT} -testify.m ^${TEST}$
