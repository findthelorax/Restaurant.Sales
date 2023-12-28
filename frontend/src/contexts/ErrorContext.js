import React, { createContext, useState } from 'react';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showError = (errorMessage) => {
        setError(errorMessage);
        setIsModalOpen(true);
    };

    const hideError = () => {
        setError(null);
        setIsModalOpen(false);
    };

    return (
        <ErrorContext.Provider value={{ showError, hideError, error, isModalOpen }}>
            {children}
        </ErrorContext.Provider>
    );
};