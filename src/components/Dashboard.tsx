import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { BoardTopic, TopicStatus } from '../types';
import TopicCard from './TopicCard';
import { generateBranding, generateLogoSVG, BrandingConfig } from '../utils/brandingSystem';
import { generateTopics } from '../utils/topicGenerator';
import { FileDown, RefreshCw } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Dashboard: React.FC = () => {
  const nonprofitType = 'Animal Welfare';
  const nonprofitName = 'Goats of Anarchy';
  const topicTitles = [
    '$10 Million Fundraising Campaign',
    'Potato Chip Bag of Cash Given by Eric Adams',
    'Planning Friendly Gala (with a "goat" check)'
  ];

  const [topics, setTopics] = useState<BoardTopic[]>([]);
  const [branding, setBranding] = useState<BrandingConfig | null>(null);
  const [logoSvg, setLogoSvg] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const generatedBranding = generateBranding(nonprofitType, nonprofitName);
    setBranding(generatedBranding);
    setLogoSvg(generateLogoSVG(nonprofitName, nonprofitType, generatedBranding));
    setTopics(generateTopics(topicTitles, nonprofitType));

    document.documentElement.style.setProperty('--primary-color', generatedBranding.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', generatedBranding.secondaryColor);
    document.documentElement.style.setProperty('--accent-color', generatedBranding.accentColor);
    document.documentElement.style.setProperty('--bg-color', generatedBranding.backgroundColor);
    document.documentElement.style.setProperty('--text-color', generatedBranding.textColor);
    document.body.style.fontFamily = generatedBranding.fontFamily;
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTopics((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex).map((item, index) => ({
          ...item,
          order: index,
        }));
      });
    }
  };

  const handleStatusChange = (id: string, status: TopicStatus) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === id ? { ...topic, status } : topic
      )
    );
  };

  const handleTimeChange = (id: string, minutes: number) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === id ? { ...topic, estimatedMinutes: minutes } : topic
      )
    );
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const dashboard = document.getElementById('dashboard-content');
      if (!dashboard) return;

      const canvas = await html2canvas(dashboard, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: branding?.backgroundColor || '#FFFFFF',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`${nonprofitName.replace(/\s+/g, '-')}-Board-Meeting-Dashboard.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const resetDashboard = () => {
    setTopics(generateTopics(topicTitles, nonprofitType));
  };

  if (!branding) return <div>Loading...</div>;

  const totalTime = topics.reduce((sum, topic) => sum + topic.estimatedMinutes, 0);
  const completedCount = topics.filter(t => t.status === 'completed').length;
  const inProgressCount = topics.filter(t => t.status === 'in-progress').length;

  return (
    <div className="dashboard" style={{ backgroundColor: branding.backgroundColor }}>
      <div id="dashboard-content">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="logo-section">
              <div dangerouslySetInnerHTML={{ __html: logoSvg }} />
              <div className="org-info">
                <h1 style={{ color: branding.primaryColor }}>{nonprofitName}</h1>
                <p className="org-type" style={{ color: branding.textColor }}>{nonprofitType}</p>
              </div>
            </div>
            <div className="header-actions">
              <button
                className="action-btn"
                onClick={resetDashboard}
                style={{ 
                  backgroundColor: branding.secondaryColor,
                  color: 'white'
                }}
              >
                <RefreshCw size={18} />
                Reset
              </button>
              <button
                className="action-btn export-btn"
                onClick={exportToPDF}
                disabled={isExporting}
                style={{ 
                  backgroundColor: branding.primaryColor,
                  color: 'white'
                }}
              >
                <FileDown size={18} />
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </button>
            </div>
          </div>
        </header>

        <div className="dashboard-stats">
          <div className="stat-card" style={{ borderColor: branding.primaryColor }}>
            <span className="stat-label">Total Topics</span>
            <span className="stat-value" style={{ color: branding.primaryColor }}>{topics.length}</span>
          </div>
          <div className="stat-card" style={{ borderColor: branding.secondaryColor }}>
            <span className="stat-label">In Progress</span>
            <span className="stat-value" style={{ color: branding.secondaryColor }}>{inProgressCount}</span>
          </div>
          <div className="stat-card" style={{ borderColor: '#22C55E' }}>
            <span className="stat-label">Completed</span>
            <span className="stat-value" style={{ color: '#22C55E' }}>{completedCount}</span>
          </div>
          <div className="stat-card" style={{ borderColor: branding.accentColor }}>
            <span className="stat-label">Total Time</span>
            <span className="stat-value" style={{ color: branding.accentColor }}>{totalTime} min</span>
          </div>
        </div>

        <main className="dashboard-main">
          <h2 style={{ color: branding.primaryColor }}>Board Meeting Agenda</h2>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={topics.map(t => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="topics-grid">
                {topics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    branding={branding}
                    onStatusChange={handleStatusChange}
                    onTimeChange={handleTimeChange}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </main>

        <footer className="dashboard-footer" style={{ color: branding.textColor }}>
          <p>© {new Date().getFullYear()} {nonprofitName} - Board Meeting Dashboard</p>
          <p className="meeting-date">Meeting Date: {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;