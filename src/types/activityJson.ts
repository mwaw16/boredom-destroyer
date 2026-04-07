export interface Activity {
    id?: string,
    title: string,
    description: string,
    estimatedDuration: number | 'N/A',
    involvementLevel: 1 | 2 | 3,
    type: 'mental' | 'physical',
    status: 'to do' | 'in progress' | 'completed'
}

export interface RankedActivity extends Activity {
    ranks: {
        timeRank: number;
        involvementRank: number;
        typeRank: number;
        overallRank: number;
    }
}