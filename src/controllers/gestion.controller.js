import { error, success } from "../message/message.js";
import { GestionModel } from "../models/gestion.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads' ));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

/**
 * Controlador para las operaciones relacionadas con la gestión
 * @class GestionController
 */
export class GestionController {
    /**
     * Obtiene el último registro de gestión
     * @param {object} req - Captura peticiones HTML
     * @param {object} res - Devuelve peticiones HTML
     * @memberof GestionController
     */
    static async getLatest(req, res) {
        try {
            const [gestion] = await GestionModel.getLatest();
            res.json(gestion);
        } catch (err) {
            error(req, res, 500, "Error getting latest backup");
        }
    }

    /**
     * Crea un nuevo registro de gestión con un archivo PDF opcional
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.body - El cuerpo de la petición con los datos del registro de gestión
     * @param {object} req.file - El archivo PDF subido
     * @param {object} res - Devuelve peticiones HTML
     * @memberof GestionController
     */
    static create = [
        upload.single('pdf'),
        async (req, res) => {
            try {
                const input = {
                    titulo: req.body.titulo,
                    contenido: req.body.contenido,
                    pdf_path: req.file ? `/uploads/${req.file.filename}` : null
                };

                const gestion = await GestionModel.create({ input });
                success(req, res, 201, "Created", { pdf_path: input.pdf_path });
            } catch (err) {
                console.error(err);
                error(req, res, 500, "Error creating backup");
            }
        }
    ];
}
