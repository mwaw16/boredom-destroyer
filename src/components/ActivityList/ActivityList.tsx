import type { Activity, RankedActivity } from '../../types/activityJson';

import styles from './ActivityList.module.scss';

export default function ActivityList({ activities, renderItem }: { activities: (Activity | RankedActivity)[] | undefined, renderItem: (activity: Activity | RankedActivity) => JSX.Element }) {
    return (
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
