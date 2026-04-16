// import app from "../server.js";
// import { connectDB } from "../config/db.js";

// export default async function handler(req, res) {
//   // Ensure DB connection before handling requests
//   await connectDB();
//   return app(req, res);
// }

import app from "../server.js";
import { connectDB } from "../config/db.js";

let isConnected = false;

export default async function handler(req, res) {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }

    return app(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}