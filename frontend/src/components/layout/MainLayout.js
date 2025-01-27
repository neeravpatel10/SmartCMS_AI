import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                {children}
            </div>
        </div>
    );
};

export default MainLayout; 