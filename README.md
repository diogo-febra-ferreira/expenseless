# 💸 ExpenseLess

A lightweight expense tracking app with a simple architecture.

---
## 🚀 Getting Started

Run the app with Docker:

```bash
docker-compose up
```

Then visit: http://localhost:3000

---

## Project Structure

```csharp
app/
├── routes/        # Route definitions (serve templates, call services)
└── services/      # Database + business logic

public/            # Static assets (CSS, JS, images)
├── css/           # shared CSS
├── html/          # HTML templates
└── js/            # JS used in the templates
```

---
## Tech Stack

- Backend: Node.js + Express
- Database: SQLite
- Frontend: HTML templates + AJAX
- Containerization: Docker + Docker Compose

---

## Architecture

WIP:

Routes only return the html template, all data will be fetched through APIs and ajax.
You always load an empty template and on load it will feth all the data from the page.



All Database logic is contained in the services, API routes call a service method.