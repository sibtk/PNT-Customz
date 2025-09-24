import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegStatic);

const galleryDir = path.resolve(process.cwd(), 'public', 'gallery');
if (!fs.existsSync(galleryDir)) {
  console.error('No public/gallery directory found');
  process.exit(1);
}

const entries = fs.readdirSync(galleryDir)
  .filter((f) => !f.startsWith('.'))
  .map((f) => ({ name: f, ext: path.extname(f).toLowerCase(), full: path.join(galleryDir, f) }));

async function optimizeImage(file) {
  const out = file.full.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  await sharp(file.full)
    .resize(1600, 1200, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(out);
  console.log('Image ->', path.basename(out));
}

function optimizeVideo(file) {
  return new Promise((resolve, reject) => {
    const out = file.full.replace(/\.(mp4|mov)$/i, '.mp4');
    ffmpeg(file.full)
      .outputOptions([
        '-movflags +faststart',
        '-pix_fmt yuv420p',
        '-vf scale=w=min(iw\,1280):h=-2',
        '-c:v libx264',
        '-preset veryfast',
        '-crf 24',
        '-c:a aac',
        '-b:a 128k',
      ])
      .on('end', () => { console.log('Video ->', path.basename(out)); resolve(); })
      .on('error', (e) => { console.error('ffmpeg error', e.message); resolve(); })
      .save(out);
  });
}

const run = async () => {
  for (const e of entries) {
    if (['.jpg', '.jpeg', '.png'].includes(e.ext)) {
      await optimizeImage(e);
    } else if (['.mp4', '.mov'].includes(e.ext)) {
      await optimizeVideo(e);
    }
  }
  console.log('Optimization complete. Consider removing original large files after verifying output.');
};

run();


