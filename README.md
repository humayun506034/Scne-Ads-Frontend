# Danaj242 Frontend

This is the frontend for the Scene Ads application, a platform for managing digital advertising campaigns on various screens and billboards. It includes separate dashboards for users and administrators.

## Tech Stack
 
- **Framework:** React
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS & shadcn/ui
- **State Management:** Redux Toolkit (with RTK Query)
- **Routing:** React Router
- **Linting:** ESLint

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd danaj242-frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the necessary environment variables. You will likely need to add the base URL for the backend API.
    ```
    VITE_API_BASE_URL=http://localhost:5000/api
    ```
    *(Note: Update the URL to match your backend server's address.)*

### Running the Application

To start the development server, run:

```sh
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run preview`: Serves the production build locally.

## Deployment

This project is configured for deployment on [Vercel](https://vercel.com/). Pushes to the main branch will automatically trigger a deployment.
