import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BsListUl, BsPlayFill, BsHourglassSplit, BsCheckCircleFill, BsLightbulbFill, BsPlus } from 'react-icons/bs';

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
const EmptyColumnIcon: React.FC = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-300"
  >
    <rect x="18" y="18" width="28" height="28" rx="5" stroke="currentColor" strokeWidth="2" fill="#F1F5F9" />
    <circle cx="26" cy="28" r="3" fill="currentColor" />
    <circle cx="38" cy="28" r="3" fill="currentColor" />
    <path d="M26 38H38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M32 10V18" stroke="currentColor" strokeWidth="2" />
    <path d="M10 32H18" stroke="currentColor" strokeWidth="2" />
    <path d="M46 32H54" stroke="currentColor" strokeWidth="2" />
  </svg>
);

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

  return (
    <div
      ref={drag}
      className={`p-3 mb-2 bg-white rounded-md shadow hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${isDraggable ? 'cursor-grab' : ''}`}
    >
      <div className="text-sm font-medium">{item.title}</div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-wrap gap-1">
          {item.labels?.map((label, index) => (
            <div
              key={index}
              className={`flex items-center px-2 py-0.5 text-xs rounded-full ${
                label.type === 'feature' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {label.type === 'feature' && <BsLightbulbFill className="mr-1" size={10} />}
              {label.text}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {item.date && (
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {item.date}
            </div>
          )}
          {typeof item.count !== 'undefined' && (
            <div className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
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

  // Determine icon color class based on column title
  const getIconColorClass = () => {
    switch (column.title) {
      case 'Backlog':
        return 'bg-purple-100 text-purple-600';
      case 'Next up':
        return 'bg-indigo-100 text-indigo-600';
      case 'In Progress':
        return 'bg-blue-100 text-blue-600';
      case 'Done':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[250px] max-w-[300px] bg-gray-50 border border-gray-200 rounded-md ${
        isOver && isDndEnabled ? 'bg-gray-100' : ''
      }`}
    >
      <div className="p-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-1.5 rounded-md mr-2 ${getIconColorClass()}`}>
              {column.icon}
            </div>
            <h3 className="font-medium text-gray-700">{column.title}</h3>
            <div className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
              {column.items.length}
            </div>
          </div>
          <button
            onClick={() => onAddItem && onAddItem(column.id)}
            className="p-1 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
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
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
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
      <div className="flex gap-4 overflow-x-auto p-4">
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