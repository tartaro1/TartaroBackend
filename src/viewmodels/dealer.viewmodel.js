export class DealerViewModel {
  static fromModel(userInstance) {
    if (!userInstance) return null;

    const data = userInstance.get({ plain: true });

    return {
      idUsuario: data.ID_Usuario,
      nombre: data.Nombre,
      celular: data.Celular,
      cedula: data.Cedula,
      direccion: data.Direccion,
      correo: data.Correo,
      idRol: data.ID_Rol,
      estadoUsuario: data.EstadoUsuario
    };
  }

  static fromModels(instances) {
    return instances.map((i) => DealerViewModel.fromModel(i));
  }
}
