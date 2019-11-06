import React from 'react';

export const Option = ({ value, isSelected, description, onChange }) => (
    <div style={{ display: 'flex' }}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onChange(value)}
      />
      <div style={{ marginRight: '5px' }}>{description}</div>
    </div>
  ); 