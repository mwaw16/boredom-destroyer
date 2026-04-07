import { createContext } from 'react';
import type { ActivitiesContextType } from '../../types/reducerTypes';

export const ActivityContext = createContext<ActivitiesContextType | null>(null);