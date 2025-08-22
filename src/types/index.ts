export type TopicStatus = 'not-started' | 'in-progress' | 'completed' | 'deferred';
export type Priority = 'low' | 'medium' | 'high';

export interface BoardTopic {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  status: TopicStatus;
  priority: Priority;
  estimatedMinutes: number;
  order: number;
}

export interface DashboardData {
  nonprofitType: string;
  nonprofitName: string;
  topics: BoardTopic[];
}