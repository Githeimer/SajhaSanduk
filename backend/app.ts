import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Backend is running!'));

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Server crash: ${err.message}`);
  } else {
    console.log(`Server running on http://localhost:${PORT}`);
  }
});
