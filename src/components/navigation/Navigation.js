import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar
      expand='lg'
      data-bs-theme='dark'
      className='navbar navbar-expand-lg bg-primary'
    >
      <Navbar.Brand href='#home'>DKMS_WD Management</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ms-auto d-flex align-items-center justify-content-center'>
          <Link className='mx-3' to='/'>
            Customers
          </Link>
          <Link className='mx-3' to='/allJobs'>
            Jobs
          </Link>
          <NavDropdown
            className='mx-3'
            title='Dropdown'
            id='basic-nav-dropdown'
          >
            <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='#action/3.4'>
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
