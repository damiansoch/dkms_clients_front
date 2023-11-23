import React from 'react';
import { Card, CardBody, Table } from 'react-bootstrap';

const DataTable = ({ data }) => {
  const keys = Object.keys(data);

  return (
    <Card className='my-3 bg-body-secondary'>
      <CardBody>
        <Table striped bordered hover>
          <tbody>
            {keys.map((key) => {
              // Ignore keys like 'id' or 'customerId'
              if (key === 'id' || key === 'customerId') {
                return null; // Skip this key
              }

              return (
                <tr key={key}>
                  <td className='table_key'>{key}</td>
                  <td>{data[key]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
export default DataTable;
