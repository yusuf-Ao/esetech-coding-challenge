import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../config";




export const fetchAuthoredNotes = createAsyncThunk(
    'note/authored',
    async ({toast},{rejectWithValue}) => {
        try {
            const { data } = await API.get('/note/fetch-authored');
           // toast.success('Notes fetched success')
            return data.data
        } catch (error) {
            if (error.response.data.reason !== null) {
                toast.error(error.response.data.message)
                return rejectWithValue(null)
            }
            toast.error('An error occured while fetching notes')
            return rejectWithValue(null)
        }
    }
)

export const fetchCollaboratedNotes = createAsyncThunk(
    'note/collaborated',
    async ({toast},{rejectWithValue}) => {
        try {
            const { data } = await API.get('/note/fetch-collaborated');
           // toast.success('Notes fetched success')
            return data.data
        } catch (error) {
            if (error.response.data.reason !== null) {
                toast.error(error.response.data.message)
                return rejectWithValue(null)
            }
            toast.error('An error occured while fetching notes')
            return rejectWithValue(null)
        }
    }
)

export const addNote = createAsyncThunk(
    'note/add',
    async ({formData, toast, modals, setModals},{rejectWithValue}) => {
        try {
            const { data } = await API.post('/note/new', formData);
            toast.success('Note Added success')
            setModals({
                    ...modals,
                    showNoteModal: !modals.showNoteModal,
                  });
            return data.data
        } catch (error) {
            if (error.response.data.reason !== null) {
                toast.error(error.response.data.message)
                return rejectWithValue(null)
            }
            toast.error('An error occured while adding note')
            return rejectWithValue(null)
        }
    }
)

export const editNote = createAsyncThunk(
    'note/edit',
    async ({formData, noteId, toast, activeLink, modals, setModals},{rejectWithValue}) => {
        try {
            const { data } = await API.put(`/note/${noteId}/edit`, formData);
            toast.success('Note edited success')
            setModals({
                    ...modals,
                    showEditNoteModal: !modals.showEditNoteModal,
                  });
            return {...data.data, activeLink};
        } catch (error) {
            if (error.response.data.reason !== null) {
                toast.error(error.response.data.message)
                return rejectWithValue(null)
            }
            toast.error('An error occured while editing note')
            return rejectWithValue(null)
        }
    }
)

export const removeNote = createAsyncThunk(
    'note/remove',
    async ({noteId, toast, modals, setModals},{rejectWithValue}) => {
        try {
            const { data } = await API.delete(`/note/${noteId}/remove`);
            toast.success('Note deleted success')
            setModals({
                    ...modals,
                    showDeleteModal: !modals.showDeleteModal,
                  });
            return noteId;
        } catch (error) {
            if (error.response.data.reason !== null) {
                toast.error(error.response.data.message)
                return rejectWithValue(null)
            }
            toast.error('An error occured while deleting note')
            return rejectWithValue(null)
        }
    }
)

export const addCollaborator = createAsyncThunk(
    'note/add_collaborator',
    async ({formData, noteId, toast, modals, setModals},{rejectWithValue}) => {
        try {
            const { data } = await API.post(`/note/${noteId}/add-collaborator?collaboratorEmail=${formData.collaboratorEmail}`);
            toast.success('Collaborator added success')
            setModals({
                    ...modals,
                    showNoteCollaboratorModal: !modals.showNoteCollaboratorModal,
                  });
            return data.data
        } catch (error) {
            if (error.response.data.reason !== null) {
                toast.error(error.response.data.message)
                return rejectWithValue(null)
            }
            toast.error('An error occured while adding collaborator')
            return rejectWithValue(null)
        }
    }
)

export const noteResetStateProperty = createAsyncThunk(
    'note/noteResetStateProperty',
    async ({ key, value = null }, { rejectWithValue }) => {
        try {
            return { key, value }
        } catch (error) {
            console.log(error)
            return rejectWithValue(null)
        }
    }
)