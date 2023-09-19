import app, { PORT } from "./config/config.js";

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
