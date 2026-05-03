# Election Guide Assistant (ECI)

A neutral, step-by-step civic assistant that helps users understand eligibility, registration, election timelines, voting day procedures, and common questions for India. The structure is modular so other regions can be added later.

## What is included

- Guided flow for eligibility and registration
- Timeline and voting day walkthrough
- FAQ with process-only answers
- Firebase and Cloud Functions stubs
- Maps and NLU integration placeholders

## Local development

1. `npm install`
2. `npm run dev`

## Build and preview

1. `npm run build`
2. `npm run preview`

## Live Demo

The application is deployed on Google Cloud Run and can be accessed here:
**[Election Guide Assistant - Live](https://electiom-app-679128740140.us-central1.run.app)**

## Deployment (Google Cloud Run)

This project is configured to run in a Docker container using Nginx to serve the static Vite build.

To deploy to Google Cloud Run:
1. Ensure you have the `gcloud` CLI installed and authenticated:
   ```bash
   gcloud auth login
   gcloud auth application-default login
   ```
2. Run the deployment command from the root of the project:
   ```bash
   gcloud run deploy electiom-app --source . --project <your-project-id> --region <your-region> --allow-unauthenticated
   ```

## Configuration

Copy `.env.example` to `.env` and replace the placeholder values.

Environment variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_MAPS_API_KEY`

## Firebase and Functions

- `firebase.json`, `firestore.rules`, and `firestore.indexes.json` are included as safe defaults.
- `functions/` contains a Cloud Functions stub. Install dependencies in that folder when you are ready to deploy.

## Notes

- Rules, deadlines, and accepted documents can vary by state and election type.
- If anything is unclear, confirm details with official ECI guidance.
- Do not store sensitive personal data unless required for an official process.
