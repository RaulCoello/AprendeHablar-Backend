import { diskStorage } from 'multer';
import { extname } from 'path';

export const gameImageStorage = diskStorage({
  destination: './uploads/games',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    const ext = extname(file.originalname); // 👈 extensión real

    cb(null, `game-${uniqueSuffix}${ext}`);
  },
});
