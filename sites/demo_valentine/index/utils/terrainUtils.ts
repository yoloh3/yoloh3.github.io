import { TerrainPoint } from "../types";

// Parameters for the terrain generation
const AMPLITUDE_1 = 60;
const FREQUENCY_1 = 0.002;
const AMPLITUDE_2 = 30;
const FREQUENCY_2 = 0.005;
const BASE_HEIGHT = 550; // Y position from top (increased further to lower terrain and prevent photo cropping)

/**
 * Calculates Y position and slope angle for a given X on the road.
 * y = Base + A1*sin(F1*x) + A2*sin(F2*x)
 */
export const getTerrainPoint = (x: number): TerrainPoint => {
  // Height calculation
  const y = BASE_HEIGHT +
    AMPLITUDE_1 * Math.sin(x * FREQUENCY_1) +
    AMPLITUDE_2 * Math.sin(x * FREQUENCY_2);

  // Derivative for slope (dy/dx)
  // y' = A1*F1*cos(F1*x) + A2*F2*cos(F2*x)
  const dy = AMPLITUDE_1 * FREQUENCY_1 * Math.cos(x * FREQUENCY_1) +
    AMPLITUDE_2 * FREQUENCY_2 * Math.cos(x * FREQUENCY_2);

  // Angle in degrees
  const angle = Math.atan(dy) * (180 / Math.PI);

  return { x, y, angle };
};

/**
 * Generates the SVG path definition for the grassy hill.
 */
export const generateTerrainPath = (width: number, height: number): string => {
  let path = `M 0 ${height} `; // Start bottom left

  // Trace the bottom edge
  path += `L 0 ${getTerrainPoint(0).y} `;

  // Trace the curve
  const resolution = 20; // Points per step
  for (let x = 0; x <= width; x += resolution) {
    const p = getTerrainPoint(x);
    path += `L ${p.x} ${p.y} `;
  }

  // Close the shape
  path += `L ${width} ${getTerrainPoint(width).y} `;
  path += `L ${width} ${height} `;
  path += `Z`;

  return path;
};
