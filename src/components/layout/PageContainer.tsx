
import React from 'react';
import { Header } from './Header';

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
  return (
    <div className="flex-1 h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
};
