**Autor:** Egor
**Date:** 19. März 2026

# Entity-Relationsship Diagram

## Entitäten mit Attributen & PK/FK

### User

| Attribute     | Datentyp      | Schlüsseltyp |
| ------------- | ------------- | ------------ |
| id            | INT           | PK           |
| username      | NVARCHAR(50)  | UQ           |
| email         | NVARCHAR(100) | UQ           |
| password_hash | NVARCHAR(255) | -            |
| first_name    | NVARCHAR(50)  | -            |
| last_name     | NVARCHAR(50)  | -            |
| profile_img   | NVARCHAR(255) | -            |
| bio           | NVARCHAR(MAX) | -            |
| created_at    | DATETIME2     | -            |
| updated_at    | DATETIME2     | -            |

---

### Portfolio

| Attribute   | Datentyp      | Schlüsseltyp      |
| ----------- | ------------- | ----------------- |
| id          | INT           | PK                |
| user_id     | INT           | FK -> user.id     |
| template_id | INT           | FK -> template.id |
| title       | NVARCHAR(100) | -                 |
| desc        | NVARCHAR(MAX) | -                 |
| slug        | NVARCHAR(100) | UQ                |
| visibility  | NVARCHAR(20)  | -                 |
| created_at  | DATETIME2     | -                 |
| updated_at  | DATETIME2     | -                 |

---

### Project

| Attribute    | Datentyp      | Schlüsseltyp      |
| ------------ | ------------- | ----------------- |
| id           | INT           | PK                |
| portfolio_id | INT           | FK -> profolio.id |
| title        | NVARCHAR(100) | -                 |
| desc         | NVARCHAR(MAX) | -                 |
| img_url      | NVARCHAR(255) | -                 |
| project_url  | NVARCHAR(255) | -                 |
| github_url   | NVARCHAR(255) | -                 |
| start_date   | DATE          | -                 |
| end_date     | DATE          | -                 |
| created_at   | DATETIME2     | -                 |
| updated_at   | DATETIME2     | -                 |

---

### Skill

| Attribute  | Datentyp      | Schlüsseltyp |
| ---------- | ------------- | ------------ |
| id         | INT           | PK           |
| name       | NVARCHAR(50)  | UQ           |
| desc       | NVARCHAR(MAX) | -            |
| created_at | DATETIME2     | -            |

---

### PortfolioSkill

| Attribute    | Datentyp  | Schlüsseltyp       |
| ------------ | --------- | ------------------ |
| id           | INT       | PK                 |
| portfolio_id | INT       | FK -> portfolio.id |
| skill_id     | INT       | FK -> skill.id     |
| level        | TINYINT   | -                  |
| created_at   | DATETIME2 | -                  |

---

### Template

| Attribute   | Datentyp      | Schlüsseltyp |
| ----------- | ------------- | ------------ |
| id          | INT           | PK           |
| name        | NVARCHAR(50)  | UQ           |
| desc        | NVARCHAR(MAX) | -            |
| layout_type | NVARCHAR(50)  | -            |
| color_theme | NVARCHAR(50)  | -            |
| created_at  | DATETIME2     | -            |

---

### SocialLink

| Attribute    | Datentyp      | Schlüsseltyp       |
| ------------ | ------------- | ------------------ |
| id           | INT           | PK                 |
| portfolio_id | INT           | FK -> portfolio.id |
| platform     | NVARCHAR(50)  | -                  |
| url          | NVARCHAR(255) | -                  |
| created_at   | DATETIME2     | -                  |

---

### Experience

| Attribute    | Datentyp      | Schlüsseltyp       |
| ------------ | ------------- | ------------------ |
| id           | INT           | PK                 |
| portfolio_id | INT           | FK -> portfolio.id |
| company_name | NVARCHAR(100) | -                  |
| position     | NVARCHAR(100) | -                  |
| desc         | NVARCAHR(MAX) | -                  |
| start_date   | DATE          | -                  |
| end_date     | DATE          | -                  |
| created_at   | DATETIME2     | -                  |

---

### Education

| Attribute        | Datentyp      | Schlüsseltyp       |
| ---------------- | ------------- | ------------------ |
| id               | INT           | PK                 |
| portfolio_id     | INT           | FK -> portfolio.id |
| institution_name | NVARCHAR(100) | -                  |
| degree           | NVARCHAR(100) | -                  |
| field_of_study   | NVARCHAR(100) | -                  |
| start_date       | DATE          | -                  |
| end_date         | DATE          | -                  |
| created_at       | DATETIME2     | -                  |

---
