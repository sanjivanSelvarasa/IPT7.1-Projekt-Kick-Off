# Beispiel: cURL-Befehle für das Backend

Hier findest du Beispiel-cURL-Befehle, um die wichtigsten Endpunkte des Backends zu testen.

## Registrierung (POST /api/auth/register)
Registriert einen neuen Benutzer.

```
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "deinemail@example.com",
    "password": "DeinPasswort123",
    "username": "deinbenutzername"
  }'
```

## Login (POST /api/auth/login)
Meldet einen Benutzer an und gibt ein JWT-Token zurück.

```
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "deinemail@example.com",
    "password": "DeinPasswort123"
  }'
```

Die Antwort enthält ein Feld `token`, das für geschützte Endpunkte benötigt wird.

## Eigenes Profil abrufen (GET /api/users/me)
Erfordert das JWT-Token aus dem Login.

```
curl -X GET http://localhost:5000/api/users/me \
  -H "Authorization: Bearer <DEIN_TOKEN>"
```

## Profil aktualisieren (PUT /api/users/:id)
Erfordert Authentifizierung. Beispiel für das Aktualisieren des Profils:

```
curl -X PUT http://localhost:5000/api/users/1 \
  -H "Authorization: Bearer <DEIN_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "neuername",
    "bio": "Über mich Text",
    "twitter": "@deintwitter"
  }'
```

**Hinweis:** Ersetze `<DEIN_TOKEN>` durch das erhaltene Token und passe die Daten an.
