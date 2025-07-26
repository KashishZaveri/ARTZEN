# ARTZEN
Artzen is a responsive and scalable full-stack web application for showcasing and purchasing art-based products. Designed to simulate real-world e-commerce features, it includes secure payments, dynamic order management, and email confirmation—all packed into a clean and intuitive UI.

Frontend Technologies:
- React – Powers the interactive user interface using component-based architecture.
- Zustand – Manages global state across components (for things like authentication and product selection).
- Chakra UI – Provides beautiful, responsive, and accessible UI components out-of-the-box.
- React Router DOM – Enables navigation between pages without full reloads (e.g. from billing to thank-you).
- Vite – Optimizes development workflow and builds with fast hot-reloading and bundling.

Backend Technologies:
- Express.js – Handles API endpoints, middleware, and server-side logic.
- MongoDB – Stores user data, product listings, and order history in a flexible NoSQL format.
- Nodemailer – Sends confirm email
- dotenv – Loads environment variables securely (like API keys and DB credentials).

Payment Integration:
- Razorpay API – Facilitates secure and real-time payment processing via cards, UPI, wallets, etc.
- Custom billing flow – Captures user details like address and email during checkout for record-keeping and personalization.

Deployment & Hosting:
- Render – Hosts both frontend and backend with automatic GitHub deploys and free-tier support.
- Environment Variables (.env) – Allows separation of development and production settings securely.

Utilities & Patterns:
- Modular architecture – Keeps codebase organized with separate folders for pages, components, stores, and utilities.

Live project URL: https://artzen.onrender.com/


