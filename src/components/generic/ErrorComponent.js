import Alert from 'react-bootstrap/Alert';

const ErrorComponent = ({ data, variant }) => {
  return (
    <div
      style={{ width: '100%' }}
      className=' d-flex justify-content-center align-items-center my-3'
    >
      <Alert key={variant} variant={variant}>
        {Array.isArray(data)
          ? // If data is an array, map over it and display each element on a new line
            data.map((item, index) => (
              <div key={index}>
                {item}
                <br />
              </div>
            ))
          : // If data is not an array, display it as is
            data}
      </Alert>
    </div>
  );
};

export default ErrorComponent;
