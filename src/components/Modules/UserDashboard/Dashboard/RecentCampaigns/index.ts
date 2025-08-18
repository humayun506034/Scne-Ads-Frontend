import { ICampaign } from "./CampaignCard";


export const recentCampaignsData: ICampaign[] = [
    {
        id: '1',
        type: 'Fixed-Duration',
        status: 'Active',
        brand: 'Softvence',
        title: 'Third campaign',
        totalSpent: 1520.00,
        completion: 76,
        limit: 2320.00,

    },
    {
        id: '2',
        type: 'Fixed-Duration',
        status: 'Paused',
        brand: 'Softvence',
        title: 'First campaign',
        totalSpent: 200.00,
        completion: 50,
        limit: 1000.00,

    },
    {
        id: '3',
        type: 'Fixed-Duration',
        status: 'Completed',
        brand: 'Softvence',
        title: 'Second campaign',
        totalSpent: 20.00,
        completion: 10,
        limit: 500.00,

    }
]
