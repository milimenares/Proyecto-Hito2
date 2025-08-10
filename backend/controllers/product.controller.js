import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al archivo JSON
const filePath = path.join(__dirname, "../db/products.json");

function readData() {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (error) {
    console.error("Error leyendo el archivo de productos:", error);
    return null;
  }
}

console.log(readData());

function writeData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error escribiendo el archivo de productos:", error);
  }
}

export const getAllProducts = (req, res) => {
  const products = readData();
  if (!products) {
    return res.status(500).json({ error: "Error interno leyendo productos" });
  }
  res.json(products);
};

export const likeProduct = (req, res) => {
  const products = readData();
  const productId = req.params.id;
  const index = products.findIndex(p => p.id === productId);

  if (index === -1) return res.status(404).json({ error: "Producto no encontrado" });

  products[index].liked = !products[index].liked;

  writeData(products);

  res.json(products[index]);
};

export const getProductById = (req, res) => {
  const products = readData();
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
};

export const createProduct = (req, res) => {
  try {
    const { title, description, condition, price, stock, imageUrl, userEmail } = req.body;

    if (!title || !description || !condition || !price || !stock || !imageUrl) {
      return res.status(400).json({ error: "Faltan campos" });
    }

    const products = readData();

    if (!products) {
      return res.status(500).json({ error: "Error interno leyendo productos" });
    }

    // Crear nuevo producto con id único (ejemplo con timestamp)
    const newProduct = {
      id: `p${Date.now()}`,
      title,
      description,
      condition,
      price,
      stock,
      imageUrl,
      userEmail,
      liked: false // por ejemplo
    };

    products.push(newProduct);

    writeData(products);

    res.status(201).json(newProduct);

  } catch (error) {
    console.error("Error en createProduct:", error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

export const updateProduct = (req, res) => {
  const products = readData();
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Producto no encontrado" });

  products[index] = { ...products[index], ...req.body };
  writeData(products);
  res.json(products[index]);
};

export const deleteProduct = (req, res) => {
  const products = readData();
  const newProducts = products.filter((p) => p.id !== req.params.id);
  if (products.length === newProducts.length)
    return res.status(404).json({ error: "Producto no encontrado" });

  writeData(newProducts);
  res.json({ message: "Producto eliminado" });
};


