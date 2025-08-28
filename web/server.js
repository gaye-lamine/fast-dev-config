import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.json());

app.post('/api/templates', (req, res) => {
    res.json({ success: true, message: 'Template sauvegardé' });
});

app.get('/api/templates', (req, res) => {
    res.json([]);
});

app.listen(PORT, () => {
    console.log(`🚀 Interface web disponible sur http://localhost:${PORT}`);
    console.log(`📁 Serveur démarré depuis ${__dirname}`);
});