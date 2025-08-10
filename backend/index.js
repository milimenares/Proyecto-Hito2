import cors from "cors";
import "dotenv/config";
import express from "express";

import authRoute from "./routes/auth.route.js";
import checkoutRoute from "./routes/checkout.route.js";
import productRoute from "./routes/product.route.js";

const app = express();

app.use(express.json());

// CORS con origen específico y credenciales
app.use(cors({
  origin: "http://localhost:5173", // Reemplaza con el puerto real de tu frontend
  credentials: true
}));

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/checkouts", checkoutRoute);
app.use((_, res) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
