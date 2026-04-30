**Lead: Gian**

Simple guide to use this backend.

## 1) Start the backend

From `Project/` run:

```bash
docker compose up -d --build
```

Backend runs on:

`http://localhost:3000`

## 2) How authentication works

1. Register a user (`POST /users/register`)
2. Login (`POST /users/login`)
3. Copy the returned `accessToken`
4. Send token in protected routes:

`Authorization: Bearer <accessToken>`

## 3) Main API idea

1. Create and manage portfolios
2. Add modules inside a portfolio:
	- Translations
	- Versions
	- Projects
	- Skills
	- Social Links
	- Experiences
	- Educations

All module routes are under:

`/portfolio/:id/...`

## 4) Image upload (project image)

Use:

`POST /portfolio/:id/projects/:projectId/image`

Request type:

`multipart/form-data` with field name `image`

Result:

1. File is saved locally in backend uploads
2. Project gets an `imageUrl` saved in database (`Project.img_url`)

## 5) Easiest way to test

Use VS Code REST Client with:

1. `Project/Backend/examplerequests.rest` (auth + portfolio basics)
2. `Project/Backend/examplerequests.modules.rest` (translations, versions, module CRUD + upload)

## 6) Notes

1. SQL data is persisted in Docker volume `mssql-data`
2. Uploaded image files are currently local backend files

If something is unclear, ask directly.
to play around with the backend simply use the examplerequests.rest and examplerequests.modules.rest files with the VS-CODE Rest-Client Extension!