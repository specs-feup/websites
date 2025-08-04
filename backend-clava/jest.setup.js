require('dotenv').config();

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.TOOL = 'clava';
process.env.PORT = '0'; // Use random port for tests