#!/bin/sh
# Install only LightsWeb domain files; yi.caddy is never read or changed.
set -eu
: "${SERVER:?Set SERVER to the SSH destination}"
for site in lightking.com.cn www.lightking.com.cn tools.lightking.com.cn; do
  scp "config/caddy/sites/$site.caddy" "$SERVER:/etc/caddy/sites/$site.caddy.new"
done
scp config/caddy/snippets/security.caddy "$SERVER:/etc/caddy/snippets/security.caddy.new"
scp config/caddy/snippets/errors.caddy "$SERVER:/etc/caddy/snippets/errors.caddy.new"
ssh "$SERVER" 'set -eu; mkdir -p /etc/caddy/sites /etc/caddy/snippets; for file in /etc/caddy/sites/lightking.com.cn.caddy.new /etc/caddy/sites/www.lightking.com.cn.caddy.new /etc/caddy/sites/tools.lightking.com.cn.caddy.new /etc/caddy/snippets/security.caddy.new /etc/caddy/snippets/errors.caddy.new; do mv "$file" "${file%.new}"; done; caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile; systemctl reload caddy'
