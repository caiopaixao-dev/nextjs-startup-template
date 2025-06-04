# NIMOENERGIA - Portal de Transportadoras

Portal para gerenciamento de transportadoras e documentos da NIMOENERGIA.

## Funcionalidades

- Cadastro de transportadoras
- Upload e gerenciamento de documentos
- Sistema de notificações por email
- Dashboard de controle
- Integração com Google Sheets
- Interface responsiva e moderna

## Requisitos

- Node.js 18+
- PostgreSQL
- Conta AWS (para S3)
- Conta Google Cloud (para Google Sheets API)
- Servidor SMTP para emails

## Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Preencha todas as variáveis necessárias:
  - Conexão com banco de dados
  - Credenciais AWS S3
  - Configurações SMTP
  - Credenciais Google Sheets
  - Configurações NextAuth

4. Execute o setup inicial:
```bash
npm run setup
```

5. Execute as migrações do banco de dados:
```bash
npm run db:migrate
```

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:8000`

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Inicia o servidor em modo produção
- `npm run setup` - Executa setup inicial do sistema
- `npm run db:migrate` - Executa migrações do banco de dados
- `npm run db:push` - Atualiza esquema do banco sem migrations
- `npm run db:studio` - Abre interface Prisma Studio

## Estrutura do Projeto

```
src/
  ├── app/                    # Páginas e rotas Next.js
  ├── components/             # Componentes React
  ├── lib/                    # Utilitários e serviços
  │   ├── db.ts              # Cliente Prisma
  │   ├── email.ts           # Serviço de email
  │   ├── googleSheets.ts    # Integração Google Sheets
  │   └── upload.ts          # Serviço de upload S3
  └── scripts/               # Scripts de utilidade
      └── setup.ts           # Script de setup inicial

prisma/
  └── schema.prisma          # Schema do banco de dados
```

## Documentação da API

### Transportadoras

- `POST /api/transportadoras`
  - Cadastra nova transportadora
  - Aceita multipart/form-data com documentos

- `GET /api/transportadoras`
  - Lista todas as transportadoras

### Documentos

- `POST /api/documentos`
  - Upload de novo documento
  - Requer ID da transportadora

- `GET /api/documentos`
  - Lista documentos
  - Query params:
    - `transportadoraId`: Filtra por transportadora

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto é privado e de propriedade da NIMOENERGIA.
