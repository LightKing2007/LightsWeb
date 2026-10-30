#!/bin/sh
# Deploy one independent website: sh scripts/deploy.sh www.lightking.com.cn
set -eu
: "${SERVER:?Set SERVER to the SSH destination}"
SITE=${1:?Usage: deploy.sh www.lightking.com.cn|tools.lightking.com.cn}
case "$SITE" in
  www.lightking.com.cn) SOURCE=www.lightking.me ;;
  tools.lightking.com.cn) SOURCE=tools.lightking.me ;;
  *) echo "Unknown site: $SITE" >&2; exit 64 ;;
esac
DEST=/opt/www/$SITE
PACKAGE=$(mktemp)
trap 'rm -f "$PACKAGE"' EXIT
tar -czf "$PACKAGE" -C "pages/$SOURCE" .
cat "$PACKAGE" | ssh "$SERVER" "set -eu; tmp=\$(mktemp -d /opt/www/.$SITE.XXXXXX); trap 'rm -rf \"\$tmp\"' EXIT; tar -xzf - -C \"\$tmp\"; test -f \"\$tmp/index.html\"; mkdir -p '$DEST'; cp -a \"\$tmp\"/. '$DEST'/"
echo "Deployed $SITE to $DEST"
