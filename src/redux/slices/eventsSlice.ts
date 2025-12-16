import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { UpcomingEvent } from "@prisma/client";
import axios from 'axios';

// Type pour les données du formulaire
export type EventFormData = Omit<UpcomingEvent, 'id' | 'createdAt'>;

interface EventsState {
    items: UpcomingEvent[]; // Pour l'admin
    publicItems: UpcomingEvent[]; // Pour le public
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    publicStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: EventsState = {
    items: [],
    publicItems: [],
    status: 'idle',
    publicStatus: 'idle',
    error: null,
};

// Thunks

// THUNK PUBLIC
export const fetchPublicEvents = createAsyncThunk('events/fetchPublicEvents', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/events/public');
        return response.data as UpcomingEvent[];
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: 'Une erreur inconnue est survenue' });
    }
});


export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/events');
        return response.data as UpcomingEvent[];
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: 'Une erreur inconnue est survenue' });
    }
});

export const createEvent = createAsyncThunk('events/createEvent', async (eventData: EventFormData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/events', eventData);
        return response.data as UpcomingEvent;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: 'Une erreur inconnue est survenue' });
    }
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id: string, { rejectWithValue }) => {
    try {
        await axios.delete(`/api/events/${id}`);
        return id;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: 'Une erreur inconnue est survenue' });
    }
});

// --- Le Slice ---
const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch Admin
        builder.addCase(fetchEvents.pending, (state) => { state.status = 'loading'; });
        builder.addCase(fetchEvents.fulfilled, (state, action: PayloadAction<UpcomingEvent[]>) => {
            state.status = 'succeeded';
            state.items = action.payload;
        });
        builder.addCase(fetchEvents.rejected, (state) => { state.status = 'failed'; });

        // Fetch Public
        builder.addCase(fetchPublicEvents.pending, (state) => { state.publicStatus = 'loading'; });
        builder.addCase(fetchPublicEvents.fulfilled, (state, action: PayloadAction<UpcomingEvent[]>) => {
            state.publicStatus = 'succeeded';
            state.publicItems = action.payload;
        });
        builder.addCase(fetchPublicEvents.rejected, (state) => { state.publicStatus = 'failed'; });

        // Create
        builder.addCase(createEvent.fulfilled, (state, action) => {
            state.items.push(action.payload);
            // CORRECTION : Tri sécurisé des dates
            state.items.sort((a, b) => {
                const dateA = a.date ? new Date(a.date).getTime() : 0;
                const dateB = b.date ? new Date(b.date).getTime() : 0;
                return dateA - dateB;
            });
        });

        // Delete
        builder.addCase(deleteEvent.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        });
    }
});

export default eventsSlice.reducer;