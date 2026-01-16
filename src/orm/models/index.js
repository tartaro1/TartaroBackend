import defineCargo from "./cargo.model.js";
import defineCategoria from "./categorias.model.js";
import defineContenidoInformativo from "./contenidoInformativo.model.js";
import defineCopiaSeguridad from "./copiasSeguridad.model.js";
import defineDetalleFactura from "./detalleFactura.model.js";
import defineDetallePedido from "./detallePedido.model.js";
import defineFactura from "./facturas.model.js";
import defineMetodoPago from "./metodoPagos.model.js";
import definePedido from "./pedidos.model.js";
import defineProducto from "./productos.model.js";
import defineProveedor from "./proveedores.model.js";
import defineUsuario from "./usuarios.model.js";

export const initModels = (sequelize) => {
  const Cargo = defineCargo(sequelize);
  const Categoria = defineCategoria(sequelize);
  const ContenidoInformativo = defineContenidoInformativo(sequelize);
  const CopiaSeguridad = defineCopiaSeguridad(sequelize);
  const DetalleFactura = defineDetalleFactura(sequelize);
  const DetallePedido = defineDetallePedido(sequelize);
  const Factura = defineFactura(sequelize);
  const MetodoPago = defineMetodoPago(sequelize);
  const Pedido = definePedido(sequelize);
  const Producto = defineProducto(sequelize);
  const Proveedor = defineProveedor(sequelize);
  const Usuario = defineUsuario(sequelize);

  MetodoPago.hasMany(Factura, { foreignKey: "ID_Metodo_Pago", as: "facturas" });
  Factura.belongsTo(MetodoPago, { foreignKey: "ID_Metodo_Pago", as: "metodoPago" });

  Pedido.hasMany(Factura, { foreignKey: "ID_Pedido", as: "facturas" });
  Factura.belongsTo(Pedido, { foreignKey: "ID_Pedido", as: "pedido" });

  Usuario.hasMany(Factura, { foreignKey: "ID_Cliente", as: "facturas" });
  Factura.belongsTo(Usuario, { foreignKey: "ID_Cliente", as: "cliente" });

  Factura.hasMany(DetalleFactura, { foreignKey: "ID_Factura", as: "detalles" });
  DetalleFactura.belongsTo(Factura, { foreignKey: "ID_Factura", as: "factura" });

  Producto.hasMany(DetalleFactura, { foreignKey: "ID_Producto", as: "detalleFacturas" });
  DetalleFactura.belongsTo(Producto, { foreignKey: "ID_Producto", as: "producto" });

  Pedido.hasMany(DetallePedido, { foreignKey: "ID_Pedido", as: "detalles" });
  DetallePedido.belongsTo(Pedido, { foreignKey: "ID_Pedido", as: "pedido" });

  Producto.hasMany(DetallePedido, { foreignKey: "ID_Producto", as: "detallePedidos" });
  DetallePedido.belongsTo(Producto, { foreignKey: "ID_Producto", as: "producto" });

  Usuario.hasMany(Pedido, { foreignKey: "Cliente", as: "pedidos" });
  Pedido.belongsTo(Usuario, { foreignKey: "Cliente", as: "cliente" });

  Usuario.hasMany(Pedido, { foreignKey: "ID_Rol", sourceKey: "ID_Rol", as: "pedidosPorRol" });
  Pedido.belongsTo(Usuario, { foreignKey: "ID_Rol", targetKey: "ID_Rol", as: "rolUsuario" });

  Categoria.hasMany(Producto, { foreignKey: "ID_Categoria", as: "productos" });
  Producto.belongsTo(Categoria, { foreignKey: "ID_Categoria", as: "categoria" });

  Proveedor.hasMany(Producto, { foreignKey: "ID_Proveedor", as: "productos" });
  Producto.belongsTo(Proveedor, { foreignKey: "ID_Proveedor", as: "proveedor" });

  return {
    Cargo,
    Categoria,
    ContenidoInformativo,
    CopiaSeguridad,
    DetalleFactura,
    DetallePedido,
    Factura,
    MetodoPago,
    Pedido,
    Producto,
    Proveedor,
    Usuario
  };
};
