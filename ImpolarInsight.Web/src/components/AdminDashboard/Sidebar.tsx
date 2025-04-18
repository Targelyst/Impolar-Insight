import React, { useState, useEffect } from 'react';
import { FaRoute, FaChartBar, FaCalendarAlt, FaUsers, FaComments, FaFile, FaCog } from 'react-icons/fa';
import { BiChevronLeft } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import pageUrlsArray, { RoutesAndUrls } from '../../RoutesAndUrls';

// Define sidebar item types based on route keys
type SidebarItemType = 'roadmaps' | 'dashboard' | 'article' | 'calendar' | 'team' | 'messages' | 'documents' | 'settings';

// Interface for sidebar items with route path
interface SidebarItem {
  id: SidebarItemType;
  icon: React.ReactNode;
  title: string;
  path: string;
}

type SidebarProps = {
  // You can add props here if needed
}

const Sidebar: React.FC<SidebarProps> = () => {
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Find the current route based on the path
  const getCurrentItemId = (): SidebarItemType => {
    const path = location.pathname;
    const route = pageUrlsArray.find(r => r.urlPath === path);
    if (route) {
      const id = route.pageName.toLowerCase() as SidebarItemType;
      return id;
    }
    return 'dashboard'; // Default
  };

  const [selectedItem, setSelectedItem] = useState<SidebarItemType>(getCurrentItemId());
  
  // Update selected item when route changes
  useEffect(() => {
    setSelectedItem(getCurrentItemId());
  }, [location]);

  // Define all possible sidebar items with routes
  const sidebarItems: SidebarItem[] = [
    { 
      id: 'dashboard', 
      icon: <FaChartBar size={20} />, 
      title: RoutesAndUrls.HOME.pageName,
      path: RoutesAndUrls.HOME.urlPath 
    },
    { 
      id: 'article', 
      icon: <FaFile size={20} />, 
      title: RoutesAndUrls.ARTRICLE.pageName,
      path: RoutesAndUrls.ARTRICLE.urlPath 
    },
    { 
      id: 'roadmaps', 
      icon: <FaRoute size={20} />, 
      title: RoutesAndUrls.ROADMAPS.pageName,
      path: RoutesAndUrls.ROADMAPS.urlPath 
    },
    {
      id: 'calendar',
      icon: <FaCalendarAlt size={20} />,
      title: RoutesAndUrls.CALENDAR.pageName,
      path: RoutesAndUrls.CALENDAR.urlPath
    },
    {
      id: 'team',
      icon: <FaUsers size={20} />,
      title: RoutesAndUrls.TEAM.pageName,
      path: RoutesAndUrls.TEAM.urlPath
    },
    {
      id: 'messages',
      icon: <FaComments size={20} />,
      title: RoutesAndUrls.MESSAGES.pageName,
      path: RoutesAndUrls.MESSAGES.urlPath
    },
    {
      id: 'documents',
      icon: <FaFile size={20} />,
      title: RoutesAndUrls.DOCUMENTS.pageName,
      path: RoutesAndUrls.DOCUMENTS.urlPath
    },
    {
      id: 'settings',
      icon: <FaCog size={20} />,
      title: RoutesAndUrls.SETTINGS.pageName,
      path: RoutesAndUrls.SETTINGS.urlPath
    }
  ];

  // Function to toggle the secondary sidebar
  const toggleSecondary = () => {
    setIsSecondaryOpen(!isSecondaryOpen);
  };

  // Function to select a sidebar item and navigate to its route
  const selectItem = (itemId: SidebarItemType, path: string) => {
    setSelectedItem(itemId);
    if (!isSecondaryOpen) {
      setIsSecondaryOpen(true);
    }
    navigate(path);
  };

  // Render the content for Roadmaps
  const renderRoadmapsContent = () => {
    return (
      <div className="p-2">
        <h3 className="text-sm text-gray-500 px-4 py-2">Roadmaps</h3>
        <div className="px-4 py-2 bg-gray-200 text-gray-700 rounded font-medium">
          Main Roadmap
        </div>
      </div>
    );
  };

  // Render Dashboard content
  const renderDashboardContent = () => {
    return (
      <div className="p-2">
        <h3 className="text-sm text-gray-500 px-4 py-2">Analytics</h3>
        <div className="px-4 py-2 hover:bg-gray-200 text-gray-700 rounded">
          Overview
        </div>
        <div className="px-4 py-2 hover:bg-gray-200 text-gray-700 rounded">
          Reports
        </div>
      </div>
    );
  };

  // Render Calendar content
  const renderCalendarContent = () => {
    return (
      <div className="p-2">
        <h3 className="text-sm text-gray-500 px-4 py-2">Schedule</h3>
        <div className="px-4 py-2 hover:bg-gray-200 text-gray-700 rounded">
          My Calendar
        </div>
        <div className="px-4 py-2 hover:bg-gray-200 text-gray-700 rounded">
          Meetings
        </div>
      </div>
    );
  };

  // This function renders the secondary sidebar with a common header and dynamic content
  const renderSecondarySidebar = () => {
    // Get the title from the selected sidebar item
    const selectedItemTitle = sidebarItems.find(item => item.id === selectedItem)?.title || '';
    
    // Render the common header
    const headerSection = (
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">{selectedItemTitle}</h2>
        <button 
          className="p-1 rounded hover:bg-gray-200"
          onClick={toggleSecondary}
        >
          <BiChevronLeft size={20} />
        </button>
      </div>
    );
    
    // Render the content based on the selected item
    let contentSection;
    switch (selectedItem) {
      case 'roadmaps':
        contentSection = renderRoadmapsContent();
        break;
      case 'dashboard':
        contentSection = renderDashboardContent();
        break;
      case 'article':
        contentSection = renderArticleContent();
        break;
      case 'calendar':
        contentSection = renderCalendarContent();
        break;
      case 'team':
        contentSection = renderTeamContent();
        break;
      case 'messages':
        contentSection = renderMessagesContent();
        break;
      case 'documents':
        contentSection = renderDocumentsContent();
        break;
      case 'settings':
        contentSection = renderSettingsContent();
        break;
      default:
        contentSection = renderDashboardContent();
    }
    
    return (
      <>
        {headerSection}
        {contentSection}
      </>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Primary sidebar - narrow with icons only */}
      <div className="w-16 bg-gray-800 text-white flex flex-col items-center py-4">
        {sidebarItems.map(item => (
          <div 
            key={item.id}
            className={`p-3 rounded-lg hover:bg-gray-700 cursor-pointer mb-4 ${
              selectedItem === item.id ? 'bg-gray-700' : ''
            }`}
            onClick={() => selectItem(item.id, item.path)}
          >
            {item.icon}
          </div>
        ))}
        <div className="mt-auto">
          {/* Avatar at bottom of sidebar */}
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
            A
          </div>
        </div>
      </div>

      {/* Secondary sidebar - shows text and submenu items based on selected item */}
      {isSecondaryOpen && (
        <div className="w-64 bg-gray-100 border-r">
          {renderSecondarySidebar()}
        </div>
      )}
    </div>
  );
};

export default Sidebar;