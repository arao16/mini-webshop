# Mini Webshop

Full stack tech assignment with a React frontend and Spring Boot backend.

## Architecture

### Frontend
- React + TypeScript application built with Vite.
- Component-driven UI:
	- `ProductListing` handles product fetching, search, and category filtering.
	- `ShoppingBasket` handles basket display, total calculation, and checkout action.
	- `App` orchestrates shared basket state and passes actions via props.
- Service layer:
	- `apiService` includes HTTP calls to backend endpoints.
	- `storageService` includes localStorage logic.

### Backend
- Spring Boot REST API using Spring MVC (`spring-boot-starter-web`).
- Layered structure:
	- Controllers expose endpoints (`/api/products`, `/api/purchase`).
	- Service layer (`ProductService`) loads and serves catalog data.
	- Model classes define request/response payload shapes.
- Catalog data is loaded from `products.json` at startup into memory.

### Frontend <-> Backend Integration
- Frontend calls relative `/api/*` routes.
- Vite dev server proxies `/api` to `http://localhost:8080` to avoid local CORS/proxy friction.

## Important Design Decisions

- Keep the backend simple and stateless for assignment scope: product catalog is read from JSON and served from memory.
- Keep API calls and persistence logic outside UI components (`apiService`, `storageService`) to reduce coupling and improve testability.
- Persist basket in localStorage to preserve user state across refreshes.
- Used Spring MVC REST controllers for request handling.

## Run Locally

### Prerequisites
- Java 21+
- Node.js 16+
- npm

### 1. Start Backend (port 8080)

```bash
cd backend
./mvnw spring-boot:run
```

Backend will start at `http://localhost:8080`.

### 2. Start Frontend (port 5173)

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will start at `http://localhost:5173`.

### 3. Run Tests (frontend)

```bash
cd frontend
npm test
```

## Trade-offs / Shortcuts Taken

- No authentication/authorization: all endpoints are publicly accessible.
- Search/filter is implemented client-side in the frontend.
- Basket state is managed with state and props in `App`; it is less scalable than context for larger apps.
- No database. purchases are accepted and logged, but not saved in the db.

## What I Would Do Differently With More Time

- Move basket state to a shared state layer (React Context) to avoid prop drilling as the UI grows.
- Move filter logic to backend.
- Replace `filter by categories` with a filter with options of categories, brand, price etc.
- Provision to update the cart quantity directly.
- Add backend unit and integration tests.

## Challenges Encountered and How They Were Resolved

- Basket persistence race concerns during load/save cycles:
	- Resolved by making sure localStorage writes happen after initial state load.
- Field naming mismatch between frontend/backend image property (`image` vs `imageUrl`):
	- Resolved by aligning frontend usage with backend `imageUrl` shape.
- Lombok issues.