import { Sector } from "../interfaces/isetoresApi";

// Helper: generate dense grid of spots inside a polygon's bounding box
// step: spacing between adjacent spots (we use 2 per user request)
function generateGridSpots(pointsOfInterest: any[], idPrefix: string, step = 2, padding = 8) {
  // compute axis-aligned bounding box from sector points
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of pointsOfInterest) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  // inner bounding box with padding
  const startX = Math.ceil(minX + padding);
  const endX = Math.floor(maxX - padding);
  const startY = Math.ceil(minY + padding);
  const endY = Math.floor(maxY - padding);

  const spots: any[] = [];
  let counter = 1;
  for (let y = startY; y <= endY; y += step) {
    for (let x = startX; x <= endX; x += step) {
      spots.push({ spotId: `${idPrefix}-P${counter}`, x, y, status: 'livre' });
      counter++;
    }
  }
  return spots;
}

// Mock criado manualmente: 5 colunas x 3 linhas = 15 setores
// Cada setor terá o máximo de spots possível preenchendo uma grade com passo 2 (dois pontos vazios entre spots)
export const setoresMock: Sector[] = [
  // Layout with a central corridor: patio width 250, height 150
  // We'll create sectors left and right of a central corridor (x between 110..140 is corridor)

  // Left large sector (covers x: 40..110, y: 0..150) — shifted right to avoid overlapping LEFT-* pockets
  {
    id: "LARGE-LEFT",
    yardId: "02987fa3-9cd6-11f0-95ac-4ad47e1b9edc",
    sectorTypeId: "left-large",
    pointsOfInterest: [
      { pointOrder: 1, x: 40, y: 0 },
      { pointOrder: 2, x: 110, y: 0 },
      { pointOrder: 3, x: 110, y: 150 },
      { pointOrder: 4, x: 40, y: 150 },
    ],
    // Fill maximum spots inside sector using step=2
    spots: generateGridSpots(
      [
        { pointOrder: 1, x: 40, y: 0 },
        { pointOrder: 2, x: 110, y: 0 },
        { pointOrder: 3, x: 110, y: 150 },
        { pointOrder: 4, x: 40, y: 150 },
      ],
      'L',
      2,
      8
    ).map((s, i, arr) => {
      // preserve some occupied examples (first few) similar to original file
      if (i === 4) return { ...s, status: 'ocupado', motorcycleId: 9001 };
      if (i === 12) return { ...s, status: 'ocupado', motorcycleId: 9002 };
      return s;
    }),
  },

  // Right complex: two stacked medium sectors (top-right and bottom-right)
  {
    id: "MED-RIGHT-BOTTOM",
    yardId: "02987fa3-9cd6-11f0-95ac-4ad47e1b9edc",
    sectorTypeId: "right-medium",
    pointsOfInterest: [
      { pointOrder: 1, x: 140, y: 0 },
      { pointOrder: 2, x: 250, y: 0 },
      { pointOrder: 3, x: 250, y: 75 },
      { pointOrder: 4, x: 140, y: 75 },
    ],
    spots: generateGridSpots(
      [
        { pointOrder: 1, x: 140, y: 0 },
        { pointOrder: 2, x: 250, y: 0 },
        { pointOrder: 3, x: 250, y: 75 },
        { pointOrder: 4, x: 140, y: 75 },
      ],
      'RB',
      2,
      10
    ).map((s, i) => (i === 2 ? { ...s, status: 'ocupado', motorcycleId: 9101 } : s)),
  },

  {
    id: "MED-RIGHT-TOP",
    yardId: "02987fa3-9cd6-11f0-95ac-4ad47e1b9edc",
    sectorTypeId: "right-medium",
    pointsOfInterest: [
      { pointOrder: 1, x: 140, y: 75 },
      { pointOrder: 2, x: 250, y: 75 },
      { pointOrder: 3, x: 250, y: 150 },
      { pointOrder: 4, x: 140, y: 150 },
    ],
    spots: generateGridSpots(
      [
        { pointOrder: 1, x: 140, y: 75 },
        { pointOrder: 2, x: 250, y: 75 },
        { pointOrder: 3, x: 250, y: 150 },
        { pointOrder: 4, x: 140, y: 150 },
      ],
      'RT',
      2,
      10
    ).map((s, i) => (i === 5 ? { ...s, status: 'ocupado', motorcycleId: 9201 } : s)),
  },

  // Small pockets near left top and left bottom to create size variety
  {
    id: "LEFT-TOP-POCKET",
    yardId: "02987fa3-9cd6-11f0-95ac-4ad47e1b9edc",
    sectorTypeId: "left-small",
    pointsOfInterest: [
      { pointOrder: 1, x: 0, y: 100 },
      { pointOrder: 2, x: 40, y: 100 },
      { pointOrder: 3, x: 40, y: 150 },
      { pointOrder: 4, x: 0, y: 150 },
    ],
    spots: generateGridSpots(
      [
        { pointOrder: 1, x: 0, y: 100 },
        { pointOrder: 2, x: 40, y: 100 },
        { pointOrder: 3, x: 40, y: 150 },
        { pointOrder: 4, x: 0, y: 150 },
      ],
      'LTP',
      2,
      4
    ).map((s, i) => (i === 1 ? { ...s, status: 'ocupado', motorcycleId: 9301 } : s)),
  },

  {
    id: "LEFT-BTM-POCKET",
    yardId: "02987fa3-9cd6-11f0-95ac-4ad47e1b9edc",
    sectorTypeId: "left-small",
    pointsOfInterest: [
      { pointOrder: 1, x: 0, y: 0 },
      { pointOrder: 2, x: 40, y: 0 },
      { pointOrder: 3, x: 40, y: 50 },
      { pointOrder: 4, x: 0, y: 50 },
    ],
    spots: generateGridSpots(
      [
        { pointOrder: 1, x: 0, y: 0 },
        { pointOrder: 2, x: 40, y: 0 },
        { pointOrder: 3, x: 40, y: 50 },
        { pointOrder: 4, x: 0, y: 50 },
      ],
      'LBP',
      2,
      4
    ).map((s, i) => (i === 2 ? { ...s, status: 'ocupado', motorcycleId: 9401 } : s)),
  },

 
];

