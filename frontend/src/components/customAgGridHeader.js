import React from 'react';

export default function CustomHeader({ api }) {
    const exportData = () => {
        api.exportDataAsCsv();
    };

    const onSearchChange = (event) => {
        const value = event.target.value;
        api.setQuickFilter(value);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input type="text" onChange={onSearchChange} placeholder="Search..." />
            <button onClick={exportData}>Export</button>
        </div>
    );
}