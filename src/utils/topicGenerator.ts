import { BoardTopic, Priority } from '../types';

function generateDescription(title: string, nonprofitType: string): { description: string; detailedDescription: string; estimatedMinutes: number; priority: Priority } {
  const descriptions: { [key: string]: { description: string; detailedDescription: string; estimatedMinutes: number; priority: Priority } } = {
    '$10 Million Fundraising Campaign': {
      description: 'Strategic planning for major capital campaign to secure $10M in funding for expanded operations and facility improvements.',
      detailedDescription: 'This comprehensive fundraising initiative aims to secure $10 million over the next 24 months through a combination of major gifts, corporate sponsorships, foundation grants, and community donations. The campaign will fund critical infrastructure improvements, program expansion, and establish an endowment fund for long-term sustainability. Key milestones include identifying lead donors, launching public phase, and implementing multi-channel engagement strategies.',
      estimatedMinutes: 45,
      priority: 'high'
    },
    'Potato Chip Bag of Cash Given by Eric Adams': {
      description: 'Review and discuss unexpected donation received from Mayor Eric Adams, ensuring proper documentation and allocation.',
      detailedDescription: 'An unusual but welcomed contribution has been received from Mayor Eric Adams office. This agenda item covers the proper acknowledgment, documentation for tax purposes, and strategic allocation of these funds. Discussion will include compliance requirements, public recognition considerations, and how to best leverage this donation for maximum community impact while maintaining transparency and accountability.',
      estimatedMinutes: 20,
      priority: 'medium'
    },
    'Planning Friendly Gala (with a "goat" check)': {
      description: 'Coordinate annual fundraising gala featuring special "goat check" presentation ceremony for major donors.',
      detailedDescription: 'Our signature annual gala planning is underway, featuring the unique "goat check" tradition where major donors receive ceremonial oversized checks with goat-themed designs. This event combines fundraising with community celebration, expecting 200+ attendees. Planning includes venue selection, catering arrangements, entertainment lineup, sponsor recognition, and coordination of the special goat-themed activities that make our gala memorable and aligned with our mission.',
      estimatedMinutes: 30,
      priority: 'high'
    }
  };

  const defaultConfig = {
    description: `Strategic discussion and planning for ${title.toLowerCase()}`,
    detailedDescription: `This agenda item focuses on comprehensive planning and decision-making regarding ${title}. The board will review current status, discuss strategic implications, and determine next steps for successful implementation.`,
    estimatedMinutes: 25,
    priority: 'medium' as Priority
  };

  return descriptions[title] || defaultConfig;
}

export function generateTopics(topics: string[], nonprofitType: string): BoardTopic[] {
  return topics.map((title, index) => {
    const config = generateDescription(title, nonprofitType);
    return {
      id: `topic-${Date.now()}-${index}`,
      title,
      description: config.description,
      detailedDescription: config.detailedDescription,
      status: 'not-started',
      priority: config.priority,
      estimatedMinutes: config.estimatedMinutes,
      order: index
    };
  });
}