import React from 'react';

export default function Input({ label, className = '', ...props }) {
  return (
    <div>
      {label && <label className="label">{label}</label>}
      <input className={`input-field ${className}`} {...props} />
    </div>
  );
}
