# Goats of Anarchy Board Meeting Dashboard

A modern, interactive dashboard for nonprofit board meetings featuring AI-generated branding, drag-and-drop topic management, and PDF export capabilities.

## Features

### Core Functionality
- **Instant Dashboard Display** - No login required, immediate access to meeting tools
- **Smart Branding System** - Automatically generates logos and color schemes based on nonprofit type
- **Interactive Topic Cards** - Manage board meeting agenda items with ease
- **Drag-and-Drop Reordering** - Prioritize topics by dragging cards to reorder
- **Status Tracking** - Track progress with four states: Not Started, In Progress, Completed, Deferred
- **Time Management** - Editable time estimates for each agenda item
- **PDF Export** - Generate professional meeting summaries for documentation

### Design Features
- **Responsive Design** - Optimized for desktop presentation and mobile viewing
- **Hover Details** - Expanded descriptions appear on hover for more context
- **Color-Coded Priorities** - Visual indicators for High, Medium, and Low priority items
- **Professional Aesthetic** - Warm, engaging nonprofit design that's board-ready

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/goats-of-anarchy-dashboard.git
cd goats-of-anarchy-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the dashboard

## Configuration

The dashboard comes pre-configured with:
- **Organization**: Goats of Anarchy
- **Type**: Animal Welfare
- **Sample Topics**:
  - $10 Million Fundraising Campaign
  - Potato Chip Bag of Cash Given by Eric Adams
  - Planning Friendly Gala (with a "goat" check)

To customize for your organization, modify the values in `src/components/Dashboard.tsx`:

```typescript
const nonprofitType = 'Your Nonprofit Type';
const nonprofitName = 'Your Organization Name';
const topicTitles = [
  'Your First Topic',
  'Your Second Topic',
  'Your Third Topic'
];
```

## Supported Nonprofit Types

The branding system includes optimized templates for:
- Animal Welfare (warm oranges)
- Education (professional blues)
- Healthcare (calming blues/greens)
- Environment (natural greens)
- Food Bank (harvest colors)
- Default (modern purple/pink)

## Usage Guide

### Managing Topics

1. **View Details**: Hover over any topic card to see the detailed description
2. **Reorder Topics**: Click and drag the grip icon (⋮⋮) to reorder cards
3. **Update Status**: Click status buttons to track progress
4. **Edit Time**: Click on the time estimate to edit expected duration

### Exporting to PDF

1. Click the "Export PDF" button in the header
2. The system will capture the current dashboard state
3. A PDF file will be downloaded with the meeting summary

### Resetting the Dashboard

Click the "Reset" button to restore all topics to their original state and order.

## Technical Stack

- **React 19** - Modern React with TypeScript
- **@dnd-kit** - Accessible drag-and-drop functionality
- **jsPDF & html2canvas** - PDF generation
- **Lucide React** - Icon library
- **TypeScript** - Type-safe development

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx      # Main dashboard component
│   └── TopicCard.tsx      # Individual topic card component
├── utils/
│   ├── brandingSystem.ts  # Logo and color generation
│   └── topicGenerator.ts  # Topic description generator
├── types/
│   └── index.ts          # TypeScript type definitions
├── App.tsx               # Root application component
└── App.css              # Global styles
```

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Creates an optimized production build in the `build` folder

### `npm test`
Launches the test runner in interactive watch mode

## Deployment

### Netlify

1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify

### Vercel

1. Connect your GitHub repository
2. Vercel will automatically build and deploy

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/goats-of-anarchy-dashboard",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
3. Deploy: `npm run deploy`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your nonprofit organization.

## Acknowledgments

- Built for nonprofit organizations to enhance board meeting effectiveness
- Designed with accessibility and usability in mind
- Special thanks to all nonprofit boards making a difference in their communities

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Made with ❤️ for the nonprofit community
