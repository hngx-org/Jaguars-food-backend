import app, { PORT } from './config/config.js';

app.listen(PORT, () => {
  console.log(`Server running ...\n\n👉  http://localhost:${PORT}/`);
});
