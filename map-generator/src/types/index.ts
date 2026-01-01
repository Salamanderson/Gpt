import type { LayerType } from '../data/symbols';

export interface Cell {
  background: string;  // Background layer emoji
  entity: string | null;  // Entity layer emoji (null if empty)
}

export interface GridState {
  width: number;
  height: number;
  cells: Cell[][];
}

export interface ExportData {
  map: string;
  legend: string;
  locationTemplate: string;
}

export type ActiveLayer = LayerType;

export interface EditorState {
  grid: GridState;
  selectedEmoji: string | null;
  activeLayer: ActiveLayer;
  isPainting: boolean;
}
