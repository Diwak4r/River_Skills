# Newsletter Backend Server

This is a local Node.js server for the River Skills newsletter.

## Features
- **Subscription API:** `POST /api/subscribe`
- **Database:** SQLite (local file `database.sqlite`)
- **Email Automation:** Weekly emails using `node-cron` and `nodemailer`.

## Setup

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start the Server:**
    ```bash
    node index.js
    ```
    The server will run on `http://localhost:3000`.

## Testing Emails
This setup uses **Ethereal Email** (a fake SMTP service).
- When an email is "sent", the server console will print a **Preview URL**.
- Click that URL to view the email in your browser.
- No real emails are sent to the outside world.

## Deployment
To deploy this to a live environment (e.g., Vercel, Heroku, VPS):
1.  **Database:** Switch from SQLite to a cloud database (e.g., Supabase, Neon, MySQL).
2.  **Email:** Switch from Ethereal to a real SMTP provider (e.g., SendGrid, Resend, Gmail).
3.  **Environment Variables:** Move sensitive config (DB credentials, SMTP auth) to `.env`.
