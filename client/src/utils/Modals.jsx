import React, { Fragment } from 'react';

import DeleteModal from '../components/DeleteModal';
import EditNoteModal from '../components/EditNoteModal';
import NoteCollaboratorModal from '../components/NoteCollaboratorModal';
import NoteModal from '../components/NoteModal';
import { useStateContext } from '../state/context';

const Modals = () => {
  const { modals } = useStateContext();

  return (
    <Fragment>
      {modals.showNoteModal && <NoteModal />}
      {modals.showEditNoteModal && <EditNoteModal />}
      {modals.showNoteCollaboratorModal && <NoteCollaboratorModal />}
      {modals.showDeleteModal && <DeleteModal />}
    </Fragment>
  );
};

export default Modals;
