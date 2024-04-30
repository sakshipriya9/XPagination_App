import React, { useState, useEffect } from 'react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      alert('Failed to fetch data');
      console.error('Error fetching data:', error);
    }
  };

  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, employees.length);
  const totalPages = Math.ceil(employees.length / pageSize);

  const currentPageData = employees.slice(startIndex, endIndex);

  return (
    <div>
      <div><h2>Employee Data Table</h2></div>
      <table>
        <thead>
          <tr style={{ backgroundColor: '#249c42' }}>
            <th style={{ color: 'white' }}>ID</th>
            <th style={{ color: 'white' }}>Name</th>
            <th style={{ color: 'white' }}>Email</th>
            <th style={{ color: 'white' }}>Role</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              {/* Add more table data cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <button style={{ backgroundColor: '#249c42', color: 'white', marginRight: '10px' }} disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
  <span style={{ backgroundColor: '#249c42', color: 'white', margin: '0 10px' }}> {page} </span>
  <button style={{ backgroundColor: '#249c42', color: 'white', marginLeft: '10px' }} disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
</div>

    </div>
  );
};

export default EmployeeList;
