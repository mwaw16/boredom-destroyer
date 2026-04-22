import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useActivityContext } from '../../hooks/useActivityContext';

import type { Activity } from '../../types/activityJson';

import styles from './AddActivityForm.module.scss';

export default function AddActivityForm({ onClose, isOpen }: { onClose: () => void, isOpen: boolean }) {
    const nodeRef = useRef(null);

    const { setNewActivity } = useActivityContext();

    const defaultFormData: Activity = {
        title: '',
        description: '',
        estimatedDuration: 0,
        involvementLevel: 1,
        type: 'mental',
        status: 'to do'
    };

    const [formData, setFormData] = useState<Activity>(defaultFormData);

    const handleSubmitButton = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setNewActivity(formData);
        setFormData(defaultFormData);
        onClose();
    };

    const handleSetFormData = (field: keyof Activity, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
            classNames={{
                enter: styles['fade-enter'],
                enterActive: styles['fade-enter-active'],
                exit: styles['fade-exit'],
                exitActive: styles['fade-exit-active'],
            }}
            nodeRef={nodeRef}
            unmountOnExit
        >
            <div ref={nodeRef} className={styles['brd-add-activity-form__overlay']} onClick={onClose}>
                <div className={styles['brd-add-activity-form']} onClick={(e) => e.stopPropagation()}>
                    <button className={styles['brd-add-activity-form__close-button']} onClick={onClose}>X</button>
                    <h2 className={styles['brd-add-activity-form__title']}>Add New Activity</h2>
                    <form className={styles['brd-add-activity-form__form']} onSubmit={handleSubmitButton}>
                        <input type="text" className={styles['brd-add-activity-form__input']} placeholder='Tytuł' value={formData.title} onChange={(e) => handleSetFormData('title', e.target.value)} />

                        <textarea className={styles['brd-add-activity-form__textarea']} placeholder='Opis' value={formData.description} onChange={(e) => handleSetFormData('description', e.target.value)}></textarea>

                        <input type="number" className={styles['brd-add-activity-form__input']} placeholder='Szacowany czas (min)' value={formData.estimatedDuration} onChange={(e) => handleSetFormData('estimatedDuration', Number(e.target.value))} />

                        <fieldset className={styles['brd-add-activity-form__fieldset']}>
                            <legend>Poziom zaangażowania</legend>
                            <div className={styles['brd-add-activity-form__options']}>
                                <label className={styles['brd-add-activity-form__option']}>
                                    <input type="radio" name="involvementLevel" value={1} checked={formData.involvementLevel === 1} onChange={() => handleSetFormData('involvementLevel', 1)} />
                                    Niskie
                                </label>
                                <label className={styles['brd-add-activity-form__option']}>
                                    <input type="radio" name="involvementLevel" value={2} checked={formData.involvementLevel === 2} onChange={() => handleSetFormData('involvementLevel', 2)} />
                                    Średnie
                                </label>
                                <label className={styles['brd-add-activity-form__option']}>
                                    <input type="radio" name="involvementLevel" value={3} checked={formData.involvementLevel === 3} onChange={() => handleSetFormData('involvementLevel', 3)} />
                                    Wysokie
                                </label>
                            </div>
                        </fieldset>

                        <fieldset className={styles['brd-add-activity-form__fieldset']}>
                            <legend>Typ</legend>
                            <div className={styles['brd-add-activity-form__options']}>
                                <label className={styles['brd-add-activity-form__option']}>
                                    <input type="radio" name="type" value="mental" checked={formData.type === 'mental'} onChange={() => handleSetFormData('type', 'mental')} />
                                    Umysłowe
                                </label>
                                <label className={styles['brd-add-activity-form__option']}>
                                    <input type="radio" name="type" value="physical" checked={formData.type === 'physical'} onChange={() => handleSetFormData('type', 'physical')} />
                                    Fizyczne
                                </label>
                            </div>
                        </fieldset>
                        <button type="submit" className={styles['brd-add-activity-form__submit']}>Dodaj aktywność</button>
                    </form>
                </div>
            </div>
        </CSSTransition>
    )
}
