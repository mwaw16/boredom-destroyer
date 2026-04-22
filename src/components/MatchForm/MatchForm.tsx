import { useActivityContext } from '../../hooks/useActivityContext';

import styles from './MatchForm.module.scss';

export default function MatchForm() {

    const { formState, setTime, setInvolvementLevel, setType, setIsListVisible } = useActivityContext();
    const { time, involvementLevel, type } = formState || {};

    const factorsCount = Object.keys(formState).length;

    const step = (): number => {
        if (!time) return 0;
        else if (!involvementLevel) return 1;
        else if (!type) return 2;
        else return 3;
    };

    const isFormFilled = () => step() === factorsCount;

    const handleSetListVisible = () => {
        if (setIsListVisible) {
            setIsListVisible(true);
        }
    }

    return (
        <div className={styles['brd-match-questionnaire__wrapper']}>
            <div className={styles['brd-match-questionnaire__summary']}>
                <span className={isFormFilled() ? styles['completed'] : ''}>{`${step()} / ${factorsCount}`}</span>
                <button className={isFormFilled() ? styles['completed'] : ''} onClick={handleSetListVisible}>LOSUJ!</button>
            </div>

            <form className={styles['brd-match-questionnaire__content']}>
                {!time && <section className={styles['brd-match-questionnaire__section']}>
                    <h2 className={styles['brd-match-questionnaire__section-title']}>Jak dużo masz czasu?</h2>
                    <fieldset className={styles['brd-match-questionnaire__section-options']}>
                        <div className={styles['brd-match-questionnaire__section-option']}>
                            <div className={styles['brd-match-questionnaire__section-option-wrapper']}>
                                <input type="radio" id="time1" name="time" value={1} checked={time === 1} onChange={() => setTime(1)} />
                                <label htmlFor="time1">Kilkanaście minut</label>
                            </div>

                            <div className={styles['brd-match-questionnaire__section-option-wrapper']}>
                                <input type="radio" id="time2" name="time" value={2} checked={time === 2} onChange={() => setTime(2)} />
                                <label htmlFor="time2">Około godzinę</label>
                            </div>

                            <div className={styles['brd-match-questionnaire__section-option-wrapper']}>
                                <input type="radio" id="time3" name="time" value={3} checked={time === 3} onChange={() => setTime(3)} />
                                <label htmlFor="time3">Więcej niż godzinę</label>
                            </div>
                        </div>
                    </fieldset>
                </section>}

                {!involvementLevel && time &&<section className={styles['brd-match-questionnaire__section']}>
                    <h2 className={styles['brd-match-questionnaire__section-title']}>Ile masz energii?</h2>
                    <fieldset className={styles['brd-match-questionnaire__section-options']}>
                        <div className={styles['brd-match-questionnaire__section-option']}>
                            <div className={styles['brd-match-questionnaire__section-option-wrapper']}>
                                <input type="radio" id="energy1" name="energy" value={1} checked={involvementLevel === 1} onChange={() => setInvolvementLevel(1)} />
                                <label htmlFor="energy1">Ledwo daję radę</label>
                            </div>

                            <div className={styles['brd-match-questionnaire__section-option-wrapper']}>
                                <input type="radio" id="energy2" name="energy" value={2} checked={involvementLevel === 2} onChange={() => setInvolvementLevel(2)} />
                                <label htmlFor="energy2">Trochę mi się chce</label>
                            </div>

                            <div className={styles['brd-match-questionnaire__section-option-wrapper']}>
                                <input type="radio" id="energy3" name="energy" value={3} checked={involvementLevel === 3} onChange={() => setInvolvementLevel(3)} />
                                <label htmlFor="energy3">Mam dużo energii</label>
                            </div>
                        </div>
                    </fieldset>
                </section>}

                {!type && time && involvementLevel &&<section className={styles['brd-match-questionnaire__section']}>
                    <h2 className={styles['brd-match-questionnaire__section-title']}>Jak wolisz działać?</h2>
                    <fieldset className={styles['brd-match-questionnaire__section-options']}>
                        <div className={styles['brd-match-questionnaire__section-option']}>
                            <div className={styles['brd-match-questionnaire__section-option-wrapper']}>
                                <input type="radio" id="type1" name="type" value="mental" checked={type === 'mental'} onChange={() => setType('mental')} />
                                <label htmlFor="type1">Umysłowo</label>
                            </div>

                            <div className={styles['brd-match-questionnaire__section-option-wrapper']}>
                                <input type="radio" id="type2" name="type" value="physical" checked={type === 'physical'} onChange={() => setType('physical')} />
                                <label htmlFor="type2">Fizycznie</label>
                            </div>
                        </div>
                    </fieldset>
                </section>}
            </form>
        </div>
    )
}
