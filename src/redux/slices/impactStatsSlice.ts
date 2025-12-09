import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


// Interface pour nos objets de statistique
export interface ImpactStat {
    id: string;
    icon: string;
    number: string;
    label: string;
    order: number;
}

// Type pour les données de création (sans l'ID)
type NewStatData = Omit<ImpactStat, 'id'>;
// Type pour les données de mise à jour (l'ID est nécessaire, le reste est partiel)
type UpdateStatData = { id: string } & Partial<NewStatData>;


interface ImpactStatsState {
    stats: ImpactStat[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ImpactStatsState = {
    stats: [],
    status: 'idle',
    error: null,
};

// --- THUNKS ASYNCHRONES ---

// GET
export const fetchImpactStats = createAsyncThunk('impactStats/fetchImpactStats', async () => {
    const response = await axios.get('/api/impact-stats');
    return response.data as ImpactStat[];
});

// POST
export const createImpactStat = createAsyncThunk('impactStats/createImpactStat', async (newStat: NewStatData) => {
    const response = await axios.post('/api/impact-stats', newStat);
    return response.data as ImpactStat;
});

// PUT
export const updateImpactStat = createAsyncThunk('impactStats/updateImpactStat', async (updatedStat: UpdateStatData) => {
    const { id, ...data } = updatedStat;
    const response = await axios.put(`/api/impact-stats/${id}`, data);
    return response.data as ImpactStat;
});

// DELETE
export const deleteImpactStat = createAsyncThunk('impactStats/deleteImpactStat', async (id: string) => {
    await axios.delete(`/api/impact-stats/${id}`);
    return id; // Retourner l'ID pour le supprimer du state
});


const impactStatsSlice = createSlice({
    name: 'impactStats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchImpactStats.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchImpactStats.fulfilled, (state, action: PayloadAction<ImpactStat[]>) => {
                state.status = 'succeeded';
                state.stats = action.payload;
            })
            .addCase(fetchImpactStats.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Échec de la récupération';
            })
            // Create
            .addCase(createImpactStat.fulfilled, (state, action: PayloadAction<ImpactStat>) => {
                state.stats.push(action.payload);
            })
            // Update
            .addCase(updateImpactStat.fulfilled, (state, action: PayloadAction<ImpactStat>) => {
                const index = state.stats.findIndex(stat => stat.id === action.payload.id);
                if (index !== -1) {
                    state.stats[index] = action.payload;
                }
            })
            // Delete
            .addCase(deleteImpactStat.fulfilled, (state, action: PayloadAction<string>) => {
                state.stats = state.stats.filter(stat => stat.id !== action.payload);
            });
    },
});

export default impactStatsSlice.reducer;
