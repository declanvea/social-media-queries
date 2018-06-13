const { Client } = require('pg');
const express = require('express');

const app = express();
app.use(express.json());

const client = new Client({
    database: 'social-media'
});

app.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        res.send(result.rows);
    });
});

app.post('/users', (req, res) => {
        const text = 'INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *';
        const values = ['kenzie', 'Kenzie Academy is a user experience design and coding school in Indianapolis, Indiana.'];
        client.query(text, values, (err, result) => {
            res.send(result.rows[0]);
        });
});

app.get('/users/:id', (req, res) => {
    const text = 'SELECT * FROM users WHERE id=$1';
    const values = [req.params.id];
    client.query(text, values, (err, result) => {
        res.send(result.rows[0]);
    })
})

app.listen(3000, () => {
    client.connect();
});