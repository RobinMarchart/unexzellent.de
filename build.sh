#! /usr/bin/env bash
set -e
dir="$(dirname -- "$(readlink -f -- "$0")")"
if  "$dir" == "$(readlink "$(pwd)")";then
  echo "output dir should not be repo root"
  exit 1
else
  pushd "$dir/exmatriculation"
  wasm-pack build --release --target=web -- --no-default-features
  cp pkg/* assets/js/exmatriculation/
  popd
  mkdir -p assets images
  cp -r "$dir"/assets/* assets/
  cp -r "$dir"/exmatriculation/assets/* assets/
  cp -r "$dir"/images/* images/
  cp -r "$dir/index.html" ./
  cp -r "$dir/CNAME" ./
fi

