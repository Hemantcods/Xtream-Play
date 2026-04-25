import app from "./app.js";
import { connectDB } from "./db/index.js";
import { env } from "./config/env.js";
const PORT = env.PORT

await connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});