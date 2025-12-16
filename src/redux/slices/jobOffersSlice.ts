import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { JobOffer, JobApplication } from "@prisma/client";
import { createJobOfferSchema } from '@/schemas/jobOffert.schema';
import { z } from 'zod';

// Types
export type JobOfferWithApplications = JobOffer & { applications: JobApplication[] };
export type JobOfferFormData = z.infer<typeof createJobOfferSchema>;

interface JobOffersState {
  items: JobOfferWithApplications[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  mutationStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  mutationError: string | null;
}

const initialState: JobOffersState = {
  items: [],
  status: 'idle',
  error: null,
  mutationStatus: 'idle',
  mutationError: null,
};

// --- THUNKS ---
// Le fetch pointe maintenant vers la route admin sécurisée
export const fetchAdminJobOffers = createAsyncThunk('jobOffers/fetchAdminJobOffers', async () => {
  const response = await fetch('/api/admin/jobs');
  if (!response.ok) throw new Error("Échec de la récupération");
  return (await response.json()) as JobOfferWithApplications[];
});

export const createJobOffer = createAsyncThunk('jobOffers/createJobOffer', async (formData: JobOfferFormData) => {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  if (!response.ok) throw new Error("Échec de la création");
  return (await response.json()) as JobOfferWithApplications;
});

export const deleteJobOffer = createAsyncThunk('jobOffers/deleteJobOffer', async (id: string) => {
  const response = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error("Échec de la suppression");
  return id;
});

// --- SLICE ---
const jobOffersSlice = createSlice({
  name: 'jobOffers',
  initialState,
  reducers: {
    setJobOffers: (state, action: PayloadAction<JobOfferWithApplications[]>) => {
      state.items = action.payload;
      state.status = 'succeeded';
    },
    resetJobOfferMutation: (state) => {
      state.mutationStatus = 'idle';
      state.mutationError = null;
    }
  },
  extraReducers: (builder) => {
    // Gère les 3 états (pending, fulfilled, rejected) pour chaque thunk
    // Fetch
    builder.addCase(fetchAdminJobOffers.pending, (state) => { state.status = 'loading'; });
    builder.addCase(fetchAdminJobOffers.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchAdminJobOffers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || null;
    });

    // Create
    builder.addCase(createJobOffer.pending, (state) => { state.mutationStatus = 'loading'; });
    builder.addCase(createJobOffer.fulfilled, (state, action) => {
      state.mutationStatus = 'succeeded';
      state.items.unshift(action.payload);
    });
    builder.addCase(createJobOffer.rejected, (state, action) => {
      state.mutationStatus = 'failed';
      state.mutationError = action.error.message || null;
    });

    // Delete
    builder.addCase(deleteJobOffer.pending, (state) => { state.mutationStatus = 'loading'; });
    builder.addCase(deleteJobOffer.fulfilled, (state, action) => {
      state.mutationStatus = 'succeeded';
      state.items = state.items.filter(item => item.id !== action.payload);
    });
    builder.addCase(deleteJobOffer.rejected, (state, action) => {
      state.mutationStatus = 'failed';
      state.mutationError = action.error.message || null;
    });
  }
});

export const { setJobOffers, resetJobOfferMutation } = jobOffersSlice.actions;
export default jobOffersSlice.reducer;