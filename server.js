import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

const app = express();
const PORT = 5000;

// Caminho para os arquivos JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const usersFilePath = path.resolve(__dirname, 'src/data/users.json');
const productsFilePath = path.resolve(__dirname, 'src/data/ProductStock.json');
const cartFilePath = path.resolve(__dirname, 'src/data/cart.json');
const productsImagePath = path.resolve(__dirname, 'src/assets/img/Products');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(productsImagePath));
app.use('/src/assets/img/Products', express.static(productsImagePath));

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, productsImagePath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Função para ler os dados do arquivo JSON
const readFromFile = (filePath) => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// Função para escrever os dados no arquivo JSON
const writeToFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Rota para registrar um novo usuário
app.post('/register', (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
    }

    const users = readFromFile(usersFilePath);
    const newUser = { username, email, password, role };
    users.push(newUser);
    writeToFile(usersFilePath, users);

    res.status(201).json({ message: 'Registrado com sucesso!' });
});

// Rota para login
app.post('/login', (req, res) => {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
        return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
    }

    const users = readFromFile(usersFilePath);
    const user = users.find(u => (u.username === emailOrUsername || u.email === emailOrUsername) && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    res.status(200).json({ message: 'Logado com sucesso!' });
});

// Rota para adicionar um novo produto
app.post('/products', upload.single('imageFile'), (req, res) => {
    const { name, description, price, category, stock, status, quantidade } = req.body;
    const image = req.file ? `src/assets/img/Products/${req.file.filename}` : '';

    if (!name || !description || !price || !image || !category || !stock || !status || !quantidade) {
        return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
    }

    const products = readFromFile(productsFilePath);
    const newProduct = { id: (products.length + 1).toString(), name, description, price, image, category, stock, status, quantidade };
    products.push(newProduct);
    writeToFile(productsFilePath, products);

    res.status(201).json({ message: 'Produto adicionado com sucesso!' });
});

// Rota para obter todos os produtos
app.get('/products', (req, res) => {
    const products = readFromFile(productsFilePath);
    res.status(200).json(products);
});

// Rota para obter os itens do carrinho
app.get('/cart', (req, res) => {
    const cartItems = readFromFile(cartFilePath);
    res.status(200).json(cartItems);
});

// Rota para adicionar um item ao carrinho
app.post('/cart', (req, res) => {
    const { id, quantity } = req.body;
    const products = readFromFile(productsFilePath);
    const cartItems = readFromFile(cartFilePath);

    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const cartItem = cartItems.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cartItems.push({ ...product, quantity });
    }

    writeToFile(cartFilePath, cartItems);
    res.status(200).json(cartItems);
});

// Rota para remover um item do carrinho
app.delete('/cart/:id', (req, res) => {
    const { id } = req.params;
    let cartItems = readFromFile(cartFilePath);

    cartItems = cartItems.filter(item => item.id !== id);
    writeToFile(cartFilePath, cartItems);
    res.status(200).json(cartItems);
});

// Rota para atualizar a quantidade de um item no carrinho
app.put('/cart/:id', (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const cartItems = readFromFile(cartFilePath);

    const cartItem = cartItems.find(item => item.id === id);
    if (!cartItem) {
        return res.status(404).json({ error: 'Item do carrinho não encontrado' });
    }

    cartItem.quantity = quantity;
    writeToFile(cartFilePath, cartItems);
    res.status(200).json(cartItems);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
