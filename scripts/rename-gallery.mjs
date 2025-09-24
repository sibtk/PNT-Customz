import fs from 'fs';
import path from 'path';

const galleryDir = path.resolve(process.cwd(), 'public', 'gallery');
if (!fs.existsSync(galleryDir)) {
  console.error('No public/gallery directory found');
  process.exit(1);
}

let entries = fs.readdirSync(galleryDir)
  .filter((f) => !f.startsWith('.'))
  .map((f) => {
    const full = path.join(galleryDir, f);
    const stat = fs.statSync(full);
    return { name: f, ext: path.extname(f).toLowerCase(), full, mtime: stat.mtimeMs };
  })
  .filter((e) => ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov'].includes(e.ext));

// Sort by modified time, then name
entries.sort((a, b) => (a.mtime - b.mtime) || a.name.localeCompare(b.name));

// Stage: move to temp names to avoid collisions
entries.forEach((e, idx) => {
  const temp = path.join(galleryDir, `__tmp_${idx}${e.ext}`);
  fs.renameSync(e.full, temp);
  e.full = temp;
});

const manifest = { items: /** @type {{src:string,type:'image'|'video'}[]} */([]) };

entries.forEach((e, i) => {
  const isVideo = ['.mp4', '.mov'].includes(e.ext);
  const seq = String(i + 1).padStart(3, '0');
  const target = path.join(galleryDir, `g-${seq}${isVideo ? '.mp4' : '.jpg'}`);
  fs.renameSync(e.full, target);
  console.log('Renamed to', path.basename(target));
  manifest.items.push({ src: `/gallery/${path.basename(target)}`, type: isVideo ? 'video' : 'image' });
});

fs.writeFileSync(path.join(galleryDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Wrote manifest.json with', manifest.items.length, 'items.');


