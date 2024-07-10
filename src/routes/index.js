import routesProducts from "./routes.product.js";
import routesUsers from "./routes.users.js";
import routesOrders from "./routes.orders.js";
import routesDelivers from "./routes.dealers.js";
import { Router } from "express";
import routesDetails from "./routes.details.js";
import routesBackup from "./routes.backup.js";
import routesGestion from "./routes.gestion.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../tools/swagger-output.json";
import routesBills from "./routes.bills.js";
import routesProviders from "./routes.providers.js";
import routesCategories from "./routes.category.js";
/**
 * Estas son las rutas de mi proyecto
 * @type {Object}
 */
const indexRouter = Router();

indexRouter.use("/bills", routesBills)
indexRouter.use("/products", routesProducts);
indexRouter.use("/users", routesUsers);
indexRouter.use("/dealers", routesDelivers);
indexRouter.use("/orders", routesOrders);
indexRouter.use("/detailsOrders", routesDetails);
indexRouter.use("/backup", routesBackup);
indexRouter.use("/gestion", routesGestion)
indexRouter.use("/providers", routesProviders)
indexRouter.use("/categories", routesCategories)
indexRouter.use("/doc", swaggerUi.serve,  swaggerUi.setup(swaggerFile))
export default indexRouter;