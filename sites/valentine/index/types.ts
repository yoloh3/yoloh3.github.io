export interface Milestone {
  id: number;
  date: string;
  title: string;
  emoji: string;
  content: string;
  contentAfterVideo?: string; // Content to show after video ends
  image?: string; // Path to real photo
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
