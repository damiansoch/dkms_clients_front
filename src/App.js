import './App.css';
import { Container } from 'react-bootstrap';
import Navigation from './components/navigation/Navigation';

import AllCustomers from './components/allCustomers/AllCustomers';
import { Route, Routes } from 'react-router-dom';
import AddEditComponent from './components/generic/AddEditComponent';
import EditableTable from './components/generic/EditableTable';

function App() {
  return (
    <div className='App'>
      <Container>
        <Navigation />
        <Routes>
          <Route path='/' element={<AllCustomers />} />
          <Route path='addEdit/:action/:id' element={<AddEditComponent />} />
          <Route path='details/:id' element={<EditableTable />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
