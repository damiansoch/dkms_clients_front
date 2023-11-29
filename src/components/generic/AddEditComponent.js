import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  Table,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { convertToLabel } from '../../genericFunctions/converters';
import { addEditCustomer } from '../../CRUD functions/customerFunctions';
import { isResponseSuccess } from '../../genericFunctions/functions';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../../store/customersSlice';
import ErrorComponent from './ErrorComponent';
import { getCustomerDetails } from '../../store/selectedCustomerSlice';
import { validateData } from '../../genericFunctions/dataValidators';
import SpinnerComponent from './SpinnerComponent';

const AddEditComponent = () => {
  const [initialObject, setInitialObject] = useState({});
  const [message0, setMessage0] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedCustomer, isLoading, isError, errorMessage } = useSelector(
    (state) => state.selectedCustomer
  );

  const { action, id } = useParams();

  useEffect(() => {
    switch (id) {
      case '0':
        setInitialObject({
          firstName: '',
          lastName: '',
          companyName: '',
          phoneNumber: '',
          phoneNumber2: '',
          email: '',
          email2: '',
          extraDetails: '',
        });
        break;

      default:
        setInitialObject({
          id: selectedCustomer.id,
          firstName: selectedCustomer.firstName,
          lastName: selectedCustomer.lastName,
          companyName: selectedCustomer.companyName,
        });
        break;
    }
  }, [id, selectedCustomer]);

  useEffect(() => {
    if (id !== '0') {
      dispatch(getCustomerDetails({ id }));
    }
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialObject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isError) {
      setMessage0(errorMessage);
    }
  }, [isError, errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validateData(initialObject, action);
    if (errors.length > 0) {
      setMessage0(errors);
    } else {
      const response = await addEditCustomer(initialObject, action);
      const isSuccess = isResponseSuccess(response);
      if (isSuccess) {
        setMessage0(response.data);
        dispatch(getCustomers());
        navigate('/');
      } else {
        console.log(response.data);
        setMessage0(response.data);
      }
    }
  };
  return (
    <>
      {isLoading && <SpinnerComponent />}
      <Card className=' mt-3'>
        <CardHeader className=' text-center h3'>
          {convertToLabel(action)}
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit} className=' mt-3'>
            <Table striped bordered hover responsive>
              <tbody>
                {Object.keys(initialObject).map((key) =>
                  key === 'id' ? null : (
                    <tr key={key}>
                      <td>{convertToLabel(key)}</td>
                      <td>
                        <Form.Control
                          type='text'
                          name={key}
                          value={initialObject[key]}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>

            <Button variant='primary' type='submit' className=' mt-2'>
              Submit
            </Button>
          </Form>
        </CardBody>
        <CardFooter>
          {message0 !== '' && (
            <ErrorComponent variant='danger' data={message0} />
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default AddEditComponent;
