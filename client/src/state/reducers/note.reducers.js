import { createSlice } from "@reduxjs/toolkit";
import { addCollaborator, addNote, editNote, fetchAuthoredNotes, fetchCollaboratedNotes, noteResetStateProperty, removeNote } from "../actions/note.actions";


const noteSlice = createSlice ({
    name: 'note',
    initialState: {
        authoredNotes : null,
        collabNotes : null,
        currentNote: null,
        noteLoading: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuthoredNotes.fulfilled, (state, actions) => {
            state.authLoading = false
            state.authoredNotes = actions.payload
        })
        builder.addCase(fetchAuthoredNotes.pending, (state) => {
            state.authLoading = true
        })
        builder.addCase(fetchAuthoredNotes.rejected, (state) => {
            state.authLoading = false
        })


        builder.addCase(fetchCollaboratedNotes.fulfilled, (state, actions) => {
            state.authLoading = false
            state.collabNotes = actions.payload
        })
        builder.addCase(fetchCollaboratedNotes.pending, (state) => {
            state.authLoading = true
        })
        builder.addCase(fetchCollaboratedNotes.rejected, (state) => {
            state.authLoading = false
        })

        builder.addCase(editNote.fulfilled, (state, actions) => {
            state.authLoading = false
            if (actions.payload.activeLink === 'My Notes') {
                const index = state.authoredNotes.findIndex(item => item.id === actions.payload.id)
                state.authoredNotes[index] = actions.payload
            }
            if (actions.payload.activeLink === 'Collaborating') {
                const index = state.collabNotes.findIndex(item => item.id === actions.payload.id)
                state.collabNotes[index] = actions.payload
            }
            
        })
        builder.addCase(editNote.pending, (state) => {
            state.authLoading = true
        })
        builder.addCase(editNote.rejected, (state) => {
            state.authLoading = false
        })

        builder.addCase(removeNote.fulfilled, (state, actions) => {
            state.authLoading = false
            state.authoredNotes = state.authoredNotes.filter(item => item.id !== actions.payload)

        })
        builder.addCase(removeNote.pending, (state) => {
            state.authLoading = true
        })
        builder.addCase(removeNote.rejected, (state) => {
            state.authLoading = false
        })


        builder.addCase(addNote.fulfilled, (state, actions) => {
            state.authLoading = false
            state.authoredNotes = [actions.payload, ...state.authoredNotes]
        })
        builder.addCase(addNote.pending, (state) => {
            state.authLoading = true
        })
        builder.addCase(addNote.rejected, (state) => {
            state.authLoading = false
        })


        builder.addCase(addCollaborator.fulfilled, (state, actions) => {
            state.authLoading = false
            const index = state.authoredNotes.findIndex(item => item.id === actions.payload.id)
            state.authoredNotes[index] = actions.payload
        })
        builder.addCase(addCollaborator.pending, (state) => {
            state.authLoading = true
        })
        builder.addCase(addCollaborator.rejected, (state) => {
            state.authLoading = false
        })



        builder.addCase(noteResetStateProperty.fulfilled, (state, actions) => {
            state.authLoading = false
            if (actions.payload.key === 'Note') {
                state.currentNote = actions.payload.value
            }
        })
        builder.addCase(noteResetStateProperty.pending, (state) => {
            state.authLoading = true
        })
        builder.addCase(noteResetStateProperty.rejected, (state) => {
            state.authLoading = false
        })
    }
})

export default noteSlice.reducer