# API-Endpunkte

## Server (Port 3000)

---

### [POST] /users/register

**Beschreibung:**  
Registriert einen neuen Benutzer.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully."
}
```

**Fehler-Response:**
```json
{
  "error": "string"
}
```

Statuscodes:
- `201` Benutzer erfolgreich registriert
- `400` Ungültige oder fehlende E-Mail / Passwort
- `409` E-Mail bereits registriert

---

### [POST] /users/login

**Beschreibung:**  
Meldet einen bestehenden Benutzer an. Gibt einen kurzlebigen Access Token (20 min) zurück und setzt den Refresh Token als HttpOnly-Cookie.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "accessToken": "string"
}
```

**Set-Cookie (Header):**
- `refreshToken=<token>; HttpOnly; Secure; SameSite=None`

Statuscodes:
- `200` Login erfolgreich
- `400` Ungültige oder fehlende E-Mail / Passwort
- `401` Ungültige E-Mail oder falsches Passwort

---

### [DELETE] /users/logout

**Beschreibung:**  
Meldet den Benutzer ab, indem der Refresh Token serverseitig invalidiert wird.

**Cookie (erforderlich):**
- `refreshToken=<token>`

**Response:** `204 No Content`

Statuscodes:
- `204` Erfolgreich abgemeldet
- `400` Refresh-Token-Cookie fehlt oder ist ungültig

---

### [POST] /token

**Beschreibung:**  
Stellt einen neuen Access Token aus, wenn ein gültiger Refresh Token übergeben wird.

**Cookie (erforderlich):**
- `refreshToken=<token>`

**Response (200):**
```json
{
  "accessToken": "string"
}
```

Statuscodes:
- `200` Neuer Access Token ausgestellt
- `400` Refresh-Token-Cookie fehlt oder ist ungültig
- `403` Refresh Token abgelaufen, ungültig oder widerrufen

---

### [GET] /users

**Beschreibung:**  
Gibt eine Liste aller registrierten E-Mail-Adressen zurück (Entwicklungs-/Debug-Endpunkt).

**Response (200):**
```json
["email1@example.com", "email2@example.com"]
```

Statuscodes:
- `200` Erfolgreich

---

## Portfolio Core

### [GET] /portfolios
**Beschreibung:** Alle Portfolios des eingeloggten Benutzers laden.

Statuscodes:
- `200` Erfolgreich
- `401` Kein Token
- `403` Ungültiger Token

### [POST] /portfolio
**Beschreibung:** Neues Portfolio erstellen.

**Request Body (Beispiel):**
```json
{
  "title": "Mein Portfolio",
  "description": "Kurzbeschreibung",
  "languageCode": "de",
  "visibility": "private",
  "slug": "mein-portfolio"
}
```

Statuscodes:
- `201` Erstellt
- `400` Ungültige Eingaben
- `401` Kein Token
- `403` Ungültiger Token
- `409` Slug bereits vergeben

### [GET] /portfolio/:id
**Beschreibung:** Einzelnes eigenes Portfolio laden.

Statuscodes:
- `200` Erfolgreich
- `401` Kein Token
- `404` Portfolio nicht gefunden
- `403` Kein Zugriff

### [GET] /portfolio/:id/full
**Beschreibung:** Einzelnes eigenes Portfolio inklusive aller aktuell implementierten Untermodule laden (Translations, Versions, Projects, Skills, SocialLinks, Experiences, Educations, Themes).

Statuscodes:
- `200` Erfolgreich
- `401` Kein Token
- `404` Portfolio nicht gefunden
- `403` Kein Zugriff

### [GET] /p/:slug
**Beschreibung:** Öffentliches Portfolio per Slug laden (nur wenn Sichtbarkeit `public`).

Statuscodes:
- `200` Erfolgreich
- `404` Portfolio nicht gefunden oder nicht öffentlich

### [GET] /p/:slug/full
**Beschreibung:** Öffentliches Portfolio inklusive aller aktuell implementierten Untermodule per Slug laden (Translations, Projects, Skills, SocialLinks, Experiences, Educations, Themes).

Statuscodes:
- `200` Erfolgreich
- `404` Portfolio nicht gefunden oder nicht öffentlich

### [PUT] /portfolio/:id
**Beschreibung:** Eigenes Portfolio aktualisieren.

Statuscodes:
- `200` Erfolgreich
- `400` Ungültige Eingaben
- `401` Kein Token
- `404` Portfolio nicht gefunden
- `403` Kein Zugriff
- `409` Slug bereits vergeben

### [DELETE] /portfolio/:id
**Beschreibung:** Eigenes Portfolio löschen.

Statuscodes:
- `204` Erfolgreich gelöscht
- `401` Kein Token
- `404` Portfolio nicht gefunden
- `403` Kein Zugriff

---

## Project Modul

### [GET] /portfolio/:id/projects
### [POST] /portfolio/:id/projects
### [PUT] /portfolio/:id/projects/:projectId
### [DELETE] /portfolio/:id/projects/:projectId

Statuscodes (typisch):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Projekt oder Portfolio nicht gefunden
- `403` Kein Zugriff

### [POST] /portfolio/:id/projects/:projectId/image
**Beschreibung:** Projektbild hochladen (multipart/form-data, Feld `image`).

**Response (201):**
```json
{
  "id": 123,
  "portfolioId": 10,
  "imageUrl": "/uploads/projects/project-...png",
  "updatedAt": "2026-..."
}
```

Statuscodes:
- `201` Upload erfolgreich
- `400` Keine Bilddatei / falscher Dateityp / Datei zu groß
- `401` Kein Token
- `404` Projekt nicht gefunden
- `403` Kein Zugriff

---

## Skill Modul

### [GET] /portfolio/:id/skills
### [POST] /portfolio/:id/skills
### [PUT] /portfolio/:id/skills/:portfolioSkillId
### [DELETE] /portfolio/:id/skills/:portfolioSkillId

Statuscodes (typisch):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Zuordnung nicht gefunden
- `403` Kein Zugriff
- `409` Skill bereits im Portfolio vorhanden

---

## SocialLink Modul

### [GET] /portfolio/:id/links
### [POST] /portfolio/:id/links
### [PUT] /portfolio/:id/links/:linkId
### [DELETE] /portfolio/:id/links/:linkId

Statuscodes (typisch):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Link nicht gefunden
- `403` Kein Zugriff

---

## Experience Modul

### [GET] /portfolio/:id/experiences
### [POST] /portfolio/:id/experiences
### [PUT] /portfolio/:id/experiences/:experienceId
### [DELETE] /portfolio/:id/experiences/:experienceId

Statuscodes (typisch):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Eintrag nicht gefunden
- `403` Kein Zugriff

---

## Education Modul

### [GET] /portfolio/:id/educations
### [POST] /portfolio/:id/educations
### [PUT] /portfolio/:id/educations/:educationId
### [DELETE] /portfolio/:id/educations/:educationId

Statuscodes (typisch):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Eintrag nicht gefunden
- `403` Kein Zugriff

---

## Theme Modul

### [GET] /portfolio/:id/themes
**Beschreibung:** Alle Themes eines Portfolios laden.

### [POST] /portfolio/:id/themes
**Beschreibung:** Neues Theme für ein Portfolio anlegen.

**Request Body (Beispiel):**
```json
{
  "primaryColor": "#1f2937",
  "secondaryColor": "#4b5563",
  "backgroundColor": "#ffffff",
  "surfaceColor": "#f9fafb",
  "textColor": "#111827",
  "accentColor": "#2563eb",
  "fontFamily": "Poppins"
}
```

### [PUT] /portfolio/:id/themes/:themeId
**Beschreibung:** Theme aktualisieren.

### [DELETE] /portfolio/:id/themes/:themeId
**Beschreibung:** Theme löschen.

### [POST] /portfolio/:id/themes/:themeId/activate
**Beschreibung:** Theme als aktuelles Portfolio-Theme setzen (`current_theme_id`).

**Response (200) bei Aktivierung:**
```json
{
  "portfolioId": 10,
  "currentThemeId": 3
}
```

Statuscodes:
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Theme oder Portfolio nicht gefunden
- `403` Kein Zugriff

---

## PortfolioTranslation Modul

### [GET] /portfolio/:id/translations
**Beschreibung:** Alle Übersetzungen eines Portfolios laden.

### [POST] /portfolio/:id/translations
**Beschreibung:** Neue Übersetzung für ein Portfolio erstellen.

**Request Body (Beispiel):**
```json
{
  "languageCode": "en",
  "title": "My Portfolio",
  "description": "English translation"
}
```

### [PUT] /portfolio/:id/translations/:translationId
**Beschreibung:** Bestehende Übersetzung aktualisieren.

### [DELETE] /portfolio/:id/translations/:translationId
**Beschreibung:** Übersetzung löschen.

Statuscodes:
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Übersetzung oder Portfolio nicht gefunden
- `403` Kein Zugriff
- `409` Sprache bereits vorhanden oder entspricht der Hauptsprache des Portfolios

---

## PortfolioVersion Modul

### [GET] /portfolio/:id/versions
**Beschreibung:** Alle Versionen eines Portfolios laden.

### [POST] /portfolio/:id/versions
**Beschreibung:** Neue Version aus dem aktuellen Portfoliozustand erstellen.

**Response (201):**
```json
{
  "id": 5,
  "portfolioId": 10,
  "versionNumber": 2,
  "titleSnapshot": "Mein Portfolio",
  "isPublished": false,
  "createdAt": "2026-04-30T12:00:00.000Z"
}
```

### [GET] /portfolio/:id/versions/:versionId
**Beschreibung:** Konkrete Version laden.

### [DELETE] /portfolio/:id/versions/:versionId
**Beschreibung:** Version löschen.

### [POST] /portfolio/:id/versions/:versionId/activate
**Beschreibung:** Version als aktuelle Version setzen (`current_version_id`).

**Response (200) bei Aktivierung:**
```json
{
  "portfolioId": 10,
  "currentVersionId": 5
}
```

Statuscodes:
- `200`, `201`, `204`
- `400` Validierungsfehler
- `401` Kein Token
- `404` Version oder Portfolio nicht gefunden
- `403` Kein Zugriff

---

## Template Modul

### [GET] /templates
**Beschreibung:** Verfügbare Templates abrufen.

### [GET] /templates/:templateId
**Beschreibung:** Ein einzelnes Template mit Details abrufen.

Hinweis:
- Die Zuweisung eines Templates zum Portfolio ist bereits indirekt über `POST /portfolio` und `PUT /portfolio/:id` möglich (`template_id`).

Statuscodes:
- `200`
- `404` Template nicht gefunden

---

## Geplante Module (noch nicht implementiert)

Hinweis:
- Die folgenden Endpunkte sind fachlich dokumentiert, aber im aktuellen Backend-Code noch nicht als Route verfügbar.
- Aktueller Status im laufenden Backend: `404 Endpoint not found`.
- Die folgenden Statuscodes beschreiben den geplanten Soll-Zustand nach Implementierung.

---

### Media Modul

### [GET] /portfolio/:id/media
**Beschreibung:** Medien eines Portfolios abrufen.

### [POST] /portfolio/:id/media
**Beschreibung:** Mediendatei hochladen (multipart/form-data, Feld `file`).

### [PUT] /portfolio/:id/media/:mediaId
**Beschreibung:** Metadaten einer Mediendatei aktualisieren (z. B. `altText`).

### [DELETE] /portfolio/:id/media/:mediaId
**Beschreibung:** Mediendatei entfernen.

Statuscodes (geplant):
- `200`, `201`, `204`
- `400` Validierungsfehler / falscher Dateityp / Datei zu groß
- `404` Medium oder Portfolio nicht gefunden
- `403` Kein Zugriff

---

### PortfolioSection Modul

### [GET] /portfolio/:id/versions/:versionId/sections
**Beschreibung:** Sections einer Portfolio-Version laden.

### [POST] /portfolio/:id/versions/:versionId/sections
**Beschreibung:** Neue Section hinzufügen.

**Request Body (Beispiel):**
```json
{
  "sectionType": "hero",
  "title": "Startbereich",
  "sortOrder": 1,
  "isVisible": true
}
```

### [PUT] /portfolio/:id/versions/:versionId/sections/:sectionId
**Beschreibung:** Section aktualisieren.

### [DELETE] /portfolio/:id/versions/:versionId/sections/:sectionId
**Beschreibung:** Section löschen.

Statuscodes (geplant):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `404` Section, Version oder Portfolio nicht gefunden
- `403` Kein Zugriff

---

### EditorBlock Modul

### [GET] /portfolio/:id/versions/:versionId/sections/:sectionId/blocks
**Beschreibung:** Alle Editor-Blöcke einer Section laden.

### [POST] /portfolio/:id/versions/:versionId/sections/:sectionId/blocks
**Beschreibung:** Neuen Block in einer Section erstellen.

**Request Body (Beispiel):**
```json
{
  "blockType": "text",
  "contentJson": {
    "text": "Willkommen auf meinem Portfolio"
  },
  "sortOrder": 1
}
```

### [PUT] /portfolio/:id/versions/:versionId/sections/:sectionId/blocks/:blockId
**Beschreibung:** Editor-Block aktualisieren.

### [DELETE] /portfolio/:id/versions/:versionId/sections/:sectionId/blocks/:blockId
**Beschreibung:** Editor-Block löschen.

Statuscodes (geplant):
- `200`, `201`, `204`
- `400` Validierungsfehler
- `404` Block, Section, Version oder Portfolio nicht gefunden
- `403` Kein Zugriff

---
