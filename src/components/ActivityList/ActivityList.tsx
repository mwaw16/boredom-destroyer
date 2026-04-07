import { useContext, type JSX } from 'react';
import { ActivityContext } from '../../context/Activity/ActivityContext';
import type { Activity, RankedActivity } from '../../types/activityJson';

import styles from './ActivityList.module.scss';

export default function ActivityList({ activities, renderItem }: { activities: (Activity | RankedActivity)[] | undefined, renderItem: (activity: Activity | RankedActivity) => JSX.Element }) {
    // const context = useContext(ActivityContext);

    // if (context === undefined) {
    //     console.error('Activity Context is not available');
    // }

    // const { activities } = context || {};

    // const setStatusClass = (status: string) => {
    //     return status.replace(/\s+/g, '-');
    // }

    return (
        // <div className={styles['brd-activity-list']}>
        // <ul className={styles['brd-activity-list__content']}>
        //     {activities && activities.map(activity => (
        //         <li key={activity.id} className={styles['brd-activity-list__element']}>
        //             <h3 className={styles['brd-activity-list__element-title']}>{activity.title}</h3>
        //             <span className={`${styles['brd-activity-list__element-status']} ${styles[`brd-activity-list__element-status--${setStatusClass(activity.status)}`]}`}>{activity.status}</span>
        //             <p className={styles['brd-activity-list__element-description']}>{activity.description}</p>
        //             <div className={styles['brd-activity-list__element-details']}>
        //                 <span className={styles['brd-activity-list__element-duration']}>
        //                     <i className="icon-duration"></i>{activity.estimatedDuration}'
        //                 </span>
        //                 <i className={`icon-level-${activity.involvementLevel}`}></i>
        //                 <i className={activity.type === 'mental' ? 'icon-brain' : 'icon-strength'}></i>
        //             </div>
        //         </li>
        //     ))}
        // </ul>
        // </div>
        <div className={styles['brd-activity-list']}>
            <ul className={styles['brd-activity-list__content']}>
                {activities && activities.map(activity => (
                    <li key={activity.id} className={styles['brd-activity-list__element']}>
                        {renderItem(activity)}
                    </li>
                ))}
            </ul>
        </div>
    )
}
