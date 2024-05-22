
import { Link, Outlet } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <nav className='bg-gray-100'>
        <ul className='flex justify-center items-center font-bold'>
          <li className='m-4'>
            <Link to="/">Create Process</Link>
          </li>
          <li>|</li>
          <li className='m-4'>
            <Link to="/allprocess">All Process</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
