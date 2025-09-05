const express = require('express');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  Credential: true
}
app.use(cors(corsOptions));
app.use(express.json());

const _dirname = path.resolve();

const dbURI = process.env.MONGO_URL;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/notes', require('./routes/notes'));
app.use('/api/users', require('./routes/users'));

app.use(express.static(path.join(_dirname, "frontend", "build")));

// Catch-all for React Router
app.use((req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
});


// Middleware to authenticate user


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
