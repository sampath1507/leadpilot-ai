# LeadPilot — Client Demo Playbook

## Goal
Demonstrate how a service business can collect inquiries, identify important leads and automate manual lead handling.

## Part 1: Public portfolio demo (always available)
Open the Vercel site. Show:
1. The landing page and clear business offer.
2. The inquiry form (use fictional contact information only).
3. The dashboard, rule-based score explanations, priority and lead status.
4. The explicit demo-mode banner.

**Important:** Browser-local data is not shared with the operator, and submitting a demo form does not send an email, write to Google Sheets, or trigger n8n. The score is rules-based, not AI.

## Part 2: Live local n8n demonstration (only when running)
Prerequisites:
- Docker Desktop and local n8n running at http://localhost:5678
- Existing published workflow with POST webhook /webhook/lead-intake
- Google Sheets and Gmail nodes already configured and tested
- Node.js installed locally

In PowerShell terminal 1:
```powershell
git clone https://github.com/sampath1507/leadpilot-ai.git
cd leadpilot-ai
npm install
$env:N8N_WEBHOOK_URL='http://localhost:5678/webhook/lead-intake'
npm run server
```

In PowerShell terminal 2 (same project folder):
```powershell
'VITE_API_MODE=live' | Set-Content .env.local
npm run dev
```

Open http://localhost:5173, fill in a **fictional** lead and submit. Verify:
1. The form reports success.
2. The n8n execution appears.
3. The lead row is appended to the configured Google Sheet.
4. The Gmail notification arrives.

**Updated local dashboard:** In live mode, the local bridge retains up to 50 successful submissions in memory and exposes them to the React dashboard on the same computer. Refresh to view the latest leads. Data disappears when the bridge restarts; status editing is disabled in live mode. This is not a durable, authenticated, or synchronized production CRM.

## Troubleshooting
- If the form fails, check that n8n is running and the workflow is published.
- Verify the local bridge shows `LeadPilot bridge listening`.
- Confirm the webhook URL and that the production endpoint is used, not webhook-test.
- Do not put Gmail credentials or n8n secrets into Vite variables or the public repository.

## Short client demo script
'Imagine a potential customer fills out this form. LeadPilot captures the request and highlights important details. In the live automation demonstration, n8n records the inquiry in Google Sheets and notifies the team by email. This can be adapted to your business, tools and follow-up process.'

Do not imply that these are real customer results. Do not use real client data in a public screen recording.


## Verified local integration — 2026-11-19

The project owner reported a successful local end-to-end test using the React site in `VITE_API_MODE=live`, the Node.js bridge, the published `/webhook/lead-intake` n8n workflow, Google Sheets and Gmail.

**Verified by user report:** a form submission was accepted, a Google Sheets row was created, and the Gmail notification arrived.

**Not yet verified:** the new in-memory local dashboard implementation, publicly hosted n8n/backend, synchronized production CRM, actual AI model scoring, customer-facing email auto-replies, and unattended 24/7 delivery.

For a client screen recording, demonstrate the real execution and use fictional data; avoid revealing actual email addresses or credentials.
