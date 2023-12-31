import React, { useEffect, useState } from 'react';
import { Button, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSortAlphaDown } from 'react-icons/fa';
import { FaSortAlphaDownAlt } from 'react-icons/fa';
import { searchByFunction, sortByKey } from '../../genericFunctions/functions';
import PaginationComponent from '../generic/PaginationComponent';
import SearchComponent from '../generic/SearchComponent';
import TableRowData from './TableRowData';
import NoData from '../generic/NoData';
import ModalGen from '../generic/ModalGen';

const ItemsPerPage = 10;

const AllUsersTable = ({ customers }) => {
  const [sortedCustomers, setSortedCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const clickHandler = (id) => {
    navigate(`/customer/${id}`);
  };

  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    setSortedCustomers(customers);
  }, [customers]);
  //adding customer

  //sorting
  const sortingHandler = (selection) => {
    let key;
    switch (selection) {
      case 'firstName':
        key = 'firstName';
        break;
      case 'lastName':
        key = 'lastName';
        break;
      case 'companyName':
        key = 'companyName';
        break;
      // Add more cases for other sorting options

      default:
        return;
    }

    const sortedData = sortByKey(sortedCustomers, key, sortOrder);
    setSortedCustomers(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setCurrentPage(1);
  };
  //sorting end

  //filtering
  useEffect(() => {
    if (searchBy !== '') {
      setCurrentPage(1);
      let filtered = searchByFunction(customers, searchBy, searchText);
      setSortedCustomers(filtered);
    }
  }, [searchText, customers, searchBy]);
  //filtering end

  //pagination
  // Calculate total number of pages
  const totalPages = Math.ceil(sortedCustomers.length / ItemsPerPage);
  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * ItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
  // Get the items for the current page
  const currentItems = sortedCustomers.slice(indexOfFirstItem, indexOfLastItem);
  // Change the page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  //pagination end

  //reset message after 1 min
  useEffect(() => {
    if (resultMessage !== '') {
      setTimeout(() => {
        setResultMessage('');
      }, 2000);
    }
  }, [resultMessage]);

  //clear search
  const clearSearch = () => {
    setSearchBy('');
    setSearchText('');
    setSortedCustomers(customers);
  };
  return (
    <>
      <SearchComponent
        searchText={searchText}
        setSearchText={setSearchText}
        selection={['firstName', 'lastName', 'companyName']}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        clearSearchFunction={clearSearch}
      />

      <Table striped bordered hover variant='info' className='mt-3'>
        <thead>
          <tr>
            <th
              onClick={() => sortingHandler('firstName')}
              className='table_header'
            >
              First Name{' '}
              <span className=' text-muted'>
                {sortOrder === 'asc' ? (
                  <FaSortAlphaDown />
                ) : (
                  <FaSortAlphaDownAlt />
                )}
              </span>
            </th>
            <th
              onClick={() => sortingHandler('lastName')}
              className='table_header'
            >
              Last Name{' '}
              <span className=' text-muted'>
                {sortOrder === 'asc' ? (
                  <FaSortAlphaDown />
                ) : (
                  <FaSortAlphaDownAlt />
                )}
              </span>
            </th>
            <th
              onClick={() => sortingHandler('companyName')}
              className='table_header'
            >
              Company{' '}
              <span className=' text-muted'>
                {sortOrder === 'asc' ? (
                  <FaSortAlphaDown />
                ) : (
                  <FaSortAlphaDownAlt />
                )}
              </span>
            </th>
            <th className='table_header'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((customer) => (
            <TableRowData
              key={customer.id}
              customer={customer}
              clickHandler={clickHandler}
              setResultMessage={setResultMessage}
            />
          ))}
        </tbody>
      </Table>
      <div>
        <div className='col-12 d-flex justify-content-end mb-3'>
          <Button onClick={handleShowModal}>New Customer</Button>
        </div>
        <div className=' col-12 d-flex align-items-center justify-content-center'>
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {resultMessage !== '' && (
        <NoData variant={'success'} data={resultMessage} />
      )}
      <ModalGen show={showModal} setShow={setShowModal} data='customer' />
    </>
  );
};

export default AllUsersTable;
