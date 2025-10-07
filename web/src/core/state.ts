export type PuzzleRef = { id: string; data: string };
export const state: {
  startedAt: number | null;
  durationSec: number;
  puzzles: PuzzleRef[];
  solved: Record<string, boolean>;
  hintsUsed: Record<string, number>;
  finalCode: string;
} = {
  startedAt: null,
  durationSec: 45 * 60,
  puzzles: [],
  solved: {},
  hintsUsed: {},
  finalCode: "0000"
};
