# Guia Passo a Passo para Desenvolvedores

Este guia fornece passos claros e práticos para que desenvolvedores possam configurar e executar o projeto do zero.

---

## Passo 1: Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd <pasta-do-projeto>
```

---

## Passo 2: Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://meuusuario:minhasenha@localhost:5432/nimoenergia?schema=public"
AWS_REGION="sua-regiao-aws"
AWS_ACCESS_KEY_ID="seu-access-key-id-aws"
AWS_SECRET_ACCESS_KEY="sua-secret-access-key-aws"
AWS_S3_BUCKET="nome-do-seu-bucket-s3"
SMTP_HOST="host-do-seu-smtp"
SMTP_PORT="587"
SMTP_USER="usuario-smtp"
SMTP_PASS="senha-smtp"
GOOGLE_SHEETS_CLIENT_EMAIL="email-do-cliente-google"
GOOGLE_SHEETS_PRIVATE_KEY="sua-chave-privada-google"
GOOGLE_SHEETS_SPREADSHEET_ID="id-da-planilha-google"
```

Substitua todos os valores de exemplo pelos seus dados reais.

---

## Passo 3: Instalar PostgreSQL

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

## Passo 4: Criar Banco de Dados e Usuário

Abra o shell do PostgreSQL:

```bash
sudo -u postgres psql
```

Execute os comandos abaixo dentro do shell:

```sql
CREATE DATABASE nimoenergia;
CREATE USER meuusuario WITH ENCRYPTED PASSWORD 'minhasenha';
GRANT ALL PRIVILEGES ON DATABASE nimoenergia TO meuusuario;
\q
```

---

## Passo 5: Instalar Dependências do Projeto

```bash
npm install
```

ou

```bash
yarn install
```

---

## Passo 6: Gerar Cliente Prisma e Aplicar Migrações

```bash
npx prisma generate
npx prisma migrate deploy
```

Para desenvolvimento, pode usar:

```bash
npx prisma migrate dev
```

---

## Passo 7: Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

ou

```bash
npx next dev -p 8000
```

Acesse o site em `http://localhost:8000`.

---

## Passo 8: Verificar Funcionalidades

- Teste os endpoints da API (ex: `/api/transportadoras`).
- Faça upload de documentos e verifique o envio de emails.
- Confirme a sincronização com o Google Sheets.

---

## Dicas para Solução de Problemas

- Verifique se o PostgreSQL está rodando e acessível.
- Confirme se as variáveis de ambiente estão configuradas corretamente.
- Consulte os logs para identificar erros e corrigi-los.

---

Este guia passo a passo deve permitir que qualquer desenvolvedor configure e execute o projeto com sucesso.

Para dúvidas ou problemas, consulte a documentação principal `SETUP_DOCUMENTATION.md` ou contate o mantenedor do projeto.
