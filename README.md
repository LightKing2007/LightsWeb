# LightsWeb

LightsWeb 只是网站源代码仓库的名称，不对应服务器上的统一网站目录或进程。每个网站独立部署、独立配置：

- `lightking.com.cn`：301 跳转到个人主页。
- `www.lightking.com.cn`：个人主页，部署到 `/opt/www/www.lightking.com.cn/`。
- `tools.lightking.com.cn`：工具站，部署到 `/opt/www/tools.lightking.com.cn/`。

各域名的 Caddy 配置位于 `config/caddy/sites/`，页面由 Caddy `file_server` 直接提供。`yi` 因其联机服务需要，继续使用自己的 Node 服务和 `/opt/yi/` 结构。

## 单独发布一个网站

```sh
SERVER=root@lightking.com.cn sh scripts/deploy.sh www.lightking.com.cn
SERVER=root@lightking.com.cn sh scripts/deploy.sh tools.lightking.com.cn
```

首次配置或配置变化时使用 `scripts/install-caddy.sh`。DNS 需指向服务器，并放行 80、443。
