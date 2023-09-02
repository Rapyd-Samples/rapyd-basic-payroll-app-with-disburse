import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import EmployeeStatusToggle from '../components/EmployeeStatusToggle';

const ListEmployees = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    // Retrieve employee data from localStorage on component mount
    const storedEmployeeData = JSON.parse(localStorage.getItem('employeeData')) || [];
    setEmployeeData(storedEmployeeData);
  }, []);

  const handleStatusToggle = (index, newStatus) => {
    // Update the status of the employee at the specified index
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData[index].status = newStatus;
    setEmployeeData(updatedEmployeeData);

    // Update the data in localStorage
    localStorage.setItem('employeeData', JSON.stringify(updatedEmployeeData));
  };

  const containerStyle = {
    textAlign: 'center'
  };
  
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: '20px',
  };

  const thStyle = {
    backgroundColor: '#cacaca',
    color: '#171717',
    padding: '10px',
    textAlign: 'center',
  };

  const tdStyle = {
    border: '1px solid #ccc',  
    padding: '10px',
    textAlign: 'left',
  };


  return (
    <div style={containerStyle}>
      <Header />
      <h2>List of Employees</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Country Code</th>
            <th style={thStyle}>Company</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Employment Date</th>
            <th style={thStyle}>ID Card Type</th>
            <th style={thStyle}>ID Card Number</th>
            <th style={thStyle}>Bank Name</th>
            <th style={thStyle}>Bank Account Number</th>
            <th style={thStyle}>Bank Account Currency Code</th>
            <th style={thStyle}>Salary Amount</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee, index) => (
            <tr key={index}>
              <td style={tdStyle}>{employee.firstName} {employee.lastName}</td>
              <td style={tdStyle}>{employee.email}</td>
              <td style={tdStyle}>{employee.phoneNumber}</td>
              <td style={tdStyle}>{employee.countryCode}</td>
              <td style={tdStyle}>{employee.company}</td>
              <td style={tdStyle}>{employee.role}</td>
              <td style={tdStyle}>{employee.employmentDate}</td>
              <td style={tdStyle}>{employee.idCardType}</td>
              <td style={tdStyle}>{employee.idCardNumber}</td>
              <td style={tdStyle}>{employee.bankName}</td>
              <td style={tdStyle}>{employee.bankAccountNumber}</td>
              <td style={tdStyle}>{employee.bankAccountCurrencyCode}</td>
              <td style={tdStyle}>{employee.salaryAmount}</td>
              <td style={tdStyle}>
                <EmployeeStatusToggle
                  initialStatus={employee.status}
                  onToggle={(newStatus) => handleStatusToggle(index, newStatus)}
                />  
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployees;
