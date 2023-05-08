#!/bin/bash

set -eo pipefail

TEST="${1}"
ENTRY_POINT="${2:-}"

# export CHAIN_A_TAG="${CHAIN_A_TAG:-latest}"
# export CHAIN_IMAGE="${CHAIN_IMAGE:-ibc-go-simd}"
# export CHAIN_BINARY="${CHAIN_BINARY:-simd}"

export CHAIN_A_TAG="v4.3.0"
export CHAIN_B_TAG="v4.3.0"
export CHAIN_IMAGE="ghcr.io/cosmos/ibc-go-simd"
export CHAIN_BINARY="simd"
export CHAIN_UPGRADE_TAG="v5.1.0"
export CHAIN_UPGRADE_PLAN="normal upgrade"

# if test is set, that is used directly, otherwise the test can be interactively provided if fzf is installed.
TEST="$(_get_test ${TEST})"

# if jq is installed, we can automatically determine the test entrypoint.
if command -v jq > /dev/null; then
   cd ..
   ENTRY_POINT="$(go run -mod=readonly cmd/build_test_matrix/main.go | jq -r --arg TEST "${TEST}" '.include[] | select( .test == $TEST)  | .entrypoint')"
   cd - > /dev/null
fi


# find the name of the file that has this test in it.
test_file="$(grep --recursive --files-with-matches './' -e "${TEST}()")"

# we run the test on the directory as specific files may reference types in other files but within the package.
test_dir="$(dirname $test_file)"

# run the test file directly, this allows log output to be streamed directly in the terminal sessions
# without needed to wait for the test to finish.
go test -v "${test_dir}" --run ${ENTRY_POINT} -testify.m ^${TEST}$
