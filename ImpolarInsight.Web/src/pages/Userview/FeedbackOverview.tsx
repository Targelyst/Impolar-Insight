import React, { useState, useEffect } from 'react';
import { useGetBoardsQuery, useGetPostsByBoardQuery } from '../../api';
import { Link } from 'react-router-dom';
import { FaChevronUp, FaComment, FaPaperclip, FaCaretRight, FaCaretDown, FaBars } from 'react-icons/fa';

const FeedbackOverview: React.FC = () => {
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);
  const [postTitle, setPostTitle] = useState<string>('');
  const [postDetails, setPostDetails] = useState<string>('');
  const [expandedBoards, setExpandedBoards] = useState<{ [key: string]: boolean }>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [boardHeaderExpanded, setBoardHeaderExpanded] = useState<boolean>(false);

  // Fetch all boards
  const [boardsResult] = useGetBoardsQuery({
    displayOnly: true,
    first: 100
  });

  // Fetch posts for the selected board
  const [postsResult] = useGetPostsByBoardQuery(
    selectedBoardId || "00000000-0000-0000-0000-000000000000",
    { first: 50 }
  );

  // Set initial selected board when data loads and expand only necessary boards
  useEffect(() => {
    if (boardsResult.data && !selectedBoardId) {
      const boards = boardsResult.data.boards?.edges;
      if (boards && boards.length > 0) {
        // Find a top-level board (one without a parent)
        const topLevelBoard = boards.find(board => !board.node.parentBoardId);
        if (topLevelBoard) {
          console.log("Setting first top-level board:", topLevelBoard.node.id);
          setSelectedBoardId(topLevelBoard.node.id);

          // Only expand boards in the path to selected board (none at first)
          const expanded: { [key: string]: boolean } = {};
          setExpandedBoards(expanded);
        } else if (boards.length > 0) {
          console.log("No top-level boards found, setting first board:", boards[0].node.id);
          setSelectedBoardId(boards[0].node.id);
        }
      }
      setIsLoading(false);
    }
  }, [boardsResult.data, selectedBoardId]);

  // Helper function to check if a board has children
  const hasChildren = (boardId: string, boards: any[]) => {
    return boards.some(board => board.node.parentBoardId === boardId);
  };

  // Helper function to find parent boards of a selected board
  const findParentPath = (boardId: string, boards: any[]): string[] => {
    const path: string[] = [];
    let currentId = boardId;

    while (currentId) {
      path.push(currentId);
      const parentBoard = boards.find(board => board.node.id === currentId);
      currentId = parentBoard?.node.parentBoardId || null;
    }

    return path;
  };

  // Expand only boards in the path to the selected board
  useEffect(() => {
    if (selectedBoardId && boardsResult.data?.boards?.edges) {
      const boards = boardsResult.data.boards.edges;
      const parentPath = findParentPath(selectedBoardId, boards);

      const expanded: { [key: string]: boolean } = {};
      parentPath.forEach(boardId => {
        if (hasChildren(boardId, boards)) {
          expanded[boardId] = true;
        }
      });

      setExpandedBoards(expanded);
    }
  }, [selectedBoardId, boardsResult.data]);

  // Toggle board expansion
  const toggleBoardExpansion = (boardId: string) => {
    setExpandedBoards(prev => ({
      ...prev,
      [boardId]: !prev[boardId]
    }));
  };

  // Handle board selection
  const handleBoardSelect = (boardId: string) => {
    console.log("Board selected:", boardId);

    if (selectedBoardId === boardId) {
      console.log("Board already selected, no change needed");
      return;
    }

    setSelectedBoardId(boardId);
    setShowCreatePost(false); // Hide create post form when changing boards
    setMobileMenuOpen(false); // Close mobile menu when selecting a board
  };

  // Toggle create post form
  const toggleCreatePost = () => {
    setShowCreatePost(!showCreatePost);
    setPostTitle('');
    setPostDetails('');
  };

  // Handle create post submit
  const handleCreatePost = () => {
    // This would connect to a mutation in a real implementation
    console.log("Creating post:", {
      title: postTitle,
      details: postDetails,
      boardId: selectedBoardId
    });

    // Reset form and hide it
    setPostTitle('');
    setPostDetails('');
    setShowCreatePost(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Loading state
  if (isLoading || boardsResult.fetching) {
    return (
      <div className="flex justify-center items-center h-full py-16">
        <div className="animate-pulse-slow flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-impolar-primary rounded-full border-t-transparent animate-spin mb-4"></div>
          <p className="text-impolar-bg-text">Loading boards...</p>
        </div>
      </div>
    );
  }

  // No boards found
  const boardsEdges = boardsResult.data?.boards?.edges;
  if (!boardsEdges || boardsEdges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 bg-impolar-bg-surface rounded-lg">
        <svg className="w-16 h-16 text-impolar-secondary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <p className="text-xl text-impolar-bg-surface-text mb-2">No boards found</p>
        <p className="text-impolar-bg-highlight-text">Create a board to get started</p>
      </div>
    );
  }

  // Find selected board
  const selectedBoard = boardsEdges.find(edge => edge.node.id === selectedBoardId)?.node;
  const posts = postsResult.data?.postsByBoard?.edges || [];

  // Organize boards into hierarchy for sidebar
  const organizeBoards = () => {
    // First, identify all top-level boards
    const topLevelBoards = boardsEdges.filter(edge => !edge.node.parentBoardId);
    console.log("Top level boards:", topLevelBoards.map(b => b.node.name));

    // Create a map to store the hierarchy
    const hierarchyMap: { [key: string]: any[] } = {};

    // Populate the map with children for each board
    boardsEdges.forEach(edge => {
      const parentId = edge.node.parentBoardId;
      if (parentId) {
        if (!hierarchyMap[parentId]) {
          hierarchyMap[parentId] = [];
        }
        hierarchyMap[parentId].push(edge);
      }
    });

    // Recursive function to render a board with its children
    const renderBoardItem = (board: any, level: number = 0) => {
      const isParent = hierarchyMap[board.node.id] && hierarchyMap[board.node.id].length > 0;
      const isExpanded = expandedBoards[board.node.id];
      const isSelected = board.node.id === selectedBoardId;

      return (
        <React.Fragment key={board.node.id}>
          <li className="relative my-1">
            <div
              className={`flex items-center rounded-md cursor-pointer ${isSelected ? 'bg-impolar-bg-highlight text-impolar-bg-highlight-text font-medium' : 'hover:bg-impolar-bg-highlight hover:bg-opacity-50'
                }`}
              onClick={() => handleBoardSelect(board.node.id)}
            >
              <div className="flex-shrink-0 w-8 flex justify-center">
                {isParent && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBoardExpansion(board.node.id);
                    }}
                    className="p-1 focus:outline-none text-impolar-bg-highlight-text"
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? <FaCaretDown size={14} /> : <FaCaretRight size={14} />}
                  </button>
                )}
              </div>
              <div
                className="py-3 flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap text-impolar-bg-surface-text"
                style={{ paddingLeft: level === 0 ? '0' : `${level * 4}px` }}
              >
                {board.node.name}
              </div>
            </div>

            {isParent && isExpanded && (
              <ul className="pl-2 ml-2 space-y-1">
                {hierarchyMap[board.node.id].map(child => renderBoardItem(child, level + 1))}
              </ul>
            )}
          </li>
        </React.Fragment>
      );
    };

    return (
      <ul className="space-y-1">
        {topLevelBoards.map(board => renderBoardItem(board))}
      </ul>
    );
  };

  return (
    <div className="flex h-fit bg-impolar-bg">
      {/* Left Sidebar with Boards - No animations to prevent flickering */}
        <div
          className={`w-72 overflow-y-auto flex-col fixed md:relative top-0 left-0 h-full z-50 bg-impolar-bg-surface md:bg-transparent
            shadow-md md:shadow-none text-impolar-bg-surface-text
          md:translate-x-0 transition-none
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:flex`}
        >
          {/* Mobile sidebar header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center md:hidden">
            <h2 className="font-semibold text-impolar-bg-surface-text">Boards</h2>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-impolar-bg-highlight text-impolar-bg-highlight-text"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-5 flex-1">
            <h2 className="text-xs font-semibold text-impolar-bg-highlight-text mb-4 uppercase tracking-wider">BOARDS</h2>
            {organizeBoards()}
          </div>
        </div>

      {/* Mobile overlay background with blur effect - no animations */}
      <div
        className={`fixed inset-0 backdrop-blur-2xl bg-opacity-30 z-40 md:hidden 
          transition-none
          ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMobileMenu}
      ></div>

      {/* Right Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col bg-impolar-bg">
        {selectedBoard ? (
          <div className="max-w-4xl mx-auto p-6 w-full overflow-y-auto h-full">
            {/* Board Header - with mobile menu button */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* Mobile menu button */}
                  <button
                    className="md:hidden mr-3 p-2 rounded-full hover:bg-impolar-bg-highlight text-impolar-bg-text"
                    onClick={toggleMobileMenu}
                    aria-label="Open menu"
                  >
                    <FaBars size={18} />
                  </button>

                  <div>
                    <h1 className="text-2xl font-bold text-impolar-bg-text">{selectedBoard.name}</h1>
                  </div>
                </div>

              </div>

              {/* Board doesn't have a description property in the model */}
            </div>

            {/* Create Post Form */}
            {showCreatePost && (
              <div className="mb-8 bg-impolar-bg-surface p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-impolar-bg-surface-text">Create New Post</h2>
                <input
                  type="text"
                  placeholder="Short, descriptive title"
                  className="w-full mb-4 p-3 bg-impolar-bg rounded-md focus:outline-none focus:ring-2 focus:ring-impolar-primary"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <div className="mb-2 font-medium text-impolar-bg-surface-text">Details</div>
                <textarea
                  placeholder="Any additional details..."
                  className="w-full mb-4 p-3 bg-impolar-bg rounded-md focus:outline-none focus:ring-2 focus:ring-impolar-primary h-32 resize-none"
                  value={postDetails}
                  onChange={(e) => setPostDetails(e.target.value)}
                />
                <div className="flex justify-between items-center">
                  <button className="p-2 rounded-full hover:bg-impolar-bg-highlight text-impolar-bg-highlight-text">
                    <FaPaperclip />
                  </button>
                  <div>
                    <button
                      className="px-4 py-2 rounded-md mr-2 text-impolar-bg-surface-text hover:bg-impolar-bg-highlight"
                      onClick={toggleCreatePost}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-impolar-primary text-impolar-primary-text rounded-md hover:opacity-90"
                      onClick={handleCreatePost}
                    >
                      Create Post
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Filter/Search Controls */}
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
              <div className="flex items-center">
                <span className="mr-2 text-impolar-bg-text">Showing</span>
                <select className="px-3 py-2 rounded-md bg-impolar-bg-surface focus:outline-none focus:ring-2 focus:ring-impolar-primary text-impolar-bg-surface-text">
                  <option>Trending</option>
                  <option>Recent</option>
                  <option>Top</option>
                </select>
                <span className="ml-2 text-impolar-bg-text">posts</span>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-impolar-bg-surface rounded-md focus:outline-none focus:ring-2 focus:ring-impolar-primary w-full md:w-64 text-impolar-bg-surface-text"
                  />
                  <svg className="w-5 h-5 text-impolar-bg-highlight-text absolute left-3 top-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Posts List */}
            {postsResult.fetching ? (
              <div className="text-center py-8">
                <div className="rounded-full h-10 w-10 border-t-2 border-b-2 border-impolar-primary mx-auto animate-spin"></div>
                <p className="mt-2 text-impolar-bg-text">Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16 bg-impolar-bg-surface rounded-lg">
                <svg className="w-16 h-16 text-impolar-bg-highlight-text mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg text-impolar-bg-text">No posts found in this board.</p>
                <p className="text-sm text-impolar-bg-highlight-text mt-1">Be the first to create a post!</p>
                <button
                  onClick={toggleCreatePost}
                  className="mt-4 px-4 py-2 bg-impolar-primary text-impolar-primary-text rounded-md hover:opacity-90"
                >
                  Create a Post
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((postEdge) => {
                  const post = postEdge.node;
                  const voteCount = post.votes?.length || 0;
                  // The Post type doesn't include contentMarkdown, activities, or status properties
                  // so we need to handle those cases

                  return (
                    <div
                      key={post.id}
                      className="rounded-lg overflow-hidden bg-impolar-bg-surface shadow-sm hover:shadow-md"
                    >
                      <div className="p-6">
                        <Link to={`/feedback/${post.slug}/${post.slugId}`} className="block hover:no-underline">
                          <h3 className="text-lg font-semibold mb-2 text-impolar-bg-surface-text hover:text-impolar-primary">
                            {post.title}
                          </h3>
                          <p className="text-impolar-bg-highlight-text mb-4">
                            {/* Handle case where contentMarkdown might not be available */}
                            No description provided.
                          </p>
                        </Link>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-impolar-bg-highlight group">
                              <FaChevronUp className="text-impolar-bg-highlight-text group-hover:text-impolar-primary" />
                              <span className="text-impolar-bg-highlight-text">{voteCount}</span>
                            </button>
                            <div className="flex items-center space-x-1 text-impolar-bg-highlight-text">
                              <FaComment className="text-sm" />
                              <span>0</span> {/* Activities aren't included in the query */}
                            </div>
                          </div>

                          <div className="text-xs">
                            {/* Status isn't included in the Post type, so we'll use a default */}
                            <span className="px-3 py-1 bg-impolar-secondary text-impolar-secondary-text rounded-full">
                              Planned
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full bg-impolar-bg-surface">
            <div className="text-center p-8 rounded-lg">
              <svg className="w-16 h-16 text-impolar-bg-highlight-text mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h2 className="text-xl font-semibold mb-2 text-impolar-bg-surface-text">Select a board</h2>
              <p className="text-impolar-bg-highlight-text">
                Choose a board from the sidebar to view its content
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackOverview;