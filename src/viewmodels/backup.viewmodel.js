export class BackupViewModel {
  static fromModel(backupInstance) {
    if (!backupInstance) return null;

    const data = backupInstance.get({ plain: true });

    return {
      id: data.ID,
      fechaHora: data.FechaHora,
      nombreBD: data.NombreBD,
      versionBD: data.VersionBD,
      tipo: data.Tipo,
      ubicacion: data.Ubicacion,
      informacion: data.Informacion
    };
  }
}
