const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());

app.use(bodyParser.json());

const contactsFile = path.join(__dirname, 'contacts.json');

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/api/contact', (req, res) => {
  const { phoneNumber, email } = req.body;

  if (!phoneNumber || !email) {
    return res.status(400).json({ message: 'Phone and email are required' });
  }

  let contacts = [];
  if (fs.existsSync(contactsFile)) {
    contacts = JSON.parse(fs.readFileSync(contactsFile, 'utf8'));
  }

  contacts.push({ phoneNumber, email, submittedAt: new Date() });

  fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));

  console.log('New contact saved:', phoneNumber, email);

  res.status(200).json({ message: 'Contact saved successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
