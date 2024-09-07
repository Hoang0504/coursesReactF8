import apiRouter from "./apiRouter.js";

const route = (app) => {
  app.use("/api", apiRouter);
};

export default route;
