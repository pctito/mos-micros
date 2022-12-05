import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { usersPath } from './api/routes/users.js'
import { itemsPath } from './api/routes/items.js'
import { rootPath } from './api/routes/root.js'
import { config as loadEnv} from 'dotenv'


const app = express();


loadEnv()
mongoose
    .connect(process.env.mongoURI)
    .then(() => console.log('Connected!'))
    .catch(err => console.log(err));


app.use(express.json());
app.use('/', rootPath);
app.use('/users', usersPath);
app.use('/items', itemsPath)

/*
app.all('*', (req, res) => {
    res.status(404)
    .sendFile(path.join(process.env.PWD, 'views', '404.html'))
})
*/

const port = process.env.DB_PORT || 5000;
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));