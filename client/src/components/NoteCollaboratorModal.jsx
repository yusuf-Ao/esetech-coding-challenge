import { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addCollaborator } from '../state/actions/note.actions';
import { useStateContext } from '../state/context';

const NoteCollaboratorModal = () => {
  const { modals, setModals } = useStateContext();
  const dispatch = useDispatch();
  const { currentNote } = useSelector((state) => state.note);

  const [formData, updateFormData] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { collaboratorEmail: '' }
  );

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.collaboratorEmail) return toast.error('Email is required');

    dispatch(
      addCollaborator({
        noteId: currentNote.id,
        formData,
        toast,
        modals,
        setModals,
      })
    );
  };

  return (
    <div>
      <div
        id='crud-modal'
        tabindex='-1'
        className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex bg-black bg-opacity-65 justify-center items-center w-full h-full'
      >
        <div className='relative p-4 w-full max-w-md max-h-full'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
              <h3 className='text-lg font-semibold text-green-500'>
                {currentNote?.title}
              </h3>
              <button
                type='button'
                onClick={() => {
                  setModals({
                    ...modals,
                    showNoteCollaboratorModal:
                      !modals.showNoteCollaboratorModal,
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
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
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
                    for='description'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Collaborators
                  </label>
                  <span
                    id='description'
                    name='description'
                    rows='4'
                    className='overflow-y-scroll scrollbar-1 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Write note details here'
                  >
                    <div className='text-sm text-blue-300'>
                      {currentNote?.collaborators.map((collaborator, index) => (
                        <div>
                          {index + 1}. {collaborator.email}
                        </div>
                      ))}
                    </div>
                  </span>
                </div>
                <div className='col-span-2'>
                  <label
                    for='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Add New Collaborator
                  </label>
                  <input
                    type='email'
                    name='collaboratorEmail'
                    id='email'
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='Input collaborator email to add'
                    required=''
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
                    fill-rule='evenodd'
                    d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                Add Collaborator
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCollaboratorModal;
