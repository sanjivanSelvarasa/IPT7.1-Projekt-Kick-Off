# API-Endpunkte

Als Beispiel (wird überarbeitet von Gian): 
#### [POST] /api/auth/register

**Beschreibung:**  
Registriert einen neuen Benutzer

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "string",
  "user": {}
}
```

Statuscodes:
- 201: Erfolgreich
- 400: Ungültige Daten
- 409: Benutzer existiert bereits