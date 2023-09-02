import React from 'react';
import Header from '../components/Header';

const Home = () => {
  const containerStyle = {
    textAlign: 'center'
  };

  const actionUrlsStyle = {
    listStyle: 'none', 
    padding: 0, 
    display: 'flex', 
    justifyContent: 'center',
  };

  const actionUrlItemStyle = {
    margin: '0 10px', 
  };

  return (
    <div style={containerStyle}>
      <Header />
      <h2>Welcome</h2>
      <h3> Use the navigation below to add or view employees</h3>
      <ul style={actionUrlsStyle} className="action-urls">
        <li style={actionUrlItemStyle} className="action-url-item">
          <a href={`/add-employee`}>Add Employee</a>
        </li>
        <li style={actionUrlItemStyle} className="action-url-item">
          <a href={`/list-employees`}>List Employees</a>
        </li>
      </ul>
    </div>
  );
};

export default Home;
