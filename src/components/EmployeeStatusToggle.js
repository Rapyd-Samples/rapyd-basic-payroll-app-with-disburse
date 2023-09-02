import React, { useState } from 'react';

const EmployeeStatusToggle = ({ initialStatus, onToggle }) => {
  const [status, setStatus] = useState(initialStatus);

  const toggleStyle = {
    display: 'inline-block',
    position: 'relative',
    width: '40px',
    height: '20px',
    cursor: 'pointer',
    backgroundColor: 'lightgrey',
    borderRadius: '10px',
  };

  const switchStyle = {
    position: 'absolute',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease',
  };

  const activeSwitchStyle = {
    ...switchStyle,
    left: '0',
    backgroundColor: '#2ecc71', // Green for active status
  };

  const inactiveSwitchStyle = {
    ...switchStyle,
    left: '20px',
    backgroundColor: '#e74c3c', // Red for inactive status
  };

  const handleToggle = () => {
    const newStatus = status === 'active' ? 'inactive' : 'active';
    setStatus(newStatus);
    onToggle(newStatus);
  };

  return (
    <label style={toggleStyle} className="employee-status-toggle">
      <span
        style={status === 'active' ? activeSwitchStyle : inactiveSwitchStyle}
        onClick={handleToggle}
      ></span>
    </label>
  );
};

export default EmployeeStatusToggle;
