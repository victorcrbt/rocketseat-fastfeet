import { ControllerMethod } from 'express';

import File from '../models/File';

class FileController {
  public store: ControllerMethod = async (req, res) => {
    const {
      originalname: original_name,
      filename: name,
      mimetype: mime_type,
    } = req.file;

    try {
      const file = await File.create({
        original_name,
        name,
        mime_type,
      });

      return res.status(201).json(file);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default new FileController();
