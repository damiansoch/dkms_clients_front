import Spinner from 'react-bootstrap/Spinner';

const SpinnerComponent = () => {
  return (
    <div
      style={{ width: '100%' }}
      className=' d-flex justify-content-center align-items-center my-5'
    >
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default SpinnerComponent;
