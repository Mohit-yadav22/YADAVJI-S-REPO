import { connectionDB } from './config/database.js';
import express from 'express';
import router from './routers/crudrouter.js';
import userRoutes from './routers/userrouter.js';
import userauth from './Middlewares/Auth.js';

connectionDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//   res.send('Server is running ');
// });


app.use('/user', userRoutes);


app.use('/student', userauth, router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
