# Fehlerbehandlung

## ApiError-Klasse

Alle erwarteten Fehler im Backend werden über eine eigene `ApiError`-Klasse geworfen. Sie erweitert die native `Error`-Klasse um einen HTTP-Statuscode und optionale Details.

```js
class ApiError extends Error {
    constructor(status, message, details) {
        super(message)
        this.status = status
        this.details = details
    }
}
```

**Felder:**
- `status` — HTTP-Statuscode (z. B. `400`, `401`, `403`, `409`)
- `message` — Lesbare Fehlerbeschreibung
- `details` *(optional)* — Zusätzliche Informationen zum Fehler

## Globale Fehler-Middleware

Alle geworfenen `ApiError`-Instanzen werden von einer zentralen Express-Fehler-Middleware abgefangen. Diese gibt eine einheitliche JSON-Antwort zurück:

```json
{
  "error": "Fehlerbeschreibung"
}
```

Bei `status === 500` wird stattdessen `"Internal server error."` zurückgegeben und der Fehler serverseitig geloggt (`console.error`).

Wenn das Feld `details` gesetzt ist, wird es ebenfalls in der Antwort mitgeschickt:

```json
{
  "error": "Fehlerbeschreibung",
  "details": "..."
}
```

Ungültige JSON-Bodies (Syntaxfehler) werden separat abgefangen und mit folgendem Response beantwortet:

```json
{
  "error": "Malformed JSON body."
}
```

## Fehlercodes

Die pro Endpunkt möglichen Statuscodes sind in der [API-Endpoints Dokumentation](./4_api-endpoints.md) aufgelistet.