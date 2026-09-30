import fs from 'fs'; import zlib from 'zlib';
import { W, D, toVox } from './frame.mjs';
const g = fs.readFileSync('data/grid.bin'); const bid = new Int32Array(fs.readFileSync('data/bid.bin').buffer.slice(0));
const b16 = Buffer.alloc(W * D * 2); for (let i = 0; i < W * D; i++) b16.writeUInt16LE(bid[i] & 0xffff, i * 2);
const blob = zlib.deflateSync(Buffer.concat([g, b16]), { level: 9 });
const P = (lon, lat) => toVox(lon, lat).map(v => +v.toFixed(2));
const pts = {
  esb: [-73.98566, 40.74844], chrysler: [-73.97553, 40.75162], wtc: [-74.01313, 40.71303], liberty: [-74.04454, 40.68925],
  timessq: [-73.9855, 40.7580], grandcentral: [-73.9772, 40.7527], flatiron: [-73.9897, 40.7411], rockefeller: [-73.9787, 40.7587],
  un: [-73.9680, 40.7489], woolworth: [-74.0080, 40.7124], battery: [-74.0155, 40.7033], nyse: [-74.0118, 40.7069], ellis: [-74.0396, 40.6995],
  governors: [-74.0168, 40.6895], roosevelt: [-73.9530, 40.7615], columbus: [-73.9819, 40.7681], washsq: [-73.9973, 40.7308], unionsq: [-73.9903, 40.7359],
  vessel: [-74.0022, 40.7536], met: [-73.9632, 40.7794], amnh: [-73.9740, 40.7813], cpark: [-73.9654, 40.7829], bofa: [-73.9846, 40.7556],
  stpatrick: [-73.9760, 40.7585], p432: [-73.9718, 40.7616], cptower: [-73.9808, 40.7657], hudsonyards: [-74.0010, 40.7540], columbia: [-73.9626, 40.8075],
  mbr_m: [-73.9906, 40.7146], mbr_b: [-73.9839, 40.7021], reservoir: [-73.9628, 40.7856], wtcmem: [-74.0133, 40.7115], oculus: [-74.0117, 40.7113],
  bkbr_m: [-73.9998, 40.7108], bkbr_b: [-73.9920, 40.7004],
};
const nb = {
  'Financial District': [-74.0090, 40.7060], 'Tribeca': [-74.0090, 40.7190], 'SoHo': [-74.0025, 40.7225], 'Greenwich Village': [-74.0005, 40.7330], 'East Village': [-73.9840, 40.7268],
  'Chelsea': [-74.0030, 40.7455], 'Midtown': [-73.9925, 40.7575], "Hell's Kitchen": [-73.9945, 40.7650], 'Upper West Side': [-73.9790, 40.7900], 'Upper East Side': [-73.9560, 40.7740],
  'Harlem': [-73.9500, 40.8060], 'Lower East Side': [-73.9840, 40.7140], 'Chinatown': [-73.9965, 40.7150], 'Murray Hill': [-73.9785, 40.7470], 'Battery Park City': [-74.0170, 40.7120],
  'Hoboken': [-74.0300, 40.7440], 'Jersey City': [-74.0430, 40.7180], 'Brooklyn Heights': [-73.9930, 40.6960], 'Williamsburg': [-73.9560, 40.7140], 'Long Island City': [-73.9440, 40.7440],
  'Hudson River': [-74.0150, 40.7530], 'East River': [-73.9800, 40.7350], 'New York Harbor': [-74.0280, 40.6850], 'Astoria': [-73.9300, 40.7660], 'DUMBO': [-73.9880, 40.7030],
};
const out = { W, D, pts: Object.fromEntries(Object.entries(pts).map(([k, v]) => [k, P(...v)])), nb: Object.fromEntries(Object.entries(nb).map(([k, v]) => [k, P(...v)])) };
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/world-data.js', `window.NYDATA=${JSON.stringify(out)};window.NYGRID="${blob.toString('base64')}";`);
console.error('world-data.js', (blob.length / 1024) | 0, 'KB compressed');
