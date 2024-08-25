import app from "./src/server";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`app esta executando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("não foi possivel iniciar o servidor: ", error.message);
  }
};

startServer();
