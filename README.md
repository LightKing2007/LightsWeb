# LightsWeb

LightKing 的独立静态网站仓库。与 `yi` 仓库、Node 服务及 `yi.caddy` 完全分离。

## 站点

- `lightking.com.cn`：301 跳转到个人主页。
- `www.lightking.com.cn`：个人主页、摄影作品及公共资源。
- `tools.lightking.com.cn`：工具站与随机数工具。

每个域名在 `config/caddy/sites/` 中有独立配置。页面由 Caddy `file_server` 直接提供，证书由 Caddy 自动管理。

## 发布

```sh
SERVER=user@example.com sh scripts/deploy.sh
```

发布只更新 `/opt/lightsweb/current`。首次配置或配置变化时：

```sh
SERVER=user@example.com sh scripts/install-caddy.sh
```

部署前需确保 DNS 已指向服务器，且服务器安全组放行 80、443。
