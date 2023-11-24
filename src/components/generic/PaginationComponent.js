import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  return (
    <Pagination>
      <Pagination.Prev
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      />
      {Array.from({ length: totalPages }).map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => onPageChange(index + 1)}
          className={index + 1 !== currentPage ? 'inactive-pagination' : ''}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
