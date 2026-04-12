const BASE_STEPS = [
  50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500,
  550, 600, 650, 700, 750, 800, 850, 900, 925, 950,
];

const PRIMARY_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const FIXED_LIGHT_SCALE = {
  50: '#fafafa',
  75: '#f7f7f7',
  100: '#f4f4f5',
  150: '#ececee',
  200: '#e4e4e7',
  250: '#dcdcdf',
  300: '#d4d4d8',
  350: '#babac1',
  400: '#a1a1aa',
  450: '#898992',
  500: '#71717a',
  550: '#61616a',
  600: '#52525b',
  650: '#484850',
  700: '#3f3f46',
  750: '#333338',
  800: '#27272a',
  850: '#1f1f22',
  900: '#18181b',
  925: '#101013',
  950: '#09090b',
};

function mixHexSrgb(hexA, hexB, weightB = 0.5) {
  const a = hexA.replace('#', '');
  const b = hexB.replace('#', '');
  const aRgb = [0, 2, 4].map((i) => parseInt(a.slice(i, i + 2), 16));
  const bRgb = [0, 2, 4].map((i) => parseInt(b.slice(i, i + 2), 16));
  const weightA = 1 - weightB;
  const mixed = aRgb.map((value, i) => Math.round((value * weightA) + (bRgb[i] * weightB)));
  return `#${mixed.map((value) => value.toString(16).padStart(2, '0')).join('')}`;
}

async function generateOklchScale() {
  const { converter, interpolate } = await import('culori');
  const toHex = converter('hex');
  const base = { ...FIXED_LIGHT_SCALE };

  for (let i = 0; i < PRIMARY_STEPS.length - 1; i++) {
    const start = PRIMARY_STEPS[i];
    const end = PRIMARY_STEPS[i + 1];
    const midpoint = BASE_STEPS.find((step) => step > start && step < end);
    if (!midpoint) continue;
    const blend = interpolate([base[start], base[end]], 'oklch');
    base[midpoint] = toHex(blend(0.5));
  }

  return base;
}

export async function getLightBaseScale(mode = 'fixed') {
  if (mode === 'oklch') {
    return generateOklchScale();
  }
  return { ...FIXED_LIGHT_SCALE };
}

export function getMirroredDarkSemanticScale(lightScale) {
  return BASE_STEPS.reduce((acc, step) => {
    acc[step] = lightScale[1000 - step];
    return acc;
  }, {});
}

export function formatCssVarLines(scale, prefix = '--zabi-base-') {
  return BASE_STEPS.map((step) => `  ${prefix}${step}: ${scale[step]};`).join('\n');
}

export function formatSemanticAliasLines(prefix = '--zabi-base-') {
  return BASE_STEPS.map((step) => `  --color-base-${step}: var(${prefix}${step});`).join('\n');
}

export { BASE_STEPS, PRIMARY_STEPS };
