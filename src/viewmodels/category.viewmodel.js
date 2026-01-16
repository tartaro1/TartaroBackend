export class CategoryViewModel {
  static fromModel(categoryInstance) {
    if (!categoryInstance) return null;
    const data = categoryInstance.get({ plain: true });

    return {
      idCategoria: data.ID_Categoria,
      nombre: data.Nombre,
      descripcion: data.Descripcion,
      estadoCategoria: data.EstadoCategoria
    };
  }

  static fromModels(instances) {
    return instances.map((i) => CategoryViewModel.fromModel(i));
  }
}
