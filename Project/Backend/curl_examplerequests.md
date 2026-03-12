# Example Curl Commands
how to interact with the Backend

### get users
```bash
curl -X GET http://localhost:3000/users/
```

### register new user
```bash
curl -X POST "http://localhost:3000/users" -H "Content-Type: application/json" -d '{"name":"Gian","password": "password"}'
```

### login
```bash
curl -X POST "http://localhost:3000/users/login" -H "Content-Type: application/json" -d '{"name":"Gian","password": "password"}'
```