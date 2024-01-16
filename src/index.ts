// src/index.js
import { createServer } from 'http';
import express from 'express';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const repo = process.env.GIT_REPO;

app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '../public')));

const server = createServer(app);
const router = express.Router();

// Helper function for locating public static files
const servePublicFile = (fileName: string): string => join(__dirname, '../public/' + fileName);

//-------------------
/*
 Public Routes
*/
//-------------------
router.get('/', (req, res) => {
  res.sendFile(servePublicFile('index.html'));
});

//-------------------
server.listen(port, () => {
  console.log(`listening on port ${port}`);
  console.log(`Watching Git repo: [[ ${repo} ]]`);
});
