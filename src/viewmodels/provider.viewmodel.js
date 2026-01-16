export class ProviderViewModel {
  static fromModel(providerInstance) {
    if (!providerInstance) return null;
    const data = providerInstance.get({ plain: true });

    return {
      idProveedor: data.ID_Proveedor,
      nombre: data.Nombre,
      direccion: data.Direccion,
      telefono: data.Telefono,
      correo: data.Correo
    };
  }

  static fromModels(instances) {
    return instances.map((i) => ProviderViewModel.fromModel(i));
  }
}
