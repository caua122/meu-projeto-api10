const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

const dataPath = path.join(__dirname, 'data.json');

// Middleware para parsing de JSON
app.use(express.json());

// Função para carregar o JSON a cada request
function loadData() {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao carregar data.json:', err);
        return {}; // Retorna objeto vazio se der erro
    }
}

// Rota para /cs/:id
app.get('/cs/:id', (req, res) => {
    const data = loadData(); // Carrega em tempo real
    const id = req.params.id;

    if (data[id]) {
        res.json(data[id]);
    } else {
        res.status(404).json({
            ok: false,
            message: `ID '${id}' not found.`
        });
    }
});

// Rota raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo à API CS.');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
