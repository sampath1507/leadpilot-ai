# LeadPilot — Lead Capture & Sales Automation Demo

A responsive React portfolio application with an inquiry form and interactive lead dashboard.

## Run locally
Requires Node.js 20+.
```bash
npm install
npm run dev
```
Open http://localhost:5173.

## Features
- Landing page, service offerings and customer inquiry form
- Browser-local dashboard with lead search, priority and status management
- Optional local n8n webhook bridge (`npm run server`)
- Responsive layout

**Demo limitations:** Browser-local leads are not shared across devices. Scores are rule-based, not AI-generated. Real n8n, Gmail and Google Sheets integration is not enabled by default. Do not use this prototype for sensitive customer data or a public production CRM.

## n8n bridge (local only)
Publish your existing n8n webhook and start the bridge in PowerShell:
```powershell
$env:N8N_WEBHOOK_URL='http://localhost:5678/webhook/lead-intake'
npm run server
```
Create `.env.local` containing `VITE_API_MODE=live`, then run `npm run dev` in a second terminal.

## Client-facing positioning
A branded lead capture and inquiry routing solution for agencies, consultants and service businesses. Production customizations require secure hosting, real lead storage, authentication, consent, spam prevention and integration testing.
