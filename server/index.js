import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import nodemailer from 'nodemailer';
import cron from 'node-cron';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
let db;
async function initializeDb() {
    db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS subscribers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log('Database initialized');
}

initializeDb().catch(console.error);

// Email setup (Ethereal for testing)
let transporter;
async function createTransporter() {
    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    console.log('Email service ready (Ethereal Mock)');
    console.log(`Preview URL: https://ethereal.email/messages`);
}

createTransporter().catch(console.error);

// Routes
app.post('/api/subscribe', async (req, res) => {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    try {
        await db.run('INSERT INTO subscribers (email) VALUES (?)', email);
        console.log(`New subscriber: ${email}`);

        // Send welcome email immediately
        await sendEmail(email, 'Welcome to River Skills!', `
            <h1>Welcome to River Skills!</h1>
            <p>Thanks for subscribing. You'll receive weekly AI updates starting next week.</p>
        `);

        res.json({ message: 'Successfully subscribed!' });
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            return res.status(409).json({ error: 'Email already subscribed' });
        }
        console.error('Subscription error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Helper to send email
async function sendEmail(to, subject, html) {
    if (!transporter) return;

    try {
        const info = await transporter.sendMail({
            from: '"River Skills" <newsletter@riverskills.com>',
            to,
            subject,
            html,
        });

        console.log(`Email sent to ${to}: ${nodemailer.getTestMessageUrl(info)}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Weekly Automation (Every Monday at 9am)
// For testing purposes, we can uncomment the line below to run every minute
// cron.schedule('* * * * *', async () => { 
cron.schedule('0 9 * * 1', async () => {
    console.log('Running weekly newsletter job...');
    try {
        const subscribers = await db.all('SELECT email FROM subscribers');

        const newsletterContent = `
            <h1>Weekly AI Update</h1>
            <p>Here are the top AI tools and resources for this week...</p>
            <ul>
                <li>New GPT-4 features released</li>
                <li>Top 5 AI tools for productivity</li>
                <li>Learning resource of the week: Advanced React Patterns</li>
            </ul>
            <p>Stay tuned for more!</p>
        `;

        for (const sub of subscribers) {
            await sendEmail(sub.email, 'River Skills: Weekly AI Update', newsletterContent);
        }
    } catch (error) {
        console.error('Newsletter job error:', error);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
