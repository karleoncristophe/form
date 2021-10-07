const express = require('express');
const cors = require('cors');
const path = require('path');
const port = 4000;
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/files', express.static(path.resolve(__dirname, 'tmp', 'uploads')));

app.use(require('../src/routes/routes'));

app.listen(port, () => {
   console.log(`Example app listening at localhost:${port}`);
});
