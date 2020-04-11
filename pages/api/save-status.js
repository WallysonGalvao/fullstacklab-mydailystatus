import admin from "firebase-admin";
import { db } from "../../lib/db";
import auth0 from "../../lib/auth0";

export default async function saveStatus(req, res) {
  const { status, coords } = req.body;
  const session = await auth0.getSession(req);
  const currentDate = new Date().toISOString().substr(0, 10);

  try {
    if (session) {
      const { user } = session;
      await db
        .collection("markers")
        .doc(currentDate)
        .collection("checks")
        .doc(user.sub)
        .set({
          status,
          user: user.sub,
          coordinates: new admin.firestore.GeoPoint(
            coords.latitude,
            coords.longitude
          ),
        });
      res.send({ ok: true });
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
