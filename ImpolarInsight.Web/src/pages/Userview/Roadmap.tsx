import React, { useState, useEffect } from 'react';
import { BsListUl, BsPlayFill, BsHourglassSplit, BsCheckCircleFill } from 'react-icons/bs';
import KanbanBoard, { KanbanColumn, KanbanItem } from '../../components/KanbanBoard';
import { 
  useGetRoadmapCollectionsQuery,
  useGetRoadmapsByCollectionQuery,
  useGetPostsByRoadmapQuery
} from '../../api';

const Roadmap: React.FC = () => {
    const [columns, setColumns] = useState<KanbanColumn[]>([]);
    const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
    const [selectedRoadmapId, setSelectedRoadmapId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Get roadmap collections
    const [collectionsResult] = useGetRoadmapCollectionsQuery({
        first: 10
    });

    // Always call the hooks, but set the variables to control their execution
    // For roadmaps, use a dummy ID when no collection is selected
    const [roadmapsResult] = useGetRoadmapsByCollectionQuery(
        selectedCollectionId || "00000000-0000-0000-0000-000000000000", 
        { 
            displayOnly: true, 
            first: 20 
        }
    );

    // For posts, use a dummy ID when no roadmap is selected
    const [postsResult] = useGetPostsByRoadmapQuery(
        selectedRoadmapId || "00000000-0000-0000-0000-000000000000", 
        { 
            first: 50 
        }
    );

    // Log query information
    useEffect(() => {
        console.log("Collections Query:", {
            isFetching: collectionsResult.fetching,
            hasData: !!collectionsResult.data,
            hasError: !!collectionsResult.error
        });
        
        console.log("Roadmaps Query:", {
            selectedCollectionId,
            isFetching: roadmapsResult.fetching,
            hasData: !!roadmapsResult.data,
            hasError: !!roadmapsResult.error
        });
        
        console.log("Posts Query:", {
            selectedRoadmapId,
            isFetching: postsResult.fetching,
            hasData: !!postsResult.data,
            hasError: !!postsResult.error
        });
        
        if (collectionsResult.error) {
            console.error("Collections Error:", collectionsResult.error);
        }
        
        if (roadmapsResult.error) {
            console.error("Roadmaps Error:", roadmapsResult.error);
        }
        
        if (postsResult.error) {
            console.error("Posts Error:", postsResult.error);
        }
    }, [
        collectionsResult.fetching, collectionsResult.data, collectionsResult.error,
        roadmapsResult.fetching, roadmapsResult.data, roadmapsResult.error,
        postsResult.fetching, postsResult.data, postsResult.error,
        selectedCollectionId, selectedRoadmapId
    ]);

    // Process collections data when it's loaded
    useEffect(() => {
        if (collectionsResult.data && !selectedCollectionId) {
            const collections = collectionsResult.data.roadmapCollections?.edges;
            if (collections && collections.length > 0) {
                console.log("Setting first collection:", collections[0].node.id);
                setSelectedCollectionId(collections[0].node.id);
            }
            setIsLoading(false);
        }
    }, [collectionsResult.data, selectedCollectionId]);

    // Process roadmaps data when it's loaded - only if we have a valid collection ID
    useEffect(() => {
        if (!roadmapsResult.data || !selectedCollectionId) return;

        // Only process data if it's for our selected collection
        // Skip processing if the data is for our dummy ID
        if (!selectedCollectionId) return;

        const roadmaps = roadmapsResult.data.roadmapsByCollection?.edges;
        if (!roadmaps) return;
        
        // If we have roadmaps, set the first one as selected by default
        if (roadmaps.length > 0 && !selectedRoadmapId) {
            console.log("Setting first roadmap as selected:", roadmaps[0].node.id);
            setSelectedRoadmapId(roadmaps[0].node.id);
        }

        // Create the Kanban columns from roadmaps
        const getIconForRoadmap = (index: number) => {
            const icons = [
                <BsListUl size={16} />,
                <BsPlayFill size={16} />,
                <BsHourglassSplit size={16} />,
                <BsCheckCircleFill size={16} />
            ];
            return icons[index % icons.length];
        };

        // Create columns based on roadmaps
        const tempColumns: KanbanColumn[] = roadmaps.map((edge, index) => {
            return {
                id: edge.node.id,
                title: edge.node.name,
                icon: getIconForRoadmap(index),
                items: [] // Will populate with posts in another effect
            };
        });
        
        console.log("Creating columns from roadmaps:", tempColumns.length);
        setColumns(tempColumns);
    }, [roadmapsResult.data, selectedCollectionId, selectedRoadmapId]);

    // Add posts to appropriate column when post data changes - only if we have a valid roadmap ID
    useEffect(() => {
        if (!postsResult.data || !selectedRoadmapId || columns.length === 0) return;

        // Only process data if it's for our selected roadmap
        // Skip processing if the data is for our dummy ID
        if (!selectedRoadmapId) return;

        // Get the posts for the selected roadmap
        const posts = postsResult.data.postsByRoadmap?.edges;
        if (!posts) return;
        
        console.log(`Found ${posts.length} posts for roadmap ${selectedRoadmapId}`);
        
        // Update the column with the matching roadmap ID to include these posts
        setColumns(prevColumns => {
            // Find the column index for this roadmap
            const columnIndex = prevColumns.findIndex(col => col.id === selectedRoadmapId);
            
            if (columnIndex < 0) {
                console.log(`Column not found for roadmap ${selectedRoadmapId}`);
                return prevColumns;
            }
            
            // Create a copy of the columns array
            const newColumns = [...prevColumns];
            
            // Map posts to KanbanItems
            const items: KanbanItem[] = posts.map(postEdge => ({
                id: postEdge.node.id,
                title: postEdge.node.title,
                labels: [{ type: 'feature', text: 'Feature Request' }],
                count: postEdge.node.votes?.length || 0
            }));
            
            // Add items to the column
            newColumns[columnIndex].items = items;
            
            return newColumns;
        });
    }, [postsResult.data, selectedRoadmapId, columns.length]);

    // Handle item move
    const handleItemMove = (itemId: string, sourceColumnId: string, targetColumnId: string) => {
        console.log("Item move request:", {
            itemId,
            sourceColumnId,
            targetColumnId
        });
        
        setColumns((prevColumns) => {
            // Find the source and target columns
            const sourceColumnIndex = prevColumns.findIndex((col) => col.id === sourceColumnId);
            const targetColumnIndex = prevColumns.findIndex((col) => col.id === targetColumnId);

            if (sourceColumnIndex < 0 || targetColumnIndex < 0) {
                console.log("Source or target column not found", {
                    sourceFound: sourceColumnIndex >= 0,
                    targetFound: targetColumnIndex >= 0
                });
                return prevColumns;
            }

            // Find the item in the source column
            const itemIndex = prevColumns[sourceColumnIndex].items.findIndex((item) => item.id === itemId);
            if (itemIndex < 0) {
                console.log(`Item ${itemId} not found in source column ${sourceColumnId}`);
                return prevColumns;
            }

            console.log(`Moving item from column ${sourceColumnIndex} to column ${targetColumnIndex}`);
            
            // Clone the columns array
            const newColumns = [...prevColumns];

            // Remove the item from the source column
            const [item] = newColumns[sourceColumnIndex].items.splice(itemIndex, 1);

            // Add the item to the target column
            newColumns[targetColumnIndex].items.push(item);

            return newColumns;
        });
        
        // In a real application, you would make an API call here to update the post's roadmap
        console.log("Item move successful");
    };

    // Handle adding a new item
    const handleAddItem = (columnId: string) => {
        console.log("Add item to column:", columnId);
        
        // In a real app, you would typically show a form or modal
        // For demo purposes, we'll just add a basic item
        const newItem = {
            id: `item-${Date.now()}`,
            title: `New Item ${Date.now().toString().slice(-4)}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        };

        setColumns((prevColumns) => {
            const columnIndex = prevColumns.findIndex((col) => col.id === columnId);
            if (columnIndex < 0) {
                console.log(`Column ${columnId} not found for adding item`);
                return prevColumns;
            }

            console.log(`Adding new item to column ${columnIndex}`);
            
            const newColumns = [...prevColumns];
            newColumns[columnIndex].items.push(newItem);

            return newColumns;
        });
    };

    // Handle collection selection
    const handleCollectionSelect = (collectionId: string) => {
        console.log("Collection selected:", collectionId);
        
        if (selectedCollectionId === collectionId) {
            console.log("Collection already selected, no change needed");
            return;
        }
        
        setSelectedCollectionId(collectionId);
        
        // Reset selected roadmap and columns when changing collections
        console.log("Resetting selected roadmap and columns");
        setSelectedRoadmapId(null);
        setColumns([]);
    };

    // Loading state
    if (isLoading || collectionsResult.fetching) {
        return <div className="text-center py-8 text-impolar-bg-text">Loading roadmap collections...</div>;
    }

    // No collections found
    const collectionsEdges = collectionsResult.data?.roadmapCollections?.edges;
    if (!collectionsEdges || collectionsEdges.length === 0) {
        return <div className="text-center py-8 text-impolar-bg-text">No roadmap collections found.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {/* Collection selector */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-impolar-bg-text">Roadmap Collections</h2>
                <div className="flex flex-wrap gap-2">
                    {collectionsEdges.map(edge => (
                        <button
                            key={edge.node.id}
                            onClick={() => handleCollectionSelect(edge.node.id)}
                            className={`px-4 py-2 rounded-md ${
                                selectedCollectionId === edge.node.id
                                    ? 'bg-impolar-primary text-impolar-primary-text'
                                    : 'bg-impolar-bg-highlight text-impolar-bg-highlight-text'
                            }`}
                        >
                            {edge.node.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Kanban board with roadmaps as columns */}
            <h2 className="text-xl font-semibold mb-3 text-impolar-bg-text">
                {collectionsEdges.find(
                    edge => edge.node.id === selectedCollectionId
                )?.node.name || "Roadmap"}
            </h2>
            
            {roadmapsResult.fetching ? (
                <div className="text-center py-8 text-impolar-bg-text">Loading roadmaps...</div>
            ) : columns.length === 0 ? (
                <div className="text-center py-8 text-impolar-bg-text">No roadmaps found in this collection.</div>
            ) : (
                <KanbanBoard
                    columns={columns}
                    dndEnabled={true}
                    onItemMove={handleItemMove}
                    onAddItem={handleAddItem}
                />
            )}
        </div>
    );
};

export default Roadmap;