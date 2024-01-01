import React from 'react';

export function DeleteHeader({ column }) {
    const onExportButtonClick = () => {
        column.gridOptionsWrapper.gridOptions.api.exportDataAsCsv();
    };

    return (
        <div>
            <button onClick={onExportButtonClick}>Export to CSV</button>
            <div className="ag-header-cell-menu-button"></div>
        </div>
    );
};