import Alert from 'react-bootstrap/Alert';

const NoData = ({ variant, data }) => {
  return (
    <Alert variant={variant} className='text-center'>
      {Array.isArray(data) ? (
        // If data is an array, render each item on a new line
        data.map((item, index) => <div key={index}>{item}</div>)
      ) : (
        // If data is a string, display it
        <div>{data}</div>
      )}
    </Alert>
  );
};

export default NoData;
