# Fastify-Typescript

A TypeScript-based REST API boilerplate using Prisma and Fastify framework.

## How to Use

### 1. Clone this Repo & Install Dependencies

First, clone the repository and install the Node.js dependencies:

```bash
npm install
```

### 2. Set Up the Database

This project uses a Postgres database. To set up your database, run the following migration command:

For development:

```bash
npm run migrate
```

For production:

```bash
npm run migrate:prod
```

### 3. Generate Prisma Client (Type-Safe Database Client)

Run the following command to generate the Prisma Client:

```bash
npm run db:gen
```

### 4. Start the Fastify Server

Launch your Fastify server with the following command:

```bash
npm run dev
```

### Build Generation

To build the server, use the command:

```bash
npm run build
```

## Documentation

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Fastify Documentation](https://www.fastify.io/docs/latest/)
