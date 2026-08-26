#!/usr/bin/env bash

# Copyright 2026 Taeyoon Lee. All Rights Reserved.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.


set -euo pipefail

readonly MISE_VERSION="2026.8.14"
readonly MISE_RELEASE_URL="https://github.com/jdx/mise/releases/download/v${MISE_VERSION}"

case "$(uname -s):$(uname -m)" in
  Darwin:arm64)
    readonly MISE_BINARY="mise-v${MISE_VERSION}-macos-arm64"
    readonly MISE_BINARY_SHA256="ba93b3fe7e47964e4392d40c8b7bfa5740e8c2a0a575e3e86268e9764082ed3e"
    ;;
  Darwin:x86_64)
    readonly MISE_BINARY="mise-v${MISE_VERSION}-macos-x64"
    readonly MISE_BINARY_SHA256="02fdcaac111c2eb056432172c1c5c469b335dfd95115140c3c5524a24a889c12"
    ;;
  Linux:aarch64|Linux:arm64)
    readonly MISE_BINARY="mise-v${MISE_VERSION}-linux-arm64"
    readonly MISE_BINARY_SHA256="bc2c447a7e498b0bed0a421cc2101b407fef09a3195670d35a4aa3f43cd868a1"
    ;;
  Linux:x86_64)
    readonly MISE_BINARY="mise-v${MISE_VERSION}-linux-x64"
    readonly MISE_BINARY_SHA256="7cd12d6002d5b3c83a89cad79023712faf2a36f9e8b2ee2061dac5135b3de0ed"
    ;;
  *)
    echo "Error: unsupported platform for the Mise bootstrap: $(uname -s) $(uname -m)" >&2
    exit 1
    ;;
esac

MISE_BOOTSTRAP_HOME="${MISE_BOOTSTRAP_HOME:-${HOME}/.mise-resume-${MISE_VERSION}}"
MISE_CACHE_DIR="${MISE_BOOTSTRAP_CACHE_DIRECTORY:-${MISE_BOOTSTRAP_HOME}/cache}"
MISE_DATA_DIR="${MISE_BOOTSTRAP_HOME}/data"
MISE_CONFIG_DIR="${MISE_BOOTSTRAP_HOME}/config"
MISE_STATE_DIR="${MISE_BOOTSTRAP_HOME}/state"
export MISE_CACHE_DIR
export MISE_CONFIG_DIR
export MISE_DATA_DIR
export MISE_STATE_DIR
export MISE_SYSTEM_DEPS=warn

readonly MISE_EXECUTABLE="${MISE_BOOTSTRAP_HOME}/bin/mise"
readonly PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

MISE_TEMPORARY_DIRECTORY=""

cleanup() {
  if [[ -n "$MISE_TEMPORARY_DIRECTORY" && -d "$MISE_TEMPORARY_DIRECTORY" ]]; then
    rm -rf -- "$MISE_TEMPORARY_DIRECTORY"
  fi
}

trap cleanup EXIT

calculate_sha256() {
  local file="$1"

  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$file" | awk '{ print $1 }'
    return
  fi

  if command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$file" | awk '{ print $1 }'
    return
  fi

  echo "Error: sha256sum or shasum is required to verify Mise." >&2
  exit 1
}

install_mise() {
  local current_sha256=""
  local current_version=""

  if [[ -x "$MISE_EXECUTABLE" ]]; then
    current_sha256="$(calculate_sha256 "$MISE_EXECUTABLE")"
    current_version="$("$MISE_EXECUTABLE" --version 2>/dev/null | awk '{ print $1 }' || true)"
  fi

  if [[ "$current_version" == "$MISE_VERSION" && "$current_sha256" == "$MISE_BINARY_SHA256" ]]; then
    return
  fi

  local binary_path
  local binary_sha256

  MISE_TEMPORARY_DIRECTORY="$(mktemp -d "${TMPDIR:-/tmp}/mise-resume.XXXXXX")"
  binary_path="${MISE_TEMPORARY_DIRECTORY}/${MISE_BINARY}"

  curl \
    --fail \
    --location \
    --retry 3 \
    --retry-all-errors \
    --show-error \
    --silent \
    "${MISE_RELEASE_URL}/${MISE_BINARY}" \
    --output "$binary_path"

  binary_sha256="$(calculate_sha256 "$binary_path")"

  if [[ "$binary_sha256" != "$MISE_BINARY_SHA256" ]]; then
    echo "Error: Mise binary checksum verification failed." >&2
    exit 1
  fi

  mkdir -p "${MISE_BOOTSTRAP_HOME}/bin"
  install -m 0755 "$binary_path" "$MISE_EXECUTABLE"

  current_sha256="$(calculate_sha256 "$MISE_EXECUTABLE")"
  current_version="$("$MISE_EXECUTABLE" --version 2>/dev/null | awk '{ print $1 }' || true)"

  if [[ "$current_version" != "$MISE_VERSION" || "$current_sha256" != "$MISE_BINARY_SHA256" ]]; then
    echo "Error: Mise ${MISE_VERSION} was not installed correctly." >&2
    exit 1
  fi

  cleanup
  MISE_TEMPORARY_DIRECTORY=""
}

install_mise
cd "$PROJECT_ROOT"
"$MISE_EXECUTABLE" install --locked
exec "$MISE_EXECUTABLE" exec -- yarn "$@"
