# API-Endpunkte

## Auth-Server (Port 4000)

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
Meldet einen bestehenden Benutzer an. Gibt einen kurzlebigen Access Token (15 min) und einen Refresh Token zurück.

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
  "accessToken": "string",
  "refreshToken": "string"
}
```

Statuscodes:
- `200` Login erfolgreich
- `400` Ungültige oder fehlende E-Mail / Passwort
- `401` Ungültige E-Mail oder falsches Passwort

---

### [DELETE] /users/logout

**Beschreibung:**  
Meldet den Benutzer ab, indem der Refresh Token serverseitig invalidiert wird.

**Request Body:**
```json
{
  "token": "string"
}
```

**Response:** `204 No Content`

Statuscodes:
- `204` Erfolgreich abgemeldet
- `400` Token fehlt oder ist kein String

---

### [POST] /token

**Beschreibung:**  
Stellt einen neuen Access Token aus, wenn ein gültiger Refresh Token übergeben wird.

**Request Body:**
```json
{
  "token": "string"
}
```

**Response (200):**
```json
{
  "accessToken": "string"
}
```

Statuscodes:
- `200` Neuer Access Token ausgestellt
- `400` Token fehlt oder ist ungültig
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

## Resource-Server (Port 3000)

---

### [GET] /posts

**Beschreibung:** 
Gibt alle Posts zurück, die zur E-Mail des authentifizierten Benutzers gehören.  
Erfordert einen gültigen JWT Access Token im `Authorization`-Header. 
(Dies ist momentan noch zum Testen der Acesstokens aber es geht im Projekt natürlich um Portfolios nicht Posts)

**Header:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
[
  {
    "email": "string",
    "content": "string"
  }
]
```

Statuscodes:
- `200` Erfolgreich
- `401` Kein Token vorhanden
- `403` Token ungültig oder abgelaufen