export class OrderDetailViewModel {
  static fromModel(detailInstance) {
    if (!detailInstance) return null;
    const data = detailInstance.get({ plain: true });

    return {
      idDetallePedido: data.ID_DetallePedido,
      idPedido: data.ID_Pedido,
      idProducto: data.ID_Producto,
      cantidad: data.Cantidad,
      precioVenta: data.PrecioVenta,
      descuento: data.Descuento
    };
  }

  static fromModels(instances) {
    return instances.map((i) => OrderDetailViewModel.fromModel(i));
  }
}
