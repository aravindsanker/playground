'use client';

import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import { Shoe } from '@/types/shoe';

const STORAGE_KEY = 'madras-drip-moodboard';

interface MoodboardState {
  liked: Shoe[];
}

type Action =
  | { type: 'TOGGLE'; shoe: Shoe }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; shoes: Shoe[] };

function reducer(state: MoodboardState, action: Action): MoodboardState {
  switch (action.type) {
    case 'HYDRATE':
      return { liked: action.shoes };
    case 'TOGGLE': {
      const exists = state.liked.some((s) => s.id === action.shoe.id);
      return {
        liked: exists
          ? state.liked.filter((s) => s.id !== action.shoe.id)
          : [...state.liked, action.shoe],
      };
    }
    case 'REMOVE':
      return { liked: state.liked.filter((s) => s.id !== action.id) };
    case 'CLEAR':
      return { liked: [] };
    default:
      return state;
  }
}

interface MoodboardContextValue {
  liked: Shoe[];
  isLiked: (id: string) => boolean;
  toggle: (shoe: Shoe) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const MoodboardContext = createContext<MoodboardContextValue | null>(null);

export function MoodboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { liked: [] });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        dispatch({ type: 'HYDRATE', shoes: JSON.parse(stored) });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.liked));
  }, [state.liked]);

  const value: MoodboardContextValue = {
    liked: state.liked,
    isLiked: (id) => state.liked.some((s) => s.id === id),
    toggle: (shoe) => dispatch({ type: 'TOGGLE', shoe }),
    remove: (id) => dispatch({ type: 'REMOVE', id }),
    clear: () => dispatch({ type: 'CLEAR' }),
  };

  return <MoodboardContext.Provider value={value}>{children}</MoodboardContext.Provider>;
}

export function useMoodboard() {
  const ctx = useContext(MoodboardContext);
  if (!ctx) throw new Error('useMoodboard must be used within MoodboardProvider');
  return ctx;
}
