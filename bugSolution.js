const express = require('express');
const app = express();
app.use(express.json({ limit: '50mb' })); // Increased limit
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Invalid JSON received:', err);
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next();
});
app.post('/data', (req, res) => {
  console.log(req.body);
  res.send('OK');
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});