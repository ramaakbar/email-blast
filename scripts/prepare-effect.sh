#!/usr/bin/env sh

set -eu

# Resolve the repository root from this script's location, so the script
# works no matter which package directory invokes it via npm `prepare`.
root="$(cd "$(dirname "$0")/.." && pwd)"
repo_dir="$root/.repos/effect"
repo_url="https://github.com/Effect-TS/effect"

if [ -d "$repo_dir/.git" ]; then
  exit 0
fi

mkdir -p "$root/.repos"
git clone "$repo_url" "$repo_dir"
