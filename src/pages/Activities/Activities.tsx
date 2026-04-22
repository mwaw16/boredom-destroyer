import ActivityList from '../../components/ActivityList/ActivityList';
import { useActivityContext } from '../../hooks/useActivityContext';

import styles from './Activities.module.scss';

export default function Activities() {
    const { activities } = useActivityContext();

    const setStatusClass = (status: string) => {
        return status.replace(/\s+/g, '-');
    }

    return (
        <ActivityList
            activities={activities}
            renderItem={(activity) => (
                <div className={styles['brd-activity-list__element-wrapper']}>
                    <h3 className={styles['brd-activity-list__element-title']}>{activity.title}</h3>
                    <span className={`${styles['brd-activity-list__element-status']} ${styles[`brd-activity-list__element-status--${setStatusClass(activity.status)}`]}`}>{activity.status}</span>
                    <p className={styles['brd-activity-list__element-description']}>{activity.description}</p>
                    <div className={styles['brd-activity-list__element-details']}>
                        <span className={styles['brd-activity-list__element-duration']}>
                            <i className="icon-duration"></i>{activity.estimatedDuration}'
                        </span>
                        <i className={`icon-level-${activity.involvementLevel}`}></i>
                        <i className={activity.type === 'mental' ? 'icon-brain' : 'icon-strength'}></i>
                    </div>
                </div>
            )}
        />
    )
}
