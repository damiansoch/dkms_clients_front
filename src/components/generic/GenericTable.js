import { Row, Table } from 'react-bootstrap';
import { TbListDetails, TbEditCircle } from 'react-icons/tb';
import { TiUserDeleteOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { convertToLabel } from '../../genericFunctions/converters';

const GenericTable = ({
  dataPassed,
  data,
  customerDeleteHandler = undefined,
  excludeFields = [],
}) => {
  const navigate = useNavigate();

  // Infer fields from the first item in the data array and exclude specified fields
  const fields =
    data.length > 0
      ? Object.keys(data[0]).filter((key) => !excludeFields.includes(key))
      : [];

  return (
    <Table striped bordered hover className='mt-3'>
      <thead>
        <tr>
          {fields.map((field, index) => (
            <th key={index} className='table_header'>
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
              <td key={idx}>{item[field]}</td>
            ))}
            {dataPassed === 'customers' && (
              <td>
                <Row className='text-center'>
                  {/* Actions remain as they are */}
                  <TbListDetails
                    size={30}
                    className='text-info icon col-4'
                    onClick={() => navigate(`details/${item.id}`)}
                  />
                  <TbEditCircle
                    size={30}
                    className='text-warning icon col-4'
                    onClick={() => navigate(`addEdit/editCustomer/${item.id}`)}
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
