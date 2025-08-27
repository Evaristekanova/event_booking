import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

const app = express();
const port = "4000";

app.use(cors());
app.use(express.json());

app.use("/api/v1/", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
