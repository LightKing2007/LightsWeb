# Caddy 主配置

服务器 47.108.181.240（Ubuntu 24.04）以 Caddy 作为各站点的入口，负责 HTTPS 证书与反向代理。

## 文件

| 文件 | 安装位置 | 说明 |
|---|---|---|
| `Caddyfile` | `/etc/caddy/Caddyfile` | 主配置，只引入 `/etc/caddy/sites/*.caddy` |
| 各站点的 `*.caddy` | `/etc/caddy/sites/` | 由各站点自己的仓库维护与安装 |

目前的站点：

| 域名 | 配置来源 |
|---|---|
| `yi.lightking.com.cn` | LightKing2007/yi 的 `scripts/server/yi.caddy` |

## 安装 Caddy

按 Caddy 官方文档使用官方 apt 源（2026-10-13 安装的版本为 v2.11.7）：

```sh
apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/gpg.key | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt > /etc/apt/sources.list.d/caddy-stable.list
chmod o+r /usr/share/keyrings/caddy-stable-archive-keyring.gpg /etc/apt/sources.list.d/caddy-stable.list
apt-get update && apt-get install -y caddy
```

## 放行端口

阿里云安全组与服务器上的 ufw 均须放行 80 与 443（Let's Encrypt 验证与 HTTP 跳转 HTTPS 使用 80）：

```sh
ufw allow 80/tcp comment caddy
ufw allow 443/tcp comment caddy
```

## 安装或更新主配置

```sh
scp config/caddy/Caddyfile root@47.108.181.240:/etc/caddy/Caddyfile.new
ssh root@47.108.181.240 'mkdir -p /etc/caddy/sites && cd /etc/caddy && cp Caddyfile Caddyfile.prev && mv Caddyfile.new Caddyfile && caddy validate --config Caddyfile --adapter caddyfile && systemctl reload caddy || { mv Caddyfile.prev Caddyfile; systemctl reload caddy; }'
```

新增站点时，在该站点的仓库中编写 `<站点>.caddy` 并安装到 `/etc/caddy/sites/`，主配置无须修改。
