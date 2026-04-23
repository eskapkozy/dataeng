import { createContext, useContext, useReducer, type ReactNode } from 'react';

type State = { visible: boolean; x: number; y: number; deptKey: string; };
type Action =
  | { type: 'SHOW'; x: number; y: number; deptKey: string }
  | { type: 'HIDE' }
  | { type: 'MOVE'; x: number; y: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SHOW': return { visible: true, x: action.x, y: action.y, deptKey: action.deptKey };
    case 'HIDE': return { ...state, visible: false };
    case 'MOVE': return { ...state, x: action.x, y: action.y };
    default: return state;
  }
};

const TooltipContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);

export function TooltipProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { visible: false, x: 0, y: 0, deptKey: '' });
  return <TooltipContext.Provider value={{ state, dispatch }}>{children}</TooltipContext.Provider>;
}

export const useTooltip = () => {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error('useTooltip must be used inside TooltipProvider');
  return ctx;
};
