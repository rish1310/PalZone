import React from 'react';

export const FlexBetween = ({ children }) => {
    return (
        <div className="flex justify-between items-center">
            {children}
        </div>
    );
};

export default FlexBetween;
