import { sphere, ellipsoid, rc, chain, makeScene, mirrorZ } from './sdf.mjs';

const P = (p, k = 0.05, sub = false) => ({ p, k, sub });
const PS = (arr, k) => arr.map((p) => P(p, k));

// ---------- horse: front / hind legs ----------
function frontLeg(side, dx, lift = 0) {
  const z = 0.16 * side;
  const it = [];
  it.push(...PS(chain([[0.50, 1.10, z * 1.1], [0.52 + dx * 0.4, 0.78, z], [0.53 + dx, 0.54 + lift, z]], [0.19, 0.13, 0.075]), 0.07));
  it.push(P(sphere([0.53 + dx, 0.54 + lift, z], 0.08), 0.05));          // knee
  it.push(...PS(chain([[0.53 + dx, 0.54 + lift, z], [0.53 + dx, 0.19 + lift, z]], [0.064, 0.052]), 0.04));
  it.push(P(sphere([0.53 + dx, 0.15 + lift, z], 0.068), 0.04));           // fetlock
  it.push(...PS(chain([[0.53 + dx, 0.15 + lift, z], [0.565 + dx, 0.06 + lift, z]], [0.058, 0.09]), 0.03));   // pastern+hoof
  it.push(P(rc([0.575 + dx, 0.085 + lift, z], [0.585 + dx, -0.01 + lift, z], 0.10, 0.105, 1), 0.02));        // hoof wall
  return it;
}
function hindLeg(side, dx, lift = 0) {
  const z = 0.19 * side;
  const it = [];
  it.push(...PS(chain([[-0.60, 1.30, z * 0.9], [-0.44 + dx * 0.5, 0.88, z], [-0.66 + dx, 0.52 + lift, z]], [0.29, 0.16, 0.09]), 0.10));
  it.push(P(sphere([-0.70 + dx, 0.55 + lift, z], 0.085), 0.05));           // hock point
  it.push(...PS(chain([[-0.66 + dx, 0.52 + lift, z], [-0.63 + dx, 0.19 + lift, z]], [0.075, 0.054]), 0.04));
  it.push(P(sphere([-0.63 + dx, 0.15 + lift, z], 0.068), 0.04));
  it.push(...PS(chain([[-0.63 + dx, 0.15 + lift, z], [-0.595 + dx, 0.06 + lift, z]], [0.056, 0.09]), 0.03));
  it.push(P(rc([-0.585 + dx, 0.085 + lift, z], [-0.575 + dx, -0.01 + lift, z], 0.10, 0.105, 1), 0.02));
  return it;
}

function horseItems() {
  const it = [];
  // torso
  it.push(P(ellipsoid([0.06, 1.16, 0], [0.70, 0.40, 0.30]), 0.1));
  it.push(P(ellipsoid([0.50, 1.15, 0], [0.34, 0.43, 0.29]), 0.12));            // chest
  it.push(P(ellipsoid([-0.62, 1.24, 0], [0.36, 0.40, 0.30]), 0.14));           // hindquarters
  it.push(P(ellipsoid([0.40, 1.50, 0], [0.22, 0.12, 0.11]), 0.10));            // withers
  it.push(P(ellipsoid([-0.30, 1.52, 0], [0.55, 0.09, 0.17]), 0.10));           // back/croup ridge
  // neck (ends inside head region)
  it.push(...PS(chain([[0.52, 1.30, 0], [0.80, 1.55, 0], [0.99, 1.80, 0]], [0.34, 0.26, 0.175], 0.78), 0.13));
  // mane crest
  it.push(...PS(chain([[0.56, 1.66, 0], [0.80, 1.80, 0], [0.98, 1.98, 0]], [0.055, 0.05, 0.04], 0.55), 0.06));
  // legs
  it.push(...frontLeg(+1, 0.00));
  it.push(...frontLeg(-1, 0.16, 0.0));
  it.push(...hindLeg(+1, -0.04));
  it.push(...hindLeg(-1, 0.10, 0.0));
  // tail
  it.push(...PS(chain([[-0.90, 1.44, 0], [-1.04, 1.24, 0], [-1.12, 0.92, 0], [-1.14, 0.58, 0], [-1.10, 0.34, 0]], [0.075, 0.105, 0.10, 0.07, 0.028], 1.0), 0.12));

  return it;
}

function riderItems() {
  const it = [];
  // saddle + deel skirt
  it.push(P(ellipsoid([0.10, 1.57, 0], [0.30, 0.07, 0.21]), 0.06));
  it.push(P(ellipsoid([0.04, 1.63, 0], [0.32, 0.10, 0.30]), 0.08));
  for (const s of [-1, 1]) {
    it.push(P(rc([0.16, 1.62, 0.31 * s], [0.02, 1.16, 0.36 * s], 0.20, 0.17, 0.28), 0.05));  // skirt panel
    // leg
    const hip = [0.08, 1.66, 0.19 * s], knee = [0.36, 1.38, 0.29 * s], ank = [0.32, 0.94, 0.29 * s];
    it.push(...PS(chain([hip, knee, ank], [0.125, 0.088, 0.068]), 0.05));
    it.push(P(sphere(knee, 0.092), 0.05));
    it.push(...PS(chain([[0.35, 1.02, 0.28 * s], [0.36, 0.90, 0.28 * s], [0.50, 0.87, 0.28 * s]], [0.085, 0.08, 0.06]), 0.03)); // boot
    it.push(P(rc([0.34, 0.86, 0.28 * s], [0.52, 0.86, 0.28 * s], 0.06, 0.05, 0.6), 0.03));  // stirrup foot
  }
  // torso
  it.push(...PS(chain([[0.08, 1.70, 0], [0.12, 1.95, 0], [0.16, 2.20, 0]], [0.215, 0.215, 0.225], 1.28), 0.07));
  it.push(P(ellipsoid([0.16, 2.24, 0], [0.18, 0.11, 0.35]), 0.06));           // shoulders/collar
  // shoulders + arms
  for (const s of [-1, 1]) it.push(P(sphere([0.15, 2.21, 0.31 * s], 0.115), 0.05));
  // left arm (reins)
  it.push(...PS(chain([[0.15, 2.21, -0.31], [0.11, 1.95, -0.39], [0.30, 1.90, -0.32], [0.46, 1.97, -0.24]], [0.105, 0.088, 0.075, 0.062]), 0.04));
  it.push(P(sphere([0.48, 1.98, -0.24], 0.07), 0.03));
  // right arm (whip)
  it.push(...PS(chain([[0.15, 2.21, 0.31], [0.22, 1.98, 0.46], [0.44, 2.12, 0.42], [0.60, 2.09, 0.36]], [0.105, 0.088, 0.075, 0.062]), 0.04));
  it.push(P(sphere([0.62, 2.09, 0.36], 0.072), 0.03));
  // neck stub of rider
  it.push(P(rc([0.18, 2.28, 0], [0.20, 2.40, 0], 0.075, 0.062), 0.04));
  return it;
}


export function horseHeadItems() {
  const it = [];
  it.push(P(chain([[0.99, 1.80, 0], [1.06, 1.88, 0]], [0.175, 0.14], 0.78)[0], 0.05));
  it.push(P(sphere([1.12, 1.77, 0], 0.145, 0.72), 0.07));                     // cheek / jowl
  it.push(P(rc([1.07, 1.89, 0], [1.31, 1.60, 0], 0.125, 0.078, 0.74), 0.06));  // skull to muzzle
  it.push(P(rc([1.24, 1.68, 0], [1.365, 1.535, 0], 0.088, 0.078, 0.95), 0.04)); // muzzle
  it.push(P(rc([1.17, 1.72, 0], [1.29, 1.60, 0], 0.09, 0.075, 0.6), 0.03));    // nose ridge
  for (const s of [-1, 1]) {
    it.push(P(sphere([1.155, 1.875, 0.09 * s], 0.026), 0.03));                // brow
    it.push(P(sphere([1.19, 1.815, 0.098 * s], 0.019), 0.02, true));            // eye socket
    it.push(P(sphere([1.375, 1.545, 0.042 * s], 0.019), 0.012, true));          // nostril
    it.push(P(rc([1.04, 1.94, 0.070 * s], [1.00, 2.13, 0.062 * s], 0.036, 0.008), 0.02)); // ear
  }
  it.push(P(rc([1.08, 1.92, 0], [1.16, 1.86, 0], 0.07, 0.04, 0.5), 0.03));    // forelock
  return it;
}

export function riderHeadItems() {
  const it = [];
  const hc = [0.22, 2.49, 0];
  it.push(P(rc([0.19, 2.30, 0], [0.20, 2.42, 0], 0.072, 0.064), 0.03));       // neck
  it.push(P(ellipsoid(hc, [0.104, 0.126, 0.102]), 0.04));                     // skull
  it.push(P(ellipsoid([0.262, 2.462, 0], [0.076, 0.094, 0.090]), 0.05));       // face mass
  it.push(P(ellipsoid([0.27, 2.405, 0], [0.062, 0.05, 0.075]), 0.05));         // jaw
  it.push(P(rc([0.305, 2.545, -0.068], [0.305, 2.545, 0.068], 0.021, 0.021), 0.03));  // brow ridge
  it.push(P(rc([0.316, 2.53, 0], [0.348, 2.465, 0], 0.016, 0.022, 0.85), 0.03));     // nose bridge
  it.push(P(sphere([0.350, 2.458, 0], 0.021, 1.2), 0.02));                        // nose tip
  for (const s of [-1, 1]) {
    it.push(P(sphere([0.286, 2.478, 0.068 * s], 0.028), 0.04));               // cheekbone
    it.push(P(ellipsoid([0.312, 2.52, 0.046 * s], [0.03, 0.008, 0.024]), 0.01, true)); // eye slit
    it.push(P(sphere([0.212, 2.49, 0.102 * s], 0.028, 0.6), 0.03));           // ear
    it.push(P(sphere([0.352, 2.448, 0.022 * s], 0.010), 0.01, true));          // nostril
    it.push(P(rc([0.332, 2.432, 0.004 * s], [0.312, 2.395, 0.072 * s], 0.014, 0.010), 0.02));   // moustache
    it.push(P(rc([0.248, 2.45, 0.090 * s], [0.295, 2.385, 0.045 * s], 0.026, 0.022), 0.03)); // side beard
  }
  it.push(P(rc([0.300, 2.405, 0], [0.318, 2.27, 0], 0.052, 0.016, 0.85), 0.05));      // goatee
  it.push(P(rc([0.336, 2.412, -0.028], [0.336, 2.412, 0.028], 0.006, 0.006), 0.01, true)); // mouth line
  // hat: rounded cap + short brim + finial
  it.push(P(ellipsoid([0.22, 2.628, 0], [0.118, 0.125, 0.118]), 0.04));
  it.push(P(rc([0.22, 2.71, 0], [0.22, 2.765, 0], 0.06, 0.030), 0.04));
  it.push(P(sphere([0.22, 2.782, 0], 0.028), 0.02));
  it.push(P(ellipsoid([0.22, 2.612, 0], [0.150, 0.024, 0.150]), 0.03));
  return it;
}

// uniform scale of an item set about a centre (rider is drawn larger than life)
import { RS, RC } from '../src/shape.js';
function scaleItems(items) {
  return items.map((it) => {
    const f0 = it.p.f, b = it.p.bb;
    const f = (x, y, z) => RS * f0(RC[0] + (x - RC[0]) / RS, RC[1] + (y - RC[1]) / RS, RC[2] + (z - RC[2]) / RS);
    const bb = [0, 1, 2].map((a) => RC[a] + (b[a] - RC[a]) * RS).concat([0, 1, 2].map((a) => RC[a] + (b[a + 3] - RC[a]) * RS));
    return { ...it, k: it.k * RS, p: { f, bb } };
  });
}
export function bodyItems() { return [...horseItems(), ...scaleItems(riderItems())]; }

export function buildScenes() {
  return {
    body: makeScene(bodyItems(), 0),
    horseHead: makeScene(horseHeadItems()),
    riderHead: makeScene(scaleItems(riderHeadItems())),
    herd: makeScene([...horseItems(), ...horseHeadItems()], 0),
  };
}
