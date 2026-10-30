#!/bin/sh
# Deploy pages atomically without touching yi or its Caddy configuration.
set -eu
: "${SERVER:?Set SERVER to the SSH destination}"
VERSION=${1:-$(date -u +%Y%m%d%H%M%S)}
ROOT=/opt/lightsweb
PACKAGE=$(mktemp)
trap 'rm -f "$PACKAGE"' EXIT
tar -czf "$PACKAGE" pages
ssh "$SERVER" "mkdir -p '$ROOT/releases/$VERSION'"
cat "$PACKAGE" | ssh "$SERVER" "tar -xzf - -C '$ROOT/releases/$VERSION'"
ssh "$SERVER" "set -eu; test -f '$ROOT/releases/$VERSION/pages/www.lightking.me/index.html'; test -f '$ROOT/releases/$VERSION/pages/tools.lightking.me/random/index.html'; ln -sfn '$ROOT/releases/$VERSION' '$ROOT/current.new'; mv -Tf '$ROOT/current.new' '$ROOT/current'; if test -L '$ROOT/previous'; then rm '$ROOT/previous'; fi"
echo "Deployed LightsWeb $VERSION"
