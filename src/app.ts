import express, { Express } from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import addressRoutes from "./routes/address.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app: Express = express();

app.use(bodyParser.json());
app.use(errorHandler);

// API Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/addresses", addressRoutes);

export default app;
