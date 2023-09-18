import app, { PORT } from "./config/config.js";
import router from "./routes/router.js";

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
