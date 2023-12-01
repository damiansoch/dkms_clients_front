import { Row, Table } from 'react-bootstrap';
import { TbListDetails, TbEditCircle } from 'react-icons/tb';
import { TiUserDeleteOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { convertToLabel } from '../../genericFunctions/converters';
import { format, parseISO } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../Context/context';
import { TbListSearch } from 'react-icons/tb';
import { LiaSortSolid } from 'react-icons/lia';

import TooltipGen from './TooltipGen';
import { sortArrayByObjectKey } from '../../genericFunctions/functions';

const GenericTable = ({
  dataPassed,
  data,
  customerDeleteHandler = undefined,
  excludeFields = [],
}) => {
  const [sortedArray, setSortedArray] = useState([]);
  const [sortingOrder, setSortingOrder] = useState('asc');

  const navigate = useNavigate();

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

  //setup search component
  const {
    searchVisible,
    updateSearchBy,
    updateSearchVisibility,
    updateInitialSearchArray,
    resultSearchArray,
  } = useContext(AppContext);

  useEffect(() => {
    updateInitialSearchArray(data);

    return () => {
      updateInitialSearchArray([]);
    };
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    updateSearchBy('');

    // eslint-disable-next-line
  }, []);

  // Infer fields from the first item in the data array and exclude specified fields

  //sorting
  useEffect(() => {
    setSortedArray(resultSearchArray);
  }, [resultSearchArray]);

  const sortingHandler = (key) => {
    let order = sortingOrder === 'asc' ? 'desc' : 'asc';
    var newArray = sortArrayByObjectKey(sortedArray, key, order);
    setSortedArray(newArray);
    setSortingOrder(order);
  };

  const fields =
    resultSearchArray.length > 0
      ? Object.keys(resultSearchArray[0]).filter(
          (key) => !excludeFields.includes(key)
        )
      : [];

  return (
    <>
      <Row>
        <div className=' col-2'>
          <TbListSearch
            size={50}
            className=' text-info'
            onClick={() => {
              updateSearchBy('');
              updateSearchVisibility(!searchVisible);
            }}
          />
        </div>
      </Row>
      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            {fields.map((field, index) => (
              <th
                onClick={() => {
                  updateSearchBy(field);
                }}
                key={index}
                className='table_header'
              >
                {convertToLabel(field)}
              </th>
            ))}

            {dataPassed === 'customers' && (
              <th className='table_header'>Actions</th>
            )}
          </tr>
          <tr>
            {fields.map((field, index) => (
              <td
                onClick={() => {
                  sortingHandler(field);
                }}
                key={index}
                className=' text-center table_key'
              >
                <TooltipGen
                  title={<LiaSortSolid size={20} className=' text-info' />}
                  text={`Sort by ${convertToLabel(field)}`}
                />
              </td>
            ))}
            {dataPassed === 'customers' && (
              <td
                style={{ cursor: 'not-allowed' }}
                className=' text-center table_key text-muted'
              ></td>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedArray.map((item, index) => (
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
                      onClick={() =>
                        navigate(`/addEdit/editCustomer/${item.id}`)
                      }
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
    </>
  );
};

export default GenericTable;
