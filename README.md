# Todo-List-App-ES

Aplicación simple de lista de tareas (To‑Do) con backend en Node/Express y frontend en React + Vite.

**Resumen**

Proyecto de ejemplo que gestiona tareas con soporte de "soft-delete" y persistencia en PostgreSQL. Incluye API REST en `backend/` y cliente React en `frontend/`.

**Requisitos**

- Node.js v14+ y `npm`.
- PostgreSQL (opcional para persistencia; puede usar una instancia local o en la nube).

---

## Estructura del repositorio

- `backend/` — servidor Express, conexión a PostgreSQL via `DATABASE_URL`.
- `frontend/` — app React (Vite).

---

## Instalación y ejecución (Windows - PowerShell)

1) Abrir terminal en la raíz del proyecto.

2) Backend: instalar dependencias

```powershell
cd backend
npm install
```

3) Configurar la base de datos (Postgres)

- Cree una base de datos y obtenga la URL de conexión con el formato:

```
postgres://usuario:contraseña@host:puerto/nombre_basedatos
```

- Cree un archivo `.env` en la carpeta `backend` con la variable `DATABASE_URL`:

```
DATABASE_URL=postgres://usuario:contraseña@host:puerto/nombre_basedatos
```

Si no proporciona `DATABASE_URL` el servidor mostrará un aviso pero seguirá intentando arrancar (la tabla no podrá crearse correctamente).

4) Iniciar backend

```powershell
# desde backend/
npm run start
```

Por defecto el backend escucha en `http://localhost:5000/`.

5) Frontend: instalar dependencias e iniciar

```powershell
cd ..\frontend
npm install
npm run dev
```

Vite sirve la aplicación en una URL que muestra en consola (normalmente `http://localhost:5173`).

---

## Scripts útiles

- Backend: `npm run start` — ejecuta `server.js`.
- Frontend: `npm run dev` — arranca Vite; `npm run build` — crea build de producción.

---

## Endpoints principales (backend)

- `GET /api/tasks` — Obtener tareas no eliminadas.
- `POST /api/tasks` — Crear tarea (body JSON: `{ "title": "..." }`).
- `PUT /api/tasks/:id` — Actualizar campos `title`, `completed` o `deleted` (body JSON con los campos a cambiar).
- `DELETE /api/tasks/:id` — Soft-delete (marca `deleted = true`).
- `GET /api/tasks/db` — Devuelve todas las filas (incluye eliminadas).
- `GET /api/tasks/db/html` — Vista HTML con tareas pendientes, completadas y eliminadas.

---

## Notas técnicas

- `backend/db.js` crea la tabla `tasks` si no existe y añade la columna `deleted` si falta.
- El backend usa `pg` y asume `DATABASE_URL` con soporte SSL (configurado con `rejectUnauthorized: false`). Ajuste según su entorno.
- El frontend llama al backend en `http://localhost:5000` desde `frontend/src/api.js`. Si cambia el puerto o el host, actualice esa constante o use variables de entorno.

## Solución de problemas comunes

- Error: "No DATABASE_URL found in environment" — cree `.env` o exporte la variable en su entorno antes de arrancar el backend.
- Error de conexión SSL con Postgres local — en entornos locales quite la opción SSL o configure correctamente el certificado.
- Vite no arranca / puerto ocupado — cambie el puerto con `vite --port <puerto>` o cierre el proceso que lo ocupa.

---

¿Quieres que ejecute `npm install` en `backend` y `frontend` ahora y arranque ambos servidores en terminales separados? Puedo hacerlo y compartir las salidas de inicio.

