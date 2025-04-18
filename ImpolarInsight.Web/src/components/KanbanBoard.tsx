import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BsListUl, BsPlayFill, BsHourglassSplit, BsCheckCircleFill, BsLightbulbFill, BsPlus } from 'react-icons/bs';
import { useTheme } from '../contexts/ThemeContext';

// Types
export type KanbanItem = {
  id: string;
  title: string;
  labels?: Array<{
    type: string;
    text: string;
  }>;
  date?: string;
  count?: number;
};

export type KanbanColumn = {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: KanbanItem[];
};

export interface KanbanBoardProps {
  columns: KanbanColumn[];
  dndEnabled?: boolean;
  onItemMove?: (itemId: string, sourceColumnId: string, targetColumnId: string) => void;
  onAddItem?: (columnId: string) => void;
}

// DnD item type
const ITEM_TYPE = 'KANBAN_ITEM';

// Robot placeholder SVG for empty columns
const EmptyColumnIcon: React.FC = () => {
  const { themeColors } = useTheme();
  
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: themeColors?.['bg-highlight-text'] || '#9CA3AF' }}
    >
      <rect 
        x="18" 
        y="18" 
        width="28" 
        height="28" 
        rx="5" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill={themeColors?.['bg-highlight'] || '#F1F5F9'} 
      />
      <circle cx="26" cy="28" r="3" fill="currentColor" />
      <circle cx="38" cy="28" r="3" fill="currentColor" />
      <path d="M26 38H38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 10V18" stroke="currentColor" strokeWidth="2" />
      <path d="M10 32H18" stroke="currentColor" strokeWidth="2" />
      <path d="M46 32H54" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

// Card component
const Card: React.FC<{
  item: KanbanItem;
  columnId: string;
  isDraggable: boolean;
}> = ({ item, columnId, isDraggable }) => {
  const { themeColors } = useTheme();
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { id: item.id, sourceColumnId: columnId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: isDraggable,
  }));

  const getLabelStyles = (type: string) => {
    if (type === 'feature') {
      return {
        backgroundColor: themeColors?.secondary || '#FEF3C7',
        color: themeColors?.['secondary-text'] || '#92400E',
      };
    }
    return {
      backgroundColor: themeColors?.['bg-highlight'] || '#F3F4F6',
      color: themeColors?.['bg-highlight-text'] || '#374151',
    };
  };

  const cardStyle = {
    backgroundColor: themeColors?.['bg-surface'] || 'white',
    color: themeColors?.['bg-surface-text'] || '#374151',
    borderColor: themeColors?.['bg-highlight'] || '#E5E7EB',
  };

  const metadataStyle = {
    backgroundColor: themeColors?.['bg-highlight'] || '#F3F4F6',
    color: themeColors?.['bg-highlight-text'] || '#6B7280',
  };

  return (
    <div
      ref={drag}
      className={`p-3 mb-2 rounded-md shadow hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${isDraggable ? 'cursor-grab' : ''}`}
      style={cardStyle}
    >
      <div className="text-sm font-medium">{item.title}</div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-wrap gap-1">
          {item.labels?.map((label, index) => (
            <div
              key={index}
              className="flex items-center px-2 py-0.5 text-xs rounded-full"
              style={getLabelStyles(label.type)}
            >
              {label.type === 'feature' && <BsLightbulbFill className="mr-1" size={10} />}
              {label.text}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {item.date && (
            <div className="text-xs px-2 py-0.5 rounded" style={metadataStyle}>
              {item.date}
            </div>
          )}
          {typeof item.count !== 'undefined' && (
            <div className="flex items-center gap-1 text-xs px-2 py-0.5 rounded" style={metadataStyle}>
              <span>{item.count}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Column component
const Column: React.FC<{
  column: KanbanColumn;
  isDndEnabled: boolean;
  onAddItem?: (columnId: string) => void;
  onDrop?: (itemId: string, sourceColumnId: string, targetColumnId: string) => void;
}> = ({ column, isDndEnabled, onAddItem, onDrop }) => {
  const { themeColors } = useTheme();
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: { id: string; sourceColumnId: string }) => {
      if (item.sourceColumnId !== column.id && onDrop) {
        onDrop(item.id, item.sourceColumnId, column.id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    canDrop: () => isDndEnabled,
  }));

  // Determine icon color based on column title
  const getIconColors = () => {
    switch (column.title) {
      case 'Backlog':
        return {
          bg: themeColors?.['bg-highlight'] || '#F3E8FF',
          color: themeColors?.primary || '#7E22CE',
        };
      case 'Next up':
        return {
          bg: themeColors?.['bg-highlight'] || '#E0E7FF',
          color: themeColors?.secondary || '#4F46E5',
        };
      case 'In Progress':
        return {
          bg: themeColors?.['bg-highlight'] || '#DBEAFE',
          color: themeColors?.['primary-text'] || '#2563EB',
        };
      case 'Done':
        return {
          bg: themeColors?.['bg-highlight'] || '#DCFCE7',
          color: themeColors?.secondary || '#16A34A',
        };
      default:
        return {
          bg: themeColors?.['bg-highlight'] || '#F3F4F6',
          color: themeColors?.['bg-highlight-text'] || '#4B5563',
        };
    }
  };

  const iconColors = getIconColors();
  
  const columnStyle = {
    backgroundColor: themeColors?.['bg-surface'] || '#F9FAFB',
    borderColor: themeColors?.['bg-highlight'] || '#E5E7EB',
  };
  
  const columnHeaderStyle = {
    borderColor: themeColors?.['bg-highlight'] || '#E5E7EB',
  };
  
  const iconStyle = {
    backgroundColor: iconColors.bg,
    color: iconColors.color,
  };
  
  const headerTextStyle = {
    color: themeColors?.['bg-surface-text'] || '#374151',
  };
  
  const countBadgeStyle = {
    backgroundColor: themeColors?.['bg-highlight'] || '#E5E7EB',
    color: themeColors?.['bg-highlight-text'] || '#374151',
  };
  
  const buttonStyle = {
    color: themeColors?.['bg-highlight-text'] || '#6B7280',
  };
  
  const hoverButtonStyle = {
    color: themeColors?.['bg-surface-text'] || '#374151',
    backgroundColor: themeColors?.['bg-highlight'] || '#E5E7EB',
  };

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[250px] max-w-[300px] border rounded-md ${
        isOver && isDndEnabled ? 'bg-opacity-80' : ''
      }`}
      style={columnStyle}
    >
      <div className="p-2 border-b" style={columnHeaderStyle}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-1.5 rounded-md mr-2" style={iconStyle}>
              {column.icon}
            </div>
            <h3 className="font-medium" style={headerTextStyle}>{column.title}</h3>
            <div className="ml-2 text-xs px-2 py-0.5 rounded-full" style={countBadgeStyle}>
              {column.items.length}
            </div>
          </div>
          <button
            onClick={() => onAddItem && onAddItem(column.id)}
            className="p-1 rounded-md transition-colors hover:bg-opacity-80"
            style={buttonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.color = hoverButtonStyle.color;
              e.currentTarget.style.backgroundColor = hoverButtonStyle.backgroundColor;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = buttonStyle.color;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label={`Add item to ${column.title}`}
          >
            <BsPlus size={16} />
          </button>
        </div>
      </div>
      <div className="p-2 min-h-[200px]">
        {column.items.length > 0 ? (
          column.items.map((item) => (
            <Card key={item.id} item={item} columnId={column.id} isDraggable={isDndEnabled} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10" style={{ color: themeColors?.['bg-highlight-text'] || '#9CA3AF' }}>
            <EmptyColumnIcon />
            <p className="mt-2 text-sm">No {column.title} posts</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main KanbanBoard component
const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns,
  dndEnabled = false,
  onItemMove,
  onAddItem,
}) => {
  const { themeColors } = useTheme();
  
  const boardStyle = {
    backgroundColor: themeColors?.bg || '#F9FAFB',
  };
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 overflow-x-auto p-4" style={boardStyle}>
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            isDndEnabled={dndEnabled}
            onAddItem={onAddItem}
            onDrop={onItemMove}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;