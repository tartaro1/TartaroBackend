import routesProducts from "./routes.product.js";
import routesUsers from "./routes.users.js";
import routesOrders from "./routes.orders.js";
import routesDelivers from "./routes.dealers.js";
import { Router } from "express";
import routesDetails from "./routes.details.js";
import routesBackup from "./routes.backup.js";
import routesGestion from "./routes.gestion.js";

const indexRouter = Router();

indexRouter.use("/products", routesProducts);
indexRouter.use("/users", routesUsers);
indexRouter.use("/dealers", routesDelivers);
indexRouter.use("/orders", routesOrders);
indexRouter.use("/detailsOrders", routesDetails);
indexRouter.use("/backup", routesBackup);
indexRouter.use("/gestion", routesGestion)

export default indexRouter;