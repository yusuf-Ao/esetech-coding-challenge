import Lottie from 'lottie-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import NoteCard from '../../components/NoteCard';

import { Animation4 } from '../../assets';
import {
  fetchAuthoredNotes,
  fetchCollaboratedNotes,
} from '../../state/actions/note.actions';

const Notes = ({ activeLink }) => {
  const dispatch = useDispatch();
  const { authoredNotes, collabNotes } = useSelector((state) => state.note);

  useEffect(() => {
    if (activeLink == 'My Notes') {
      dispatch(fetchAuthoredNotes({ toast }));
    } else {
      dispatch(fetchCollaboratedNotes({ toast }));
    }
  }, [activeLink]);

  return (
    <div className='h-full w-full flex gap-8 justify-center px-4 flex-wrap py-8 mt-2 top-6 pb-2'>
      {activeLink == 'My Notes' &&
        authoredNotes?.map((note, index) => (
          <NoteCard note={note} activeLink={activeLink} />
        ))}
      {activeLink == 'My Notes' && authoredNotes?.length === 0 && (
        <div className='h-[70vh] items-center'>
          <Lottie loop={true} className='h-full' animationData={Animation4} />
        </div>
      )}

      {activeLink == 'Collaborating' &&
        collabNotes?.map((note, index) => (
          <NoteCard note={note} activeLink={activeLink} />
        ))}
      {activeLink == 'Collaborating' && collabNotes?.length === 0 && (
        <div className='h-[70vh] items-center'>
          <Lottie loop={true} className='h-full' animationData={Animation4} />
        </div>
      )}
    </div>
  );
};

export default Notes;
