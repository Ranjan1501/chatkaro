import { connect } from "./src/config/db.js";
import server from "./index.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 4000;

server.listen(port, async () => {
  try {
    await connect();
    console.log(`listening on Port ${port}`);
  } catch (err) {
    throw new Error("Error in establishing connection");
  }
});
