import React, { useState, useEffect } from 'react';
import { useGetBoardsQuery, useGetPostsByBoardQuery } from '../../api';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const FeedbackOverview: React.FC = () => {
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { themeColors } = useTheme();

  // Fetch all boards
  const [boardsResult] = useGetBoardsQuery({
    displayOnly: true,
    first: 50
  });

  // Fetch posts for the selected board
  const [postsResult] = useGetPostsByBoardQuery(
    selectedBoardId || "00000000-0000-0000-0000-000000000000",
    { first: 50 }
  );

  // Set initial selected board when data loads
  useEffect(() => {
    if (boardsResult.data && !selectedBoardId) {
      const boards = boardsResult.data.boards?.edges;
      if (boards && boards.length > 0) {
        console.log("Setting first board:", boards[0].node.id);
        setSelectedBoardId(boards[0].node.id);
      }
      setIsLoading(false);
    }
  }, [boardsResult.data, selectedBoardId]);

  // Log query information
  useEffect(() => {
    console.log("Boards Query:", {
      isFetching: boardsResult.fetching,
      hasData: !!boardsResult.data,
      hasError: !!boardsResult.error
    });
    
    console.log("Posts Query:", {
      selectedBoardId,
      isFetching: postsResult.fetching,
      hasData: !!postsResult.data,
      hasError: !!postsResult.error
    });
    
    if (boardsResult.error) {
      console.error("Boards Error:", boardsResult.error);
    }
    
    if (postsResult.error) {
      console.error("Posts Error:", postsResult.error);
    }
  }, [
    boardsResult.fetching, boardsResult.data, boardsResult.error,
    postsResult.fetching, postsResult.data, postsResult.error,
    selectedBoardId
  ]);

  // Handle board selection
  const handleBoardSelect = (boardId: string) => {
    console.log("Board selected:", boardId);
    
    if (selectedBoardId === boardId) {
      console.log("Board already selected, no change needed");
      return;
    }
    
    setSelectedBoardId(boardId);
  };

  // Loading state
  if (isLoading || boardsResult.fetching) {
    return <div className="text-center py-8">Loading boards...</div>;
  }

  // No boards found
  const boardsEdges = boardsResult.data?.boards?.edges;
  if (!boardsEdges || boardsEdges.length === 0) {
    return <div className="text-center py-8">No boards found.</div>;
  }

  // Find selected board
  const selectedBoard = boardsEdges.find(edge => edge.node.id === selectedBoardId)?.node;
  const posts = postsResult.data?.postsByBoard?.edges || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Feedback Boards</h1>
      
      {/* Boards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {boardsEdges.map(edge => {
          const board = edge.node;
          const isSelected = board.id === selectedBoardId;
          
          return (
            <div 
              key={board.id}
              onClick={() => handleBoardSelect(board.id)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                isSelected 
                  ? 'shadow-lg transform scale-105' 
                  : 'shadow hover:shadow-md'
              }`}
              style={{
                backgroundColor: isSelected 
                  ? (board.color || themeColors?.primary || '#5300E8') 
                  : themeColors?.['bg-surface'] || '#F5F5F5',
                color: isSelected 
                  ? '#FFFFFF' 
                  : themeColors?.['bg-surface-text'] || '#333333',
                borderLeft: `4px solid ${board.color || themeColors?.primary || '#5300E8'}`
              }}
            >
              <h2 className="text-lg font-semibold">{board.name}</h2>
              <div className="mt-2 text-sm opacity-80">
                {board.url && (
                  <span>/{board.url}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Selected Board Content */}
      {selectedBoard && (
        <div className="bg-surface rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold" style={{ color: selectedBoard.color || themeColors?.primary }}>
              {selectedBoard.name}
            </h2>
            {selectedBoard.url && (
              <span className="text-sm bg-bg-highlight px-3 py-1 rounded-full">
                /{selectedBoard.url}
              </span>
            )}
          </div>
          
          {/* Posts List */}
          {postsResult.fetching ? (
            <div className="text-center py-8">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8 text-bg-highlight-text">
              No posts found in this board.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Posts</h3>
                <span className="bg-bg-highlight text-bg-highlight-text px-3 py-1 rounded-full text-sm">
                  {posts.length} post{posts.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="divide-y">
                {posts.map(postEdge => {
                  const post = postEdge.node;
                  const voteCount = post.votes?.length || 0;
                  
                  return (
                    <div key={post.id} className="py-4 hover:bg-bg-highlight rounded px-3 -mx-3">
                      <Link to={`/feedback/${post.slug}/${post.slugId}`} className="block">
                        <div className="flex items-start">
                          <div className="mr-4 bg-bg-highlight rounded-md p-2 text-center min-w-[40px]">
                            <div className="font-bold">{voteCount}</div>
                            <div className="text-xs text-bg-highlight-text">votes</div>
                          </div>
                          <div>
                            <h4 className="font-medium hover:text-primary transition-colors">
                              {post.title}
                            </h4>
                            <div className="text-sm text-bg-highlight-text mt-1 line-clamp-2">
                              {post.contentMarkdown?.substring(0, 100) || 'No description provided.'}
                              {(post.contentMarkdown?.length || 0) > 100 ? '...' : ''}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackOverview;