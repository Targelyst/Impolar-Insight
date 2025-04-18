import React, { ReactNode } from 'react'
import Sidebar from '../../components/AdminDashboard/Sidebar';

export const Dashboard = ({
  children,
}: {
  children: ReactNode;

}) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
};
