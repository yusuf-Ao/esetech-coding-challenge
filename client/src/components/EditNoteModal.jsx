import { useDispatch, useSelector } from 'react-redux';
import { editNote } from '../state/actions/note.actions';
import { useStateContext } from '../state/context';
import { toast } from 'react-toastify';
import { useEffect, useReducer } from 'react';

const EditNoteModal = () => {
  const dispatch = useDispatch();
  const { modals, setModals, activeLink } = useStateContext();
  const { currentNote } = useSelector((state) => state.note);

  const [formData, updateFormData] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { title: '', description: '' }
  );

  useEffect(() => {
    if (currentNote) {
      updateFormData({
        title: currentNote?.title,
        description: currentNote?.description,
      });
    }
  }, [currentNote]);

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description)
      return toast.error('All fields are required');

    dispatch(
      editNote({
        formData,
        noteId: currentNote?.id,
        toast,
        activeLink,
        modals,
        setModals,
      })
    );
  };

  return (
    <div className='flex'>
      <div
        id='crud-modal'
        tabIndex='-1'
        className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex bg-black bg-opacity-65 justify-center items-center w-full h-full'
      >
        <div className='relative p-4 w-full max-w-md max-h-full'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Edit Note
              </h3>
              <button
                type='button'
                onClick={() => {
                  setModals({
                    ...modals,
                    showEditNoteModal: !modals.showEditNoteModal,
                  });
                }}
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-toggle='crud-modal'
              >
                <svg
                  className='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className='p-4 md:p-5'>
              <div className='grid gap-4 mb-4 grid-cols-2'>
                <div className='col-span-2'>
                  <label
                    htmlFor='title'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Title
                  </label>
                  <input
                    type='text'
                    name='title'
                    value={formData.title}
                    id='title'
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='Type Note title'
                    required
                  />
                </div>
                <div className='col-span-2 '>
                  <label
                    htmlFor='description'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Note Details
                  </label>
                  <textarea
                    value={formData.description}
                    id='description'
                    name='description'
                    onChange={handleChange}
                    rows='4'
                    className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 scrollbar-1'
                    placeholder='Write note details here'
                  />
                </div>
              </div>
              <button
                type='submit'
                className='text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <svg
                  className='me-1 -ms-1 w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                    clipRule='evenodd'
                  />
                </svg>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
