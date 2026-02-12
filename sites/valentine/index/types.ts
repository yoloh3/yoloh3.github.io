export interface Milestone {
  id: number;
  date: string;
  title: string;
  emoji: string;
  content: string;
  positionX: number; // Percentage 0-100 of the road
}

export interface TerrainPoint {
  x: number;
  y: number;
  angle: number;
}

export enum GameState {
  LOCKED = 'LOCKED',
  DRIVING = 'DRIVING',
}
