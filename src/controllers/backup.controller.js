import { error, success } from "../message/message.js";
import { BackupsService } from "../services/backups.service.js";
import { BackupViewModel } from "../viewmodels/backup.viewmodel.js";

const backupsService = new BackupsService();

/**
 * Controlador para las operaciones relacionadas con los backups
 * @class BackupsController
 */
export class BackupsController {
  /**
   * Obtiene el backup más reciente
   * @param {object} req - Captura peticiones HTTP
   * @param {object} res - Devuelve respuestas HTTP
   * @memberof BackupsController
   */
  static async getLatest(req, res) {
    try {
      const backup = await backupsService.getLatest();
      res.json(BackupViewModel.fromModel(backup));
    } catch (err) {
      error(req, res, 500, "Error getting latest backup");
    }
  }

  /**
   * Crea un nuevo backup
   * @param {object} req - Captura peticiones HTTP
   * @param {object} req.body - Los datos para crear el backup
   * @param {object} res - Devuelve respuestas HTTP
   * @memberof BackupsController
   */
  static async create(req, res) {
    try {
      const input = req.body;
      const backup = await backupsService.create(input);
      success(req, res, 201, "Created backup", {
        backup: BackupViewModel.fromModel(backup)
      });
    } catch (err) {
      error(req, res, 500, "Error creating backup");
    }
  }
}
