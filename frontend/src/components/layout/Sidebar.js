import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
    {
        title: 'Students',
        icon: '👥',
        submenu: [
            { name: 'Add Student', path: '/students/add' },
            { name: 'Bulk Upload', path: '/students/upload' },
            { name: 'Manage Students', path: '/students/manage' }
        ]
    },
    {
        title: 'Faculty',
        icon: '👨‍🏫',
        submenu: [
            { name: 'Add Faculty', path: '/faculty/add' },
            { name: 'Manage Faculty', path: '/faculty/manage' },
            { name: 'Assign Subjects', path: '/mapping/faculty' }
        ]
    },
    {
        title: 'Subjects',
        icon: '📚',
        submenu: [
            { name: 'Add Subject', path: '/subjects/add' },
            { name: 'Manage Subjects', path: '/subjects/manage' }
        ]
    }
];

const Sidebar = () => {
    const [openMenus, setOpenMenus] = useState({});
    const location = useLocation();

    const toggleMenu = (title) => {
        setOpenMenus(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen fixed left-0 top-0">
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">SmartCMS</h1>
            </div>
            <nav>
                {menuItems.map((item) => (
                    <div key={item.title}>
                        <button
                            onClick={() => toggleMenu(item.title)}
                            className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700"
                        >
                            <span className="mr-2">{item.icon}</span>
                            {item.title}
                            <span className="ml-auto">
                                {openMenus[item.title] ? '▼' : '▶'}
                            </span>
                        </button>
                        {openMenus[item.title] && (
                            <div className="bg-gray-900">
                                {item.submenu.map((subItem) => (
                                    <Link
                                        key={subItem.path}
                                        to={subItem.path}
                                        className={`block px-8 py-2 hover:bg-gray-700 ${
                                            location.pathname === subItem.path
                                                ? 'bg-indigo-600'
                                                : ''
                                        }`}
                                    >
                                        {subItem.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar; 