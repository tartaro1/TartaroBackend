export class OrderViewModel {
  static fromModel(orderInstance) {
    if (!orderInstance) return null;
    const data = orderInstance.get({ plain: true });

    return {
      idPedido: data.ID_Pedido,
      estadoPedido: data.EstadoPedido,
      direccion: data.Direccion,
      cliente: data.Cliente,
      precioVenta: data.PrecioVenta,
      idRol: data.ID_Rol,
      rolId: data.ID_Rol,
      dealerId: data.ID_Rol,
      dealerID: data.ID_Rol,
      fechaPedido: data.FechaPedido
    };
  }

  static fromModels(instances) {
    return instances.map((i) => OrderViewModel.fromModel(i));
  }
}
