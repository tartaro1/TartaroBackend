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
export class GestionController {
    static getLatest = async(req, res) => {
        try {
            const [gestion] = await GestionModel.getLatest();
            res.json(gestion);
        } catch (err) {
            error(req, res, 500, "Error getting latest backup");
        }
    }
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