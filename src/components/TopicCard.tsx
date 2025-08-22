import React, { useState } from 'react';
import { BoardTopic, TopicStatus } from '../types';
import { Clock, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TopicCardProps {
  topic: BoardTopic;
  branding: any;
  onStatusChange: (id: string, status: TopicStatus) => void;
  onTimeChange: (id: string, minutes: number) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, branding, onStatusChange, onTimeChange }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTime, setTempTime] = useState(topic.estimatedMinutes.toString());

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: topic.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const statusColors = {
    'not-started': '#94A3B8',
    'in-progress': '#F59E0B',
    'completed': '#22C55E',
    'deferred': '#EF4444'
  };

  const priorityColors = {
    low: { bg: '#E0F2FE', border: '#0284C7' },
    medium: { bg: '#FEF3C7', border: '#F59E0B' },
    high: { bg: '#FEE2E2', border: '#DC2626' }
  };

  const handleTimeSubmit = () => {
    const minutes = parseInt(tempTime);
    if (!isNaN(minutes) && minutes > 0) {
      onTimeChange(topic.id, minutes);
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="topic-card"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className="card-header">
        <div className="drag-handle" {...attributes} {...listeners}>
          <GripVertical size={20} color={branding.textColor} />
        </div>
        <div className="priority-badge" style={{
          backgroundColor: priorityColors[topic.priority].bg,
          borderColor: priorityColors[topic.priority].border
        }}>
          {topic.priority.toUpperCase()}
        </div>
        <div className="status-indicator" style={{ backgroundColor: statusColors[topic.status] }} />
      </div>

      <h3 style={{ color: branding.primaryColor }}>{topic.title}</h3>
      <p className="description">{topic.description}</p>

      {showDetails && (
        <div className="detailed-description">
          <p>{topic.detailedDescription}</p>
        </div>
      )}

      <div className="card-footer">
        <div className="time-estimate">
          <Clock size={16} />
          {isEditing ? (
            <div className="time-edit">
              <input
                type="number"
                value={tempTime}
                onChange={(e) => setTempTime(e.target.value)}
                onBlur={handleTimeSubmit}
                onKeyPress={(e) => e.key === 'Enter' && handleTimeSubmit()}
                min="1"
                max="180"
              />
              <span>min</span>
            </div>
          ) : (
            <span onClick={() => setIsEditing(true)}>{topic.estimatedMinutes} min</span>
          )}
        </div>

        <div className="status-buttons">
          <button
            className={`status-btn ${topic.status === 'not-started' ? 'active' : ''}`}
            onClick={() => onStatusChange(topic.id, 'not-started')}
            style={{
              backgroundColor: topic.status === 'not-started' ? statusColors['not-started'] : 'transparent',
              color: topic.status === 'not-started' ? 'white' : branding.textColor
            }}
          >
            Not Started
          </button>
          <button
            className={`status-btn ${topic.status === 'in-progress' ? 'active' : ''}`}
            onClick={() => onStatusChange(topic.id, 'in-progress')}
            style={{
              backgroundColor: topic.status === 'in-progress' ? statusColors['in-progress'] : 'transparent',
              color: topic.status === 'in-progress' ? 'white' : branding.textColor
            }}
          >
            In Progress
          </button>
          <button
            className={`status-btn ${topic.status === 'completed' ? 'active' : ''}`}
            onClick={() => onStatusChange(topic.id, 'completed')}
            style={{
              backgroundColor: topic.status === 'completed' ? statusColors['completed'] : 'transparent',
              color: topic.status === 'completed' ? 'white' : branding.textColor
            }}
          >
            Completed
          </button>
          <button
            className={`status-btn ${topic.status === 'deferred' ? 'active' : ''}`}
            onClick={() => onStatusChange(topic.id, 'deferred')}
            style={{
              backgroundColor: topic.status === 'deferred' ? statusColors['deferred'] : 'transparent',
              color: topic.status === 'deferred' ? 'white' : branding.textColor
            }}
          >
            Deferred
          </button>
        </div>
      </div>

      <button 
        className="expand-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
    </div>
  );
};

export default TopicCard;