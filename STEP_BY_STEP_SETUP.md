# Step-by-Step Setup Guide for Developers

This guide provides clear, actionable steps for developers to set up and run the project from scratch.

---

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

---

## Step 2: Configure Environment Variables

Create a `.env` file in the project root with the following content:

```env
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/nimoenergia?schema=public"
AWS_REGION="your-aws-region"
AWS_ACCESS_KEY_ID="your-aws-access-key-id"
AWS_SECRET_ACCESS_KEY="your-aws-secret-access-key"
AWS_S3_BUCKET="your-s3-bucket-name"
SMTP_HOST="your-smtp-host"
SMTP_PORT="587"
SMTP_USER="your-smtp-user"
SMTP_PASS="your-smtp-password"
GOOGLE_SHEETS_CLIENT_EMAIL="your-google-client-email"
GOOGLE_SHEETS_PRIVATE_KEY="your-google-private-key"
GOOGLE_SHEETS_SPREADSHEET_ID="your-google-spreadsheet-id"
```

Replace all placeholder values with actual credentials.

---

## Step 3: Install PostgreSQL

- **Ubuntu/Debian:**

```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

- **macOS (Homebrew):**

```bash
brew install postgresql
brew services start postgresql
```

---

## Step 4: Create Database and User

Open PostgreSQL shell:

```bash
sudo -u postgres psql
```

Run the following commands inside psql:

```sql
CREATE DATABASE nimoenergia;
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE nimoenergia TO myuser;
\q
```

---

## Step 5: Install Project Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## Step 6: Generate Prisma Client and Apply Migrations

```bash
npx prisma generate
npx prisma migrate deploy
```

For development, you can use:

```bash
npx prisma migrate dev
```

---

## Step 7: Start the Development Server

```bash
npm run dev
```

or

```bash
npx next dev -p 8000
```

Access the site at `http://localhost:8000`.

---

## Step 8: Verify Functionality

- Test API endpoints (e.g., `/api/transportadoras`).
- Upload documents and check email notifications.
- Verify Google Sheets synchronization.

---

## Troubleshooting Tips

- Ensure PostgreSQL is running and accessible.
- Verify all environment variables are correctly set.
- Check logs for errors and fix accordingly.

---

This step-by-step guide should enable any developer to set up and run the project successfully.

For any questions or issues, refer to the main `SETUP_DOCUMENTATION.md` or contact the project maintainer.
