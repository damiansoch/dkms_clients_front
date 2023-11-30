import { Row, Table } from 'react-bootstrap';
import { TbListDetails, TbEditCircle } from 'react-icons/tb';
import { TiUserDeleteOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { convertToLabel } from '../../genericFunctions/converters';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';

const GenericTable = ({
  dataPassed,
  data,
  customerDeleteHandler = undefined,
  excludeFields = [],
}) => {
  const [searchBy, setSerchBy] = useState('firstName');
  console.log(searchBy);
  const navigate = useNavigate();

  // Infer fields from the first item in the data array and exclude specified fields
  const fields =
    data.length > 0
      ? Object.keys(data[0]).filter((key) => !excludeFields.includes(key))
      : [];

  // Function to format date if it's in ISO format
  const formatDate = (value) => {
    const dateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?/;
    if (typeof value === 'string' && dateRegex.test(value)) {
      return format(parseISO(value), 'yyyy-MM-dd');
    }
    return value;
  };

  const handleJobSelect = (job) => {
    navigate(`/details/${job.customerId}`);
  };

  return (
    <Table striped bordered hover className='mt-3'>
      <thead>
        <tr>
          {fields.map((field, index) => (
            <th
              key={index}
              className='table_header'
              onClick={() => {
                setSerchBy(field);
              }}
            >
              {convertToLabel(field)}
            </th>
          ))}
          {dataPassed === 'customers' && (
            <th className='table_header'>Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {fields.map((field, idx) => (
              <td
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  handleJobSelect(item);
                }}
                key={idx}
              >
                {formatDate(item[field])}
              </td>
            ))}
            {dataPassed === 'customers' && (
              <td>
                <Row className='text-center'>
                  {/* Actions remain as they are */}
                  <TbListDetails
                    size={30}
                    className='text-info icon col-4'
                    onClick={() => navigate(`/details/${item.id}`)}
                  />
                  <TbEditCircle
                    size={30}
                    className='text-warning icon col-4'
                    onClick={() => navigate(`/addEdit/editCustomer/${item.id}`)}
                  />
                  <TiUserDeleteOutline
                    size={30}
                    className='text-danger icon col-4'
                    onClick={() => customerDeleteHandler(item)}
                  />
                </Row>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GenericTable;
