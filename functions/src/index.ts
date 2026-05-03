import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp()

export const guide = functions.https.onRequest((request, response) => {
  const payload = request.body ?? {}
  const userState = payload.state ?? null

  response.json({
    ok: true,
    message: 'Election guide function stub',
    stateReceived: Boolean(userState),
  })
})
