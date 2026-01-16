export class ProductViewModel {
  static fromModel(productInstance) {
    if (!productInstance) return null;

    const data = productInstance.get({ plain: true });

    return {
      id: data.id,
      nombreProducto: data.NombreProducto,
      marca: data.Marca,
      descripcion: data.Descripcion,
      precioVenta: data.PrecioVenta,
      calificacion: data.Calificacion,
      disponibilidad: data.Disponibilidad,
      stock: data.Disponibilidad,
      idCategoria: data.ID_Categoria,
      idProveedor: data.ID_Proveedor
    };
  }

  static fromModels(instances) {
    return instances.map((i) => ProductViewModel.fromModel(i));
  }
}
