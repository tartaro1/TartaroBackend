export class BillViewModel {
  static fromModel(billInstance) {
    if (!billInstance) return null;
    const data = billInstance.get({ plain: true });

    const base = {
      idFactura: data.ID_Factura,
      idCliente: data.ID_Cliente,
      idMetodoPago: data.ID_Metodo_Pago,
      idPedido: data.ID_Pedido,
      fecha: data.Fecha,
      estadoFactura: data.EstadoFactura,
      impuesto: data.Impuesto,
      total: data.Total
    };

    if (data.cliente) {
      base.cliente = {
        idUsuario: data.cliente.ID_Usuario,
        nombre: data.cliente.Nombre,
        celular: data.cliente.Celular,
        cedula: data.cliente.Cedula,
        direccion: data.cliente.Direccion,
        correo: data.cliente.Correo,
        idRol: data.cliente.ID_Rol,
        estadoUsuario: data.cliente.EstadoUsuario
      };
    }

    if (data.pedido) {
      base.pedido = {
        idPedido: data.pedido.ID_Pedido,
        estadoPedido: data.pedido.EstadoPedido,
        direccion: data.pedido.Direccion,
        cliente: data.pedido.Cliente,
        precioVenta: data.pedido.PrecioVenta,
        idRol: data.pedido.ID_Rol,
        fechaPedido: data.pedido.FechaPedido
      };
    }

    if (data.metodoPago) {
      base.metodoPago = {
        idMetodoPago: data.metodoPago.ID_Metodo_Pago,
        monto: data.metodoPago.Monto,
        tipoTarjeta: data.metodoPago.TipoTarjeta,
        numeroTarjeta: data.metodoPago.NumeroTarjeta,
        transacion: data.metodoPago.Transacion,
        fechaHora: data.metodoPago.FechaHora
      };
    }

    return base;
  }

  static fromModelWithDetails(billInstance) {
    if (!billInstance) return null;
    const data = billInstance.get({ plain: true });

    return {
      ...BillViewModel.fromModel(billInstance),
      detalles: Array.isArray(data.detalles)
        ? data.detalles.map((d) => ({
          idDetalleFactura: d.ID_DetalleFactura,
          idFactura: d.ID_Factura,
          idProducto: d.ID_Producto,
          cantidad: d.Cantidad,
          precioVenta: d.PrecioVenta,
          descuento: d.Descuento,
          producto: d.producto
            ? {
              id: d.producto.id,
              nombreProducto: d.producto.NombreProducto,
              marca: d.producto.Marca,
              descripcion: d.producto.Descripcion,
              precioVenta: d.producto.PrecioVenta,
              calificacion: d.producto.Calificacion,
              disponibilidad: d.producto.Disponibilidad,
              stock: d.producto.Disponibilidad,
              idCategoria: d.producto.ID_Categoria,
              idProveedor: d.producto.ID_Proveedor
            }
            : null
        }))
        : []
    };
  }

  static fromModels(instances) {
    return instances.map((i) => BillViewModel.fromModel(i));
  }
}
