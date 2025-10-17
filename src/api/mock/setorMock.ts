import { Sector } from "../interfaces/isetoresApi";

// Mock criado manualmente: 5 colunas x 3 linhas = 15 setores
// Cada setor tem uma grade de 3 cols x 5 rows = 15 vagas (máximo razoável por setor)
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
    // We'll place a grid of spots inside this big sector (6 cols x 5 rows = 30 spots)
    spots: (() => {
      const spots = [] as any[];
      const cols = 6;
      const rows = 5;
      const padding = 8;
      const baseX = 40; // offset because sector starts at x=40 now
      const sectorW = 110 - padding * 2; // inner width (relative)
      const sectorH = 150 - padding * 2; // inner height
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = Math.round(baseX + padding + (c + 0.5) * (sectorW / cols));
          const y = Math.round(padding + (r + 0.5) * (sectorH / rows));
          spots.push({ spotId: `L-P${r * cols + c + 1}`, x, y, status: 'livre' });
        }
      }
      // mark a few occupied for demo
      spots[4].status = 'ocupado';
      spots[4].motorcycleId = 9001;
      spots[12].status = 'ocupado';
      spots[12].motorcycleId = 9002;
      return spots;
    })(),
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
    // medium sector: 4 cols x 3 rows = 12 spots
    spots: (() => {
      const spots = [] as any[];
      const cols = 4;
      const rows = 3;
      const padding = 10;
      const sectorW = 110 - padding * 2; // 140..250 => width 110
      const sectorH = 75 - padding * 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = Math.round(140 + padding + (c + 0.5) * (sectorW / cols));
          const y = Math.round(padding + (r + 0.5) * (sectorH / rows));
          spots.push({ spotId: `RB-P${r * cols + c + 1}`, x, y, status: 'livre' });
        }
      }
      spots[2].status = 'ocupado';
      spots[2].motorcycleId = 9101;
      return spots;
    })(),
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
    // medium sector: 4 cols x 4 rows = 16 spots
    spots: (() => {
      const spots = [] as any[];
      const cols = 4;
      const rows = 4;
      const padding = 10;
      const sectorW = 110 - padding * 2;
      const sectorH = 75 - padding * 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = Math.round(140 + padding + (c + 0.5) * (sectorW / cols));
          const y = Math.round(75 + padding + (r + 0.5) * (sectorH / rows));
          spots.push({ spotId: `RT-P${r * cols + c + 1}`, x, y, status: 'livre' });
        }
      }
      spots[5].status = 'ocupado';
      spots[5].motorcycleId = 9201;
      return spots;
    })(),
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
    spots: [
      { spotId: 'LTP-1', x: 10, y: 110, status: 'livre' },
      { spotId: 'LTP-2', x: 30, y: 110, status: 'ocupado', motorcycleId: 9301 },
      { spotId: 'LTP-3', x: 10, y: 130, status: 'livre' },
      { spotId: 'LTP-4', x: 30, y: 130, status: 'livre' },
    ],
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
    spots: [
      { spotId: 'LBP-1', x: 10, y: 10, status: 'livre' },
      { spotId: 'LBP-2', x: 30, y: 10, status: 'livre' },
      { spotId: 'LBP-3', x: 10, y: 30, status: 'ocupado', motorcycleId: 9401 },
    ],
  },

  // Corridor area intentionally left without sectors: x in [110,140)
];

