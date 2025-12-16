import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Program } from '@prisma/client';


interface ProgramsState {
    publicItems: Program[];
    publicStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}


const initialState: ProgramsState = {
    publicItems: [],
    publicStatus: 'idle',
};


export const fetchPublicPrograms = createAsyncThunk('programs/fetchPublicPrograms', async () => {
    const response = await axios.get('/api/programs/public');
    return response.data;
});

const programsSlice = createSlice({
    name: 'programs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPublicPrograms.pending, (state) => { state.publicStatus = 'loading'; })
            .addCase(fetchPublicPrograms.fulfilled, (state, action) => {
                state.publicStatus = 'succeeded';
                state.publicItems = action.payload;
            })
            .addCase(fetchPublicPrograms.rejected, (state) => { state.publicStatus = 'failed'; });
    },
});

export default programsSlice.reducer;