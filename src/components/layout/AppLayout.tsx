
import React from 'react';
import { AppSidebar } from './AppSidebar';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <Outlet />
    </div>
  );
};
