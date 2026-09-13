require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());          // allows frontend (different port) to call this server
app.use(express.json());  // lets Express parse JSON request bodies

// Sanity-check route — confirms the server is alive
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BhoomiDrishti backend is running' });
});

// TODO (Devansh): mount real routes here once schema.sql is applied, e.g.
// const projectsRouter = require('./routes/projects');
// app.use('/api/projects', projectsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});