import React, { useState } from 'react';
import { BsListUl, BsPlayFill, BsHourglassSplit, BsCheckCircleFill } from 'react-icons/bs';
import KanbanBoard, { KanbanColumn } from '../../components/KanbanBoard';

const Roadmap: React.FC = () => {
    const [columns, setColumns] = useState<KanbanColumn[]>([
        {
            id: 'backlog',
            title: 'Backlog',
            icon: <BsListUl size={16} />,
            items: [
                {
                    id: 'item-1',
                    title: 'Test',
                    labels: [{ type: 'feature', text: 'Feature Request' }],
                    date: 'Apr 24',
                    count: 1,
                },
            ],
        },
        {
            id: 'next-up',
            title: 'Next up',
            icon: <BsPlayFill size={16} />,
            items: [],
        },
        {
            id: 'in-progress',
            title: 'In Progress',
            icon: <BsHourglassSplit size={16} />,
            items: [],
        },
        {
            id: 'done',
            title: 'Done',
            icon: <BsCheckCircleFill size={16} />,
            items: [],
        },
    ]);


    const handleItemMove = (itemId: string, sourceColumnId: string, targetColumnId: string) => {
        setColumns((prevColumns) => {
            // Find the source and target columns
            const sourceColumnIndex = prevColumns.findIndex((col) => col.id === sourceColumnId);
            const targetColumnIndex = prevColumns.findIndex((col) => col.id === targetColumnId);

            if (sourceColumnIndex < 0 || targetColumnIndex < 0) return prevColumns;

            // Find the item in the source column
            const itemIndex = prevColumns[sourceColumnIndex].items.findIndex((item) => item.id === itemId);
            if (itemIndex < 0) return prevColumns;

            // Clone the columns array
            const newColumns = [...prevColumns];

            // Remove the item from the source column
            const [item] = newColumns[sourceColumnIndex].items.splice(itemIndex, 1);

            // Add the item to the target column
            newColumns[targetColumnIndex].items.push(item);

            return newColumns;
        });
    };

    const handleAddItem = (columnId: string) => {
        // In a real app, you would typically show a form or modal
        // For demo purposes, we'll just add a basic item
        const newItem = {
            id: `item-${Date.now()}`,
            title: `New Item ${Date.now().toString().slice(-4)}`,
            date: 'Apr 24',
        };

        setColumns((prevColumns) => {
            const columnIndex = prevColumns.findIndex((col) => col.id === columnId);
            if (columnIndex < 0) return prevColumns;

            const newColumns = [...prevColumns];
            newColumns[columnIndex].items.push(newItem);

            return newColumns;
        });
    };

    return (
        <div className="container mx-auto p-4">


            <KanbanBoard
                columns={columns}
                dndEnabled={false}
                onItemMove={handleItemMove}
                onAddItem={handleAddItem}
            />
        </div>
    );
};

export default Roadmap;