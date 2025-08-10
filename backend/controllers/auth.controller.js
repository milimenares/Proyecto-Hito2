import "dotenv/config";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { authModel } from "../models/auth.model.js";
import { isValidEmail } from "../utils/validators/email.validate.js";

const login = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;

    console.log("Body recibido:", req.body);

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const user = await authModel.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const payload = { email, id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({ email, token });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const register = async (req, res) => {
  try {
    const { name = "", email = "", password = "" } = req.body;

    if (!name.trim() || !email.trim() || !password.trim()) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const user = await authModel.getUserByEmail(email);
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = { id: nanoid(), name, email, password };
    await authModel.addUser(newUser);

    const payload = { id: newUser.id, email: newUser.email, name: newUser.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({ email: newUser.email, name: newUser.name, token });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};


const me = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await authModel.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const authController = {
  login,
  register,
  me,
};
