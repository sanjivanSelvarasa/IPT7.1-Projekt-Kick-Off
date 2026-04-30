# Datenbankrelationen (MS SQL)

## Überblick

Die Datenbank basiert auf dem Schema in `Project/Database/CreateYourselfDB.sql`.
Zentrale Entitäten:

- User
- Portfolio
- PortfolioVersion
- PortfolioTranslation
- Project
- Skill
- PortfolioSkill
- SocialLink
- Experience
- Education
- UserRefreshToken
- Template

## Hauptbeziehungen

1. User -> Portfolio
- Beziehung: 1:n
- Schlüssel: `Portfolio.user_id -> User.id`

2. Portfolio -> Project
- Beziehung: 1:n
- Schlüssel: `Project.portfolio_id -> Portfolio.id`

3. Portfolio -> SocialLink
- Beziehung: 1:n
- Schlüssel: `SocialLink.portfolio_id -> Portfolio.id`

4. Portfolio -> Experience
- Beziehung: 1:n
- Schlüssel: `Experience.portfolio_id -> Portfolio.id`

5. Portfolio -> Education
- Beziehung: 1:n
- Schlüssel: `Education.portfolio_id -> Portfolio.id`

6. Portfolio <-> Skill (über PortfolioSkill)
- Beziehung: n:m
- Schlüssel:
	- `PortfolioSkill.portfolio_id -> Portfolio.id`
	- `PortfolioSkill.skill_id -> Skill.id`

7. User -> UserRefreshToken
- Beziehung: 1:n
- Schlüssel: `UserRefreshToken.user_id -> User.id`

8. Template -> Portfolio
- Beziehung: 1:n
- Schlüssel: `Portfolio.template_id -> Template.id`

9. Portfolio -> PortfolioVersion
- Beziehung: 1:n
- Schlüssel: `PortfolioVersion.portfolio_id -> Portfolio.id`

10. Portfolio -> PortfolioTranslation
- Beziehung: 1:n
- Schlüssel: `PortfolioTranslation.portfolio_id -> Portfolio.id`

11. Portfolio -> aktuelle Version / aktuelles Theme
- Beziehung: 1:1 Referenz auf eine Auswahl innerhalb der abhängigen Tabellen
- Schlüssel:
	- `Portfolio.current_version_id -> PortfolioVersion.id`
	- `Portfolio.current_theme_id -> Theme.id`

## Wichtige Constraints

- `User.username` ist eindeutig (`UQ_User_Username`)
- `User.email` ist eindeutig (`UQ_User_Email`)
- `Portfolio.slug` ist eindeutig
- `Skill.name` ist eindeutig
- `UserRefreshToken.token_hash` ist eindeutig

## Hinweise zur Speicherung von Bildern

- Projektbilder werden als URL in `Project.img_url` gespeichert.
- Die eigentliche Datei liegt lokal im Backend-Upload-Verzeichnis.

## Hinweise zu Versionen und Übersetzungen

- `Portfolio.language_code` speichert die Hauptsprache des Portfolios.
- Zusätzliche Sprachvarianten liegen in `PortfolioTranslation`.
- `Portfolio.current_version_id` zeigt auf die aktuell aktive Version in `PortfolioVersion`.