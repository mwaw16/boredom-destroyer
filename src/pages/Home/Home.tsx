// import { useState } from 'react';
import { useContext } from 'react';
import { ActivityContext } from '../../context/Activity/ActivityContext';

import MatchButton from '../../components/MatchButton/MatchButton';
import MatchForm from '../../components/MatchForm/MatchForm';
import ActivityList from '../../components/ActivityList/ActivityList';
import ConfigurationChips from '../../components/ConfigurationChips/ConfigurationChips';

import type { RankedActivity } from '../../types/activityJson';

import styles from './Home.module.scss';

export default function Home() {

const context = useContext(ActivityContext);
const { isFormVisible, setIsFormVisible } = context || {};

const { rankedActivities, isListVisible } = context || {};

const setStatusClass = (status: string) => {
    return status.replace(/\s+/g, '-');
}

const handleButtonClick = () => {
    if (setIsFormVisible) {
        setIsFormVisible(true);
    }
}

const mappedRankedActivities = rankedActivities?.filter(act => act.status !== 'completed').sort((a, b) => b.ranks.overallRank - a.ranks.overallRank);

console.log(mappedRankedActivities, 'mapped');

    return (
        <>
            {!isFormVisible && <MatchButton formVisible={handleButtonClick}/>}
            <ConfigurationChips/>
            {isFormVisible && <MatchForm/>}
            {isListVisible && <ActivityList activities={mappedRankedActivities} renderItem={(activity) => {
                const ranked = activity as RankedActivity;

                return (
                <div className={styles['brd-activity-list__element-wrapper']}>
                    <span className={styles['brd-activity-list__element-score']}>{Number(ranked.ranks.overallRank.toFixed(2))}</span>
                    <h3 className={styles['brd-activity-list__element-title']}>{ranked.title}</h3>
                    <span className={`${styles['brd-activity-list__element-status']} ${styles[`brd-activity-list__element-status--${setStatusClass(ranked.status)}`]}`}>{ranked.status}</span>
                    <p className={styles['brd-activity-list__element-description']}>{ranked.description}</p>
                    <div className={styles['brd-activity-list__element-details']}>
                        <span className={styles['brd-activity-list__element-duration']}>
                            <i className="icon-duration"></i>{ranked.estimatedDuration}'
                        </span>
                        <i className={`icon-level-${ranked.involvementLevel}`}></i>
                        <i className={ranked.type === 'mental' ? 'icon-brain' : 'icon-strength'}></i>
                    </div>
                </div>
                )
            }}/>}
        </>
    )
}
