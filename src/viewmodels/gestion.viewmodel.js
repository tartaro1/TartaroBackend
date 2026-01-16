export class GestionViewModel {
  static fromModel(gestionInstance, { pdfPath } = {}) {
    if (!gestionInstance) return null;

    const data = gestionInstance.get({ plain: true });

    return {
      idContenido: data.ID_Contenido,
      titulo: data.Titulo,
      contenido: data.Contenido,
      pdf_path: pdfPath ?? null
    };
  }
}
