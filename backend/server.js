const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db'); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/api/contact', async (req, res) => {
  const { phoneNumber, email } = req.body;

  if (!phoneNumber || !email) {
    return res.status(400).json({ message: 'Phone and email are required' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO contacts (phoneNumber, email) VALUES (?, ?)',
      [phoneNumber, email]
    );

    console.log('New contact saved:', phoneNumber, email);

    res.status(200).json({ message: 'Contact saved successfully', id: result.insertId });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Database error', error: err.message });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM contacts ORDER BY submittedAt DESC');
    res.json(rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Database error', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
