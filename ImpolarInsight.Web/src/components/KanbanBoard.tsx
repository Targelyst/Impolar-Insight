import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BsLightbulbFill, BsPlus } from 'react-icons/bs';

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
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-impolar-bg-highlight-text"
    >
      <rect 
        x="18" 
        y="18" 
        width="28" 
        height="28" 
        rx="5" 
        stroke="currentColor" 
        strokeWidth="2" 
        className="fill-impolar-bg-highlight" 
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
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { id: item.id, sourceColumnId: columnId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: isDraggable,
  }));

  const getLabelClasses = (type: string) => {
    if (type === 'feature') {
      return 'bg-impolar-secondary text-impolar-secondary-text';
    }
    return 'bg-impolar-bg-highlight text-impolar-bg-highlight-text';
  };

  return (
    <div
      ref={drag}
      className={`p-3 mb-2 rounded-md shadow hover:shadow-md transition-shadow bg-impolar-bg-surface text-impolar-bg-surface-text border border-impolar-bg-highlight
      ${isDragging ? 'opacity-50' : 'opacity-100'} 
      ${isDraggable ? 'cursor-grab' : ''}`}
    >
      <div className="text-sm font-medium">{item.title}</div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-wrap gap-1">
          {item.labels?.map((label, index) => (
            <div
              key={index}
              className={`flex items-center px-2 py-0.5 text-xs rounded-full ${getLabelClasses(label.type)}`}
            >
              {label.type === 'feature' && <BsLightbulbFill className="mr-1" size={10} />}
              {label.text}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {item.date && (
            <div className="text-xs px-2 py-0.5 rounded bg-impolar-bg-highlight text-impolar-bg-highlight-text">
              {item.date}
            </div>
          )}
          {typeof item.count !== 'undefined' && (
            <div className="flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-impolar-bg-highlight text-impolar-bg-highlight-text">
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

  // Determine icon class based on column title
  const getIconClasses = () => {
    switch (column.title) {
      case 'Backlog':
        return 'bg-impolar-bg-highlight text-impolar-primary';
      case 'Next up':
        return 'bg-impolar-bg-highlight text-impolar-secondary';
      case 'In Progress':
        return 'bg-impolar-bg-highlight text-impolar-primary-text';
      case 'Done':
        return 'bg-impolar-bg-highlight text-impolar-secondary';
      default:
        return 'bg-impolar-bg-highlight text-impolar-bg-highlight-text';
    }
  };

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[250px] max-w-[300px] border rounded-md bg-impolar-bg-surface border-impolar-bg-highlight
      ${isOver && isDndEnabled ? 'bg-opacity-80' : ''}`}
    >
      <div className="p-2 border-b border-impolar-bg-highlight">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-1.5 rounded-md mr-2 ${getIconClasses()}`}>
              {column.icon}
            </div>
            <h3 className="font-medium text-impolar-bg-surface-text">{column.title}</h3>
            <div className="ml-2 text-xs px-2 py-0.5 rounded-full bg-impolar-bg-highlight text-impolar-bg-highlight-text">
              {column.items.length}
            </div>
          </div>
          <button
            onClick={() => onAddItem && onAddItem(column.id)}
            className="p-1 rounded-md transition-colors hover:bg-impolar-bg-highlight text-impolar-bg-highlight-text hover:text-impolar-bg-surface-text"
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
          <div className="flex flex-col items-center justify-center py-10 text-impolar-bg-highlight-text">
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
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 overflow-x-auto p-4 bg-impolar-bg">
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