import { Navbar } from 'react-bootstrap';
import './App.css';
import Profile from './components/Profile';
import image1 from './logo.svg'

function App() {
  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={image1}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
            React Github Application
          </Navbar.Brand>
      </Navbar>
      <Profile />
    </div>
  );
}

export default App;
