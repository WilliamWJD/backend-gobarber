import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

app.post('/user', (req, res) => {
    const { name, email } = req.body;

    const user = { name, email };

    return res.json(user);
});

app.listen(3333, () => {
    console.log('✔ Server started on port 3333');
});
