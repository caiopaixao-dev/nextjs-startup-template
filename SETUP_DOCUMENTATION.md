# Project Setup and Deployment Guide

This document provides detailed instructions to set up, configure, and run the project successfully.

---

## 1. Environment Variables Configuration

Create a `.env` file in the root directory with the following variables:

```env
# PostgreSQL Database URL
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/nimoenergia?schema=public"

# AWS S3 Configuration
AWS_REGION="your-aws-region"
AWS_ACCESS_KEY_ID="your-aws-access-key-id"
AWS_SECRET_ACCESS_KEY="your-aws-secret-access-key"
AWS_S3_BUCKET="your-s3-bucket-name"

# SMTP Email Configuration
SMTP_HOST="your-smtp-host"
SMTP_PORT="587"
SMTP_USER="your-smtp-user"
SMTP_PASS="your-smtp-password"

# Google Sheets API Configuration
GOOGLE_SHEETS_CLIENT_EMAIL="your-google-client-email"
GOOGLE_SHEETS_PRIVATE_KEY="your-google-private-key"
GOOGLE_SHEETS_SPREADSHEET_ID="your-google-spreadsheet-id"
```

**Note:** Replace all placeholder values with your actual credentials.

---

## 2. PostgreSQL Database Setup

### Install PostgreSQL

- On Ubuntu/Debian:

```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

- On macOS (using Homebrew):

```bash
brew install postgresql
brew services start postgresql
```

### Start PostgreSQL Service

```bash
sudo service postgresql start
```

### Create Database and User

```bash
sudo -u postgres psql
```

Inside the psql shell, run:

```sql
CREATE DATABASE nimoenergia;
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE nimoenergia TO myuser;
\q
```

---

## 3. Prisma Setup and Database Migration

- Install Prisma CLI if not installed:

```bash
npm install -D prisma
```

- Generate Prisma client:

```bash
npx prisma generate
```

- Apply migrations to set up the database schema:

```bash
npx prisma migrate deploy
```

Or for development:

```bash
npx prisma migrate dev
```

- You can also open Prisma Studio to inspect the database:

```bash
npx prisma studio
```

---

## 4. Install Project Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## 5. Run the Development Server

```bash
npm run dev
```

or

```bash
npx next dev -p 8000
```

The site will be available at `http://localhost:8000`.

---

## 6. Testing and Verification

- Access the site in your browser.
- Test API endpoints (e.g., `/api/transportadoras`).
- Upload documents and verify email notifications.
- Check Google Sheets synchronization.

---

## 7. Additional Recommendations

- Secure your environment variables and secrets.
- Set up proper logging and error monitoring.
- Document any changes or deployment steps.
- Use Docker or cloud services for production deployment.

---

## 8. Troubleshooting

- If you encounter database connection errors, verify PostgreSQL is running and credentials in `.env` are correct.
- For AWS S3 upload issues, check AWS credentials and bucket permissions.
- For email sending issues, verify SMTP settings.
- For Google Sheets sync issues, check API credentials and spreadsheet access.

---

This guide should help you and future developers to set up and run the project smoothly.

If you need further assistance, feel free to ask.
