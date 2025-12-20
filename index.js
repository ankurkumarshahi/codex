require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const appName = process.env.APP_NAME || 'Codex Users API';
const environment = process.env.NODE_ENV || 'development';
const version = process.env.APP_VERSION || process.env.npm_package_version || '1.0.0';
const defaultCountry = process.env.DEFAULT_COUNTRY || 'USA';

const dummyUsers = [
  {
    id: 1,
    name: 'Alice Morton',
    designation: 'Software Engineer',
    phone: '+1-555-0177',
    email: 'alice.morton@example.com',
    address: '420 Maple Ridge Dr, Springfield',
    pincode: '62704',
    country: 'USA'
  },
  {
    id: 2,
    name: 'Dev Patel',
    designation: 'Product Manager',
    phone: '+44 20 7946 0958',
    email: 'dev.patel@example.co.uk',
    address: '12B Queensway, London',
    pincode: 'W2 5HF',
    country: 'UK'
  },
  {
    id: 3,
    name: 'Sofia Ramos',
    designation: 'UX Researcher',
    phone: '+55 11 98123-4567',
    email: 'sofia.ramos@example.com.br',
    address: 'Rua das Flores, 210, São Paulo',
    pincode: '01015-000',
    country: 'Brazil'
  },
  {
    id: 4,
    name: 'Ankur Shahi',
    designation: 'Software Developer',
    phone: '+55 11 98123-4567',
    email: 'sofia.ramos@example.com.br',
    address: 'Rua das Flores, 210, São Paulo',
    pincode: '01015-000',
    country: 'Brazil'
  }
];

app.get('/api/getusers', (req, res) => {
  res.json({ users: dummyUsers });
});

app.get('/api/info', (req, res) => {
  res.json({
    appName,
    environment,
    version,
    users: dummyUsers.length,
    defaultCountry
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(
    `${appName} running in ${environment} mode on port ${port} (version ${version})`
  );
});
