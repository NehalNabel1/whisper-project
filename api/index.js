// import app from "../server.js";
// import { connectDB } from "../config/db.js";

// export default async function handler(req, res) {
//   // Ensure DB connection before handling requests
//   await connectDB();
//   return app(req, res);
// }

import serverless from "serverless-http";
import app from "../server.js";
import { connectDB } from "../config/db.js";

let isConnected = false;

const handler = serverless(app);

export default async function (req, res) {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }

    return handler(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
