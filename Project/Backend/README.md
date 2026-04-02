# Backend

**Lead: Gian**

## Using examplerequests.rest (short)

Install the Rest-Client Extension!
1. Start containers from `Project/` with `docker compose up -d --build`.
2. Open `Project/Backend/examplerequests.rest` in VS Code REST Client.
3. Run in this order: register/login -> copy token -> create/list portfolios.
4. Use `Authorization: Bearer <accessToken>` for portfolio endpoints.