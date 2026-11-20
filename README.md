# Todo Practice App

Full-stack practice project:
- Frontend: React + Vite + Axios
- Backend: Spring Boot + Spring Data JPA
- Database: PostgreSQL (manage with pgAdmin 4)

## 1. Create the database
In pgAdmin, create a database named `todo_db`.

## 2. Configure and run backend
Update `backend/src/main/resources/application.properties` with your PostgreSQL username and password.

From the `backend` folder:
```bash
mvn spring-boot:run
```
Backend runs at `http://localhost:8080`.

## 3. Run frontend
Open another terminal in the `frontend` folder:
```bash
npm install
npm run dev
```
Open `http://localhost:5173`.

## APIs used by the frontend
- `GET http://localhost:8080/api/todos` — fetch saved tasks
- `POST http://localhost:8080/api/todos` — save a task

The frontend intentionally uses only POST and GET. The list is read-only; completion and delete controls are not included.
