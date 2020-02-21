import { Request, Response } from 'express';

import File from '../models/File';

class FileController {
  public async store(req: Request, res: Response): Promise<Response> {
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
  }
}

export default new FileController();
