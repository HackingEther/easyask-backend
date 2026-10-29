# EasyAsk backend

A small Express service that connects a survey-completion request to the Tremendous sandbox rewards API.

## What it does

`POST /api/survey/complete` creates a sandbox order and attempts to return a reward link. The current integration targets `https://testflight.tremendous.com/api/v2`; it is a development/demo integration.

The request supports `email`, `name`, `amountCents`, `productId` and `externalId`. The implementation supplies demo defaults when fields are omitted. See [src/server.js](./src/server.js) for the request and response handling and [src/tremendous.js](./src/tremendous.js) for the API wrapper.

## Local setup

```sh
npm ci
cp .env.example .env
```

On Windows PowerShell, use `Copy-Item .env.example .env`.

Set `TREME_API_KEY` to a Tremendous sandbox key in your local `.env` or deployment secret store. `PORT` defaults to 8080.

```sh
npm run dev
```

Keep real credentials out of Git. `.env.example` contains configuration names only; `.env` and `node_modules/` are ignored. Dependencies are installed from the committed package and lockfile.

## Deployment considerations

The current route accepts caller-supplied reward details, has no application authentication or rate limiting, and uses permissive CORS. It is intended for controlled sandbox testing. Before public or production use, add caller authorization, input validation, abuse controls and appropriate error handling, and review the provider configuration. Do not replace the sandbox integration with production credentials without addressing those controls.

A successful response depends on valid sandbox credentials, product configuration and the provider response. No live reward transaction or deployment validation is claimed by this documentation.
