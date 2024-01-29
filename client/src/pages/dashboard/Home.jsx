import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authSignout } from '../../state/actions/auth.actions';
import { useStateContext } from '../../state/context';
import Modals from '../../utils/Modals';
import Notes from './Notes';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { modals, setModals, activeLink, setActiveLink } = useStateContext();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    setActiveLink('My Notes');
  }, []);

  return (
    <div className='flex flex-col h-screen'>
      {/* Navigation Bar */}
      <nav className='bg-gray-800 p-4 flex items-center justify-between'>
        <div className='flex items-center space-x-4 text-white'>
          {['My Notes', 'Collaborating'].map((item, index) => (
            <div
              onClick={() => setActiveLink(item)}
              className={`p-2 pb-0 cursor-pointer text-sm text-nowrap lg:text-lg ${
                activeLink === item ? 'text-blue-400 ' : 'hover:text-blue-300'
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        <div className='flex items-center space-x-4'>
          {activeLink == 'My Notes' && (
            <button
              className='bg-blue-500 text-white px-6 py-2 rounded-md'
              onClick={() => {
                setModals({ ...modals, showNoteModal: !modals.showNoteModal });
              }}
            >
              New Note
            </button>
          )}
          <button
            type='button'
            onClick={() => dispatch(authSignout({ toast, navigate }))}
            class='text-blue-700 border border-red-400 hover:bg-red-700 hover:text-red-500  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center '
          >
            <svg
              class='w-6 h-6 text-red-300 '
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M12 13V8m0 8h0m9-4a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
            <span class='sr-only'>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className='flex-grow p-8 overflow-y-scroll scrollbar-1'>
        <Modals />

        <Notes activeLink={activeLink} />
      </main>
    </div>
  );
};

export default Home;
