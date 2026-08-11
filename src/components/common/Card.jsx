import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-[#111726] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm ${
        hover ? 'hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
