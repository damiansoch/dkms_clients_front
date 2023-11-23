import React from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AllUsersTable = ({ customers }) => {
  const navigate = useNavigate();
  const clickHandler = (id) => {
    navigate(`/customer/${id}`);
  };
  return (
    <Table striped bordered hover variant='info' className='mt-3'>
      <thead>
        <tr>
          <th className='table_header'>First Name</th>
          <th className='table_header'>Last Name</th>
          <th className='table_header'>Company</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id} onClick={(e) => clickHandler(customer.id)}>
            <td style={{ cursor: 'pointer' }}>{customer.firstName}</td>
            <td style={{ cursor: 'pointer' }}>{customer.lastName}</td>
            <td style={{ cursor: 'pointer' }}>{customer.companyName}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AllUsersTable;
