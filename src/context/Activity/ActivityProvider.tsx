import { useState, useEffect, useReducer } from 'react';
import type { ReactNode } from 'react';
import { ActivityContext } from './ActivityContext';
import type { Activity } from '../../types/activityJson';
import type { ActivityState, ActivityAction, FormState, FormAction } from '../../types/reducerTypes';

const activityReducer = (state: ActivityState, action: ActivityAction): ActivityState => {
    switch (action.type) {
        case 'SET_ACTIVITIES':
            return { ...state, activities: action.payload };
        case 'SET_FORM_VISIBLE':
            return { ...state, isFormVisible: action.payload };
        case 'SET_LIST_VISIBLE':
            return { ...state, isListVisible: action.payload };
        default:
            return state;
    }
}

const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case 'SET_TIME':
            return { ...state, time: action.payload };
        case 'SET_INVOLVEMENT_LEVEL':
            return { ...state, involvementLevel: action.payload };
        case 'SET_TYPE':
            return { ...state, type: action.payload };
        case 'RESET_FORM':
            return { time: null, involvementLevel: null, type: null };
        default:
            return state;
    }
}

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
    //states
    const [isPending, setIsPending] = useState<boolean>(false);

    //reducers
    const [state, dispatch] = useReducer(activityReducer, {
            activities: [],
            isFormVisible: false,
            isListVisible: false,
    });

    const [formState, formDispatch] = useReducer(formReducer, {
        time: null,
        involvementLevel: null,
        type: null,
    });


    const activitiesWithRank = () => {
        const config = {
            max: 100,
            time: {
                standard: formState.time,
                possibilities: 3
            },
            involvement: {
                standard: formState.involvementLevel,
                possibilities: 3
            },
            type: {
                standard: formState.type === 'mental' ? 1 : formState.type === 'physical' ? 2 : null,
                possibilities: 2
            }
        };

        return state.activities.map((activity: Activity) => {
            const standarizedTime = () => {
                if (activity.estimatedDuration === 'N/A') return 3;
                else if (activity.estimatedDuration <= 30) return 1;
                else if (activity.estimatedDuration <= 75) return 2;
                else return 3;
            };

            const standarizedType = activity.type === 'mental' ? 1 : 2;

            const timeRank = config.time.standard
                ? config.max - (Math.abs(standarizedTime() - config.time.standard) * (config.max / config.time.possibilities))
                : 0;

            const involvementRank = config.involvement.standard
                ? config.max - (Math.abs(activity.involvementLevel - config.involvement.standard) * (config.max / config.involvement.possibilities))
                : 0;

            const typeRank = config.type.standard
                ? config.max - (Math.abs(standarizedType - config.type.standard) * (config.max / config.type.possibilities))
                : 0;

            const stepsFilled = (timeRank ? 1 : 0) + (involvementRank ? 1 : 0) + (typeRank ? 1 : 0);

            return {
                ...activity,
                ranks: {
                    timeRank,
                    involvementRank,
                    typeRank,
                    overallRank: (timeRank + involvementRank + typeRank) / stepsFilled,
                }
            }
        });
    }

    const rankedActivities = activitiesWithRank();

    //dispatch functions
    const setActivities = (activities: Activity[] | ((prev: Activity[]) => Activity[])) => {
        const next = typeof activities === 'function' ? activities(state.activities) : activities;
        dispatch({ type: 'SET_ACTIVITIES', payload: next });
    }

    const setIsFormVisible = (isVisible: boolean) => {
        dispatch({ type: 'SET_FORM_VISIBLE', payload: isVisible });
    }

    //pomyśleć o przeksztaceniu poniszej funkcji dispatch w computed value, która będzie obserwować zmiany w formState i na tej podstawie ustawiać widoczność listy

    const setIsListVisible = (isVisible: boolean) => {
        dispatch({ type: 'SET_LIST_VISIBLE', payload: isVisible });
    }

    const setTime = (time: number) => {
        formDispatch({ type: 'SET_TIME', payload: time });
    }

    const setInvolvementLevel = (level: 1 | 2 | 3) => {
        formDispatch({ type: 'SET_INVOLVEMENT_LEVEL', payload: level });
    }

    const setType = (type: 'mental' | 'physical') => {
        formDispatch({ type: 'SET_TYPE', payload: type });
    }

    const setResetForm = () => {
        formDispatch({ type: 'RESET_FORM' });
    };

    const [newActivity, setNewActivity] = useState<Activity | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setIsPending(true);

            try {
                const response = await fetch('http://localhost:3000/activities', {
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();
                setActivities(json);

            } catch (err) {
                const error = err as Error;

                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Error fetching data:', error.message);
                }
                return null;
            } finally {
                setIsPending(false);
            }
        }

        // Pobierz listę przy montowaniu
        fetchData();

        return () => {
            controller.abort();
        }
    }, []);

    useEffect(() => {
    if (!newActivity) return;

    const controller = new AbortController();

    const postData = async () => {
        setIsPending(true);
        try {
            const response = await fetch('http://localhost:3000/activities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newActivity),
                signal: controller.signal
            });

            if (!response.ok) throw new Error(`Response status: ${response.status}`);
            const json = await response.json();
            setActivities(prev => [...prev, json]);
        } catch (err) {
            if ((err as any).name !== 'AbortError') console.error(err);
        } finally {
            setIsPending(false);
            console.log('post sent');
        }
    };

    postData();

    return () => controller.abort();
}, [newActivity]);


    // Funkcja do wysyłania POST (można ją wystawić w kontekście, jeśli trzeba)
    // const postActivity = async (payload: Partial<Activity>) => {
    //     // nowy controller na pojedyncze zapytanie
    //     const controller = new AbortController();
    //     setIsPending(true);

    //     try {
    //         const response = await fetch('http://localhost:3000/activities', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(payload),
    //             signal: controller.signal
    //         });

    //         if (!response.ok) {
    //             throw new Error(`Response status: ${response.status}`);
    //         }

    //         const json = await response.json();

    //         if (Array.isArray(json)) {
    //             setActivities(json);
    //         } else {
    //             setActivities([...state.activities, json]);
    //         }

    //         return json;
    //     } catch (err) {
    //         const error = err as Error;
    //         if (error.name === 'AbortError') {
    //             console.log('POST aborted');
    //         } else {
    //             console.error('Error posting data:', error.message);
    //         }
    //         return null;
    //     } finally {
    //         setIsPending(false);
    //     }
    // };

    return (
        <ActivityContext.Provider value={{
                activities: state.activities,
                setActivities,
                isFormVisible: state.isFormVisible,
                setIsFormVisible,
                formState,
                setTime,
                setInvolvementLevel,
                setType,
                setResetForm,
                rankedActivities,
                isListVisible: state.isListVisible,
                setIsListVisible,
                setNewActivity }}>
            {children}
        </ActivityContext.Provider>
    )
}