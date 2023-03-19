import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config();

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;

    try {
        const { default: fetch } = await import('node-fetch');

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages,
            }),
        });

        const data = await response.json();
        res.json(data);
        console.log(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
