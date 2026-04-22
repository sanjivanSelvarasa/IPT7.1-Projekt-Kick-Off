**Autor:** Egor & Sanjivan
**Datum:** 02. April 2026

# Entity-Relationship Diagram

## Entitäten mit Attributen & PK/FK

---

### User

| Attribut           | Datentyp      | Schlüsseltyp |
| ------------------ | ------------- | ------------ |
| id                 | INT           | PK           |
| username           | NVARCHAR(50)  | UQ           |
| email              | NVARCHAR(100) | UQ           |
| password_hash      | NVARCHAR(255) | -            |
| first_name         | NVARCHAR(50)  | -            |
| last_name          | NVARCHAR(50)  | -            |
| profile_img        | NVARCHAR(255) | -            |
| bio                | NVARCHAR(MAX) | -            |
| preferred_language | NVARCHAR(10)  | -            |
| created_at         | DATETIME2     | -            |
| updated_at         | DATETIME2     | -            |

**Beschreibung:**  
Speichert die Benutzerdaten für Login, Profil und Spracheinstellungen.

Beziehung:

- User **1 - N** Portfolio
- User **1 - N** UserRefreshToken
- User **1 - N** Media

---

### UserRefreshToken

| Attribut   | Datentyp       | Schlüsseltyp |
| ---------- | -------------- | ------------ |
| id         | INT            | PK           |
| user_id    | INT            | FK → User.id |
| token_hash | NVARCHAR(2048) | UQ           |
| expires_at | DATETIME2      | -            |
| revoked_at | DATETIME2      | -            |
| created_at | DATETIME2      | -            |

**Beschreibung:**  
Speichert Refresh Tokens für die Authentifizierung und Gültigkeit.

Beziehung:

- UserRefreshToken **N - 1** User

---

### Template

| Attribut    | Datentyp      | Schlüsseltyp |
| ----------- | ------------- | ------------ |
| id          | INT           | PK           |
| name        | NVARCHAR(50)  | UQ           |
| description | NVARCHAR(MAX) | -            |
| layout_type | NVARCHAR(50)  | -            |
| preview_img | NVARCHAR(255) | -            |
| created_at  | DATETIME2     | -            |

**Beschreibung:**  
Enthält die verfügbaren Grundtemplates für das Portfolio-Layout.

Beziehung:

- Template **1 - N** Portfolio

---

### Portfolio

| Attribut           | Datentyp      | Schlüsseltyp              |
| ------------------ | ------------- | ------------------------- |
| id                 | INT           | PK                        |
| user_id            | INT           | FK → User.id              |
| template_id        | INT           | FK → Template.id          |
| current_theme_id   | INT           | FK → Theme.id             |
| title              | NVARCHAR(100) | -                         |
| description        | NVARCHAR(MAX) | -                         |
| slug               | NVARCHAR(100) | UQ                        |
| visibility         | NVARCHAR(20)  | -                         |
| is_published       | BIT           | -                         |
| published_at       | DATETIME2     | -                         |
| current_version_id | INT           | FK → PortfolioVersion.id  |
| language_code      | NVARCHAR(10)  | -                         |
| created_at         | DATETIME2     | -                         |
| updated_at         | DATETIME2     | -                         |

**Beschreibung:**  
Zentrale Tabelle für ein Portfolio. Enthält Metadaten, Veröffentlichungsstatus sowie Referenzen auf Benutzer, Template, aktuelles Theme und aktuelle Version.

Beziehung:

- Portfolio **N - 1** User
- Portfolio **N - 1** Template
- Portfolio **1 - N** Theme
- Portfolio **1 - N** PortfolioVersion
- Portfolio **1 - N** Project
- Portfolio **1 - N** PortfolioSkill
- Portfolio **1 - N** SocialLink
- Portfolio **1 - N** Experience
- Portfolio **1 - N** Education
- Portfolio **1 - N** Media
- Portfolio **1 - N** PortfolioTranslation
- Portfolio **N - M** Skill _(über PortfolioSkill)_

**Hinweis:**  
Ein Portfolio kann mehrere Themes und mehrere Versionen besitzen. `current_theme_id` verweist auf das aktuell verwendete Theme und `current_version_id` auf die aktuell verwendete Version. Das entspricht direkt dem SQL-Schema. :contentReference[oaicite:3]{index=3} :contentReference[oaicite:4]{index=4}

---

### Theme

| Attribut         | Datentyp      | Schlüsseltyp      |
| ---------------- | ------------- | ----------------- |
| id               | INT           | PK                |
| portfolio_id     | INT           | FK → Portfolio.id |
| primary_color    | NVARCHAR(20)  | -                 |
| secondary_color  | NVARCHAR(20)  | -                 |
| background_color | NVARCHAR(20)  | -                 |
| surface_color    | NVARCHAR(20)  | -                 |
| text_color       | NVARCHAR(20)  | -                 |
| accent_color     | NVARCHAR(20)  | -                 |
| font_family      | NVARCHAR(100) | -                 |
| created_at       | DATETIME2     | -                 |
| updated_at       | DATETIME2     | -                 |

**Beschreibung:**  
Speichert die Design-Einstellungen eines Portfolios.

Beziehung:

- Theme **N - 1** Portfolio

**Hinweis:**  
Die frühere Beziehung `Portfolio 1 - 1 Theme` war inkonsistent. Durch `Theme.portfolio_id` ist im SQL klar modelliert, dass ein Portfolio mehrere Themes haben kann. Das aktuell aktive Theme wird zusätzlich in `Portfolio.current_theme_id` gespeichert. :contentReference[oaicite:5]{index=5}

---

### PortfolioVersion

| Attribut       | Datentyp      | Schlüsseltyp      |
| -------------- | ------------- | ----------------- |
| id             | INT           | PK                |
| portfolio_id   | INT           | FK → Portfolio.id |
| version_number | INT           | -                 |
| title_snapshot | NVARCHAR(100) | -                 |
| is_published   | BIT           | -                 |
| created_at     | DATETIME2     | -                 |

**Beschreibung:**  
Speichert Versionen eines Portfolios, damit Entwürfe und frühere Stände wiederhergestellt werden können.

Beziehung:

- PortfolioVersion **N - 1** Portfolio
- PortfolioVersion **1 - N** PortfolioSection

**Hinweis:**  
Die Beziehung ist **nicht** `Portfolio 1 - 1 PortfolioVersion`, sondern `Portfolio 1 - N PortfolioVersion`. Die aktuelle Version wird separat über `Portfolio.current_version_id` referenziert. :contentReference[oaicite:6]{index=6}

---

### PortfolioSection

| Attribut             | Datentyp      | Schlüsseltyp              |
| -------------------- | ------------- | ------------------------- |
| id                   | INT           | PK                        |
| portfolio_version_id | INT           | FK → PortfolioVersion.id  |
| section_type         | NVARCHAR(50)  | -                         |
| title                | NVARCHAR(100) | -                         |
| sort_order           | INT           | -                         |
| is_visible           | BIT           | -                         |
| created_at           | DATETIME2     | -                         |
| updated_at           | DATETIME2     | -                         |

**Beschreibung:**  
Beschreibt die einzelnen Bereiche eines Portfolios innerhalb einer bestimmten Version, z. B. Hero, Projekte oder Skills.

Beziehung:

- PortfolioSection **N - 1** PortfolioVersion
- PortfolioSection **1 - N** EditorBlock

---

### EditorBlock

| Attribut     | Datentyp      | Schlüsseltyp              |
| ------------ | ------------- | ------------------------- |
| id           | INT           | PK                        |
| section_id   | INT           | FK → PortfolioSection.id  |
| block_type   | NVARCHAR(50)  | -                         |
| content_json | NVARCHAR(MAX) | -                         |
| sort_order   | INT           | -                         |
| created_at   | DATETIME2     | -                         |
| updated_at   | DATETIME2     | -                         |

**Beschreibung:**  
Speichert die eigentlichen Bausteine des Editors wie Text, Bild, Projekt oder andere Komponenten.

Beziehung:

- EditorBlock **N - 1** PortfolioSection

---

### Media

| Attribut     | Datentyp      | Schlüsseltyp      |
| ------------ | ------------- | ----------------- |
| id           | INT           | PK                |
| user_id      | INT           | FK → User.id      |
| portfolio_id | INT           | FK → Portfolio.id |
| file_name    | NVARCHAR(255) | -                 |
| file_url     | NVARCHAR(255) | -                 |
| mime_type    | NVARCHAR(100) | -                 |
| file_size    | INT           | -                 |
| alt_text     | NVARCHAR(255) | -                 |
| created_at   | DATETIME2     | -                 |

**Beschreibung:**  
Verwaltet hochgeladene Medien wie Bilder für Profil, Projekte oder Editor-Blöcke.

Beziehung:

- Media **N - 1** User
- Media **N - 1** Portfolio

**Hinweis:**  
Da im SQL sowohl `user_id` als auch `portfolio_id` als Fremdschlüssel definiert sind, bleibt diese doppelte Zuordnung bestehen und wird dokumentiert, nicht entfernt. :contentReference[oaicite:7]{index=7} :contentReference[oaicite:8]{index=8}

---

### Project

| Attribut     | Datentyp      | Schlüsseltyp      |
| ------------ | ------------- | ----------------- |
| id           | INT           | PK                |
| portfolio_id | INT           | FK → Portfolio.id |
| title        | NVARCHAR(100) | -                 |
| description  | NVARCHAR(MAX) | -                 |
| sort_order   | INT           | -                 |
| img_url      | NVARCHAR(255) | -                 |
| project_url  | NVARCHAR(255) | -                 |
| github_url   | NVARCHAR(255) | -                 |
| start_date   | DATE          | -                 |
| end_date     | DATE          | -                 |
| created_at   | DATETIME2     | -                 |
| updated_at   | DATETIME2     | -                 |

**Beschreibung:**  
Speichert Projekte, die in einem Portfolio angezeigt werden.

Beziehung:

- Project **N - 1** Portfolio

---

### Skill

| Attribut    | Datentyp      | Schlüsseltyp |
| ----------- | ------------- | ------------ |
| id          | INT           | PK           |
| name        | NVARCHAR(50)  | UQ           |
| description | NVARCHAR(MAX) | -            |
| created_at  | DATETIME2     | -            |

**Beschreibung:**  
Skill-Tabelle, die im Portfolio gezeigt werden kann.

Beziehung:

- Skill **1 - N** PortfolioSkill
- Skill **N - M** Portfolio _(über PortfolioSkill)_

---

### PortfolioSkill

| Attribut     | Datentyp  | Schlüsseltyp      |
| ------------ | --------- | ----------------- |
| id           | INT       | PK                |
| portfolio_id | INT       | FK → Portfolio.id |
| skill_id     | INT       | FK → Skill.id     |
| level        | TINYINT   | -                 |
| sort_order   | INT       | -                 |
| created_at   | DATETIME2 | -                 |

**Beschreibung:**  
Verbindet Skills mit einem Portfolio und speichert das Level des Skills.

Beziehung:

- PortfolioSkill **N - 1** Portfolio
- PortfolioSkill **N - 1** Skill

---

### SocialLink

| Attribut     | Datentyp      | Schlüsseltyp      |
| ------------ | ------------- | ----------------- |
| id           | INT           | PK                |
| portfolio_id | INT           | FK → Portfolio.id |
| platform     | NVARCHAR(50)  | -                 |
| url          | NVARCHAR(255) | -                 |
| created_at   | DATETIME2     | -                 |

**Beschreibung:**  
Speichert Social-Media- oder Kontaktlinks für ein Portfolio.

Beziehung:

- SocialLink **N - 1** Portfolio

---

### Experience

| Attribut     | Datentyp      | Schlüsseltyp      |
| ------------ | ------------- | ----------------- |
| id           | INT           | PK                |
| portfolio_id | INT           | FK → Portfolio.id |
| company_name | NVARCHAR(100) | -                 |
| position     | NVARCHAR(100) | -                 |
| sort_order   | INT           | -                 |
| description  | NVARCHAR(MAX) | -                 |
| start_date   | DATE          | -                 |
| end_date     | DATE          | -                 |
| created_at   | DATETIME2     | -                 |

**Beschreibung:**  
Speichert Berufserfahrungen, die im Portfolio dargestellt werden.

Beziehung:

- Experience **N - 1** Portfolio

---

### Education

| Attribut         | Datentyp      | Schlüsseltyp      |
| ---------------- | ------------- | ----------------- |
| id               | INT           | PK                |
| portfolio_id     | INT           | FK → Portfolio.id |
| institution_name | NVARCHAR(100) | -                 |
| degree           | NVARCHAR(100) | -                 |
| field_of_study   | NVARCHAR(100) | -                 |
| sort_order       | INT           | -                 |
| start_date       | DATE          | -                 |
| end_date         | DATE          | -                 |
| created_at       | DATETIME2     | -                 |

**Beschreibung:**  
Speichert Ausbildungsinformationen für das Portfolio.

Beziehung:

- Education **N - 1** Portfolio

---

### PortfolioTranslation

| Attribut      | Datentyp      | Schlüsseltyp      |
| ------------- | ------------- | ----------------- |
| id            | INT           | PK                |
| portfolio_id  | INT           | FK → Portfolio.id |
| language_code | NVARCHAR(10)  | -                 |
| title         | NVARCHAR(100) | -                 |
| description   | NVARCHAR(MAX) | -                 |
| created_at    | DATETIME2     | -                 |
| updated_at    | DATETIME2     | -                 |

**Beschreibung:**  
Ermöglicht alternative Sprachversionen für Titel und Beschreibung eines Portfolios.

Beziehung:

- PortfolioTranslation **N - 1** Portfolio

**Hinweis:**  
`Portfolio.language_code` bleibt die Hauptsprache des Portfolios. Zusätzliche Sprachvarianten werden in `PortfolioTranslation` gespeichert. Dadurch ist die Tabelle nicht widersprüchlich, sondern ergänzt das Portfolio um weitere Übersetzungen. :contentReference[oaicite:9]{index=9}

---