Deployment notes
================

Local Docker development:

1. Build and start services:

```
docker-compose up --build
```

2. Application will be available at `http://localhost:8000` and OpenAPI docs at `/docs`.

Production notes:
- Set `DATABASE_URL` to a managed Postgres instance.
- Use environment secrets for `JWT_SECRET_KEY` and Twilio credentials.
