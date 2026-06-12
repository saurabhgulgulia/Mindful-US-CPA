# Mindful US CPA — Auth API

A tiny Express backend that powers client login for the portal. Users are stored
in `data/users.json` (bcrypt-hashed passwords); sessions use JWTs.

## Run

```bash
cd server
npm install
cp .env.example .env   # then edit JWT_SECRET
npm run dev            # http://localhost:4000  (auto-restarts on change)
```

## Endpoints

| Method | Path             | Auth   | Body                                   | Returns                |
| ------ | ---------------- | ------ | -------------------------------------- | ---------------------- |
| GET    | `/api/health`    | —      | —                                      | `{ ok: true }`         |
| POST   | `/api/auth/signup` | —    | `{ email, password, phone?, service?, clientId? }` | `{ token, user }` |
| POST   | `/api/auth/login`  | —    | `{ email, password }`                  | `{ token, user }`      |
| GET    | `/api/auth/me`     | Bearer | —                                      | `{ user }`             |

`user` is `{ id, email, name, clientId, phone, service }` — never the password hash.

## Notes

- Passwords are hashed with bcrypt; the hash is never returned.
- JWTs are signed with `JWT_SECRET` and expire after `JWT_EXPIRES_IN` (default 7d).
- The Vite dev server proxies `/api` here, so the frontend calls relative URLs.
