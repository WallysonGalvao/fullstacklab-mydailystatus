import admin from "firebase-admin";
import { GeoFirestore } from "geofirestore";
import secret from "../firebase-secret.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(secret),
  });
}

const firestore = admin.firestore();
const db = new GeoFirestore(firestore);

module.exports = { db: db };
