# Portfolio V2 - Enterprise Edition

A high-performance, security-hardened portfolio built with **React 18**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Quick Start

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Run Development Server:**
    ```bash
    npm run dev
    ```
3.  **Build for Production:**
    ```bash
    npm run build
    ```

## 🖼️ Adding Project Images

The project gallery automatically looks for images in `public/images/`.
To add an image for a project, save a PNG file matching the project's `id` from `src/data.json`.

**Required Images:**
*   `public/images/friends-go-together.png`
*   `public/images/alae-automates.png`
*   `public/images/expense-tracker.png`
*   `public/images/smart-laundry.png`
*   `public/images/fabulous-social.png`
*   ...and so on for other projects.

*Note: If an image is missing, a stylized placeholder will be shown automatically.*

## 🛡️ Security Features
*   **Strict CSP:** Blocks unauthorized scripts and frames.
*   **HSTS & X-Frame-Options:** Prevents clickjacking and protocol downgrades.
*   **Rate Limiting:** Built-in Nginx DDoS protection.
*   **Zero-JS Data:** Content is loaded from JSON, preventing XSS via database injection.

## 🐳 Docker Deployment

To build and run the production container:

```bash
docker build -t portfolio-v2 .
docker run -p 8080:80 portfolio-v2
```

Visit `http://localhost:8080` to view.
