import { useDispatch } from 'react-redux';
import { noteResetStateProperty } from '../state/actions/note.actions';
import { useStateContext } from '../state/context';

const NoteCard = ({ note, activeLink }) => {
  const { modals, setModals } = useStateContext();
  const dispatch = useDispatch();
  return (
    <div
      className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-[300px] h-[400px]'
      onClick={() => {
        dispatch(noteResetStateProperty({ key: 'Note', value: note }));
      }}
    >
      {/* Header */}
      <div className='flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-blue-200'>
        <h2 className='text-lg font-semibold '>{note.title}</h2>
        <div className='space-x-2 items-center relative'>
          {activeLink == 'My Notes' && (
            <div className='flex gap-2'>
              <button
                onClick={() => {
                  setModals({
                    ...modals,
                    showDeleteModal: !modals.showDeleteModal,
                  });
                }}
                className='text-red-600 hover:text-red-800'
              >
                <svg
                  class='w-4 h-4 text-red-600'
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
                    d='M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z'
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  setModals({
                    ...modals,
                    showNoteCollaboratorModal:
                      !modals.showNoteCollaboratorModal,
                  });
                }}
              >
                <svg
                  className='w-4 h-4 text-blue-700'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-width='2'
                    d='M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3a2.5 2.5 0 1 1 2-4.5M19.5 17h.5c.6 0 1-.4 1-1a3 3 0 0 0-3-3h-1m0-3a2.5 2.5 0 1 0-2-4.5m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3c0 .6-.4 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z'
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div
        className='hover:cursor-pointer hover:bg-gray-100/50 h-full'
        onClick={() => {
          setModals({
            ...modals,
            showEditNoteModal: !modals.showEditNoteModal,
          });
        }}
      >
        <div className='flex-1 px-4 py-2 m-2 h-[60%] border border-blue-200 overflow-y-scroll scrollbar-1'>
          <p className='text-sm text-gray-600'>{note.description}</p>
        </div>
        <div className='flex-1 px-4 py-2 mb-4'>
          <p className='text-xs text-gray-400'>Author: {note?.owner?.email}</p>
          <p className='text-xs text-gray-400'>
            Created on: {note?.created_at}
          </p>
          <p className='text-xs text-gray-400 mt-2'>
            Last Editor: {note?.last_edited_by?.email}
          </p>
          <p className='text-xs text-gray-400'>Updated on {note?.updated_at}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
