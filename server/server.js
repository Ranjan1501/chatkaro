import { connect } from "./src/config/db.js";
import app from "./index.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
app.listen(port, async () => {
  try {
    await connect();
    console.log(`listening on Port  ${port}`);
  } catch (err) {
    throw new Error("Error in establishing connection");
  }
});
