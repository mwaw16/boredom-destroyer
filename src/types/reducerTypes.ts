import type { Activity, RankedActivity } from './activityJson';

export type ActivityState = {
    activities: Activity[];
    isFormVisible: boolean;
    isListVisible: boolean;
};

export type ActivityAction =
    { type: 'SET_ACTIVITIES'; payload: Activity[] }
    | { type: 'SET_FORM_VISIBLE'; payload: boolean }
    | { type: 'SET_LIST_VISIBLE'; payload: boolean };

export interface ActivitiesContextType {
    activities: Activity[],
    isFormVisible: boolean,
    setActivities: (activities: Activity[]) => void,
    setIsFormVisible: (isVisible: boolean) => void,
    formState: {
        time: number | null,
        involvementLevel: 1 | 2 | 3 | null,
        type: 'mental' | 'physical' | null,
    },
    setTime: (time: number) => void,
    setInvolvementLevel: (level: 1 | 2 | 3) => void,
    setType: (type: 'mental' | 'physical') => void,
    setResetForm: () => void,
    rankedActivities: (RankedActivity[]) | undefined,
    isListVisible: boolean,
    setIsListVisible: (isVisible: boolean) => void,
    setNewActivity: (activity: Activity) => void
}

export type FormState = {
    time: number | null;
    involvementLevel: 1 | 2 | 3 | null;
    type: 'mental' | 'physical' | null;
};

export type FormAction =
    | { type: 'SET_TIME'; payload: number }
    | { type: 'SET_INVOLVEMENT_LEVEL'; payload: 1 | 2 | 3 }
    | { type: 'SET_TYPE'; payload: 'mental' | 'physical' }
    | { type: 'RESET_FORM' };