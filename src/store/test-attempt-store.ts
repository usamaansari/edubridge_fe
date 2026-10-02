import { create } from "zustand";

type AttemptState = {
  testId: string | null;
  currentIndex: number;
  answers: Record<string, string[]>;
  flagged: Record<string, boolean>;
  visited: Record<string, boolean>;
  startedAt: number | null;
  start: (testId: string) => void;
  goTo: (index: number) => void;
  answer: (questionId: string, value: string[]) => void;
  clear: (questionId: string) => void;
  toggleFlag: (questionId: string) => void;
  markVisited: (questionId: string) => void;
  reset: () => void;
};

const initial = {
  testId: null,
  currentIndex: 0,
  answers: {},
  flagged: {},
  visited: {},
  startedAt: null,
};

export const useTestAttemptStore = create<AttemptState>()((set, get) => ({
  ...initial,
  start: (testId) => {
    if (get().testId === testId) return;
    set({ ...initial, testId, startedAt: Date.now() });
  },
  goTo: (currentIndex) => set({ currentIndex }),
  answer: (questionId, value) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: value } })),
  clear: (questionId) =>
    set((state) => {
      const answers = { ...state.answers };
      delete answers[questionId];
      return { answers };
    }),
  toggleFlag: (questionId) =>
    set((state) => ({
      flagged: { ...state.flagged, [questionId]: !state.flagged[questionId] },
    })),
  markVisited: (questionId) =>
    set((state) =>
      state.visited[questionId]
        ? state
        : { visited: { ...state.visited, [questionId]: true } },
    ),
  reset: () => set(initial),
}));
