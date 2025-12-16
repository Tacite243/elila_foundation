import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { z } from 'zod';
import { createJobApplicationSchema } from '@/schemas/jobApplication.schema';



type ApplicationFormData = z.infer<typeof createJobApplicationSchema>;

interface JobApplicationState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    successMessage: string | null;
}

const initialState: JobApplicationState = {
    status: 'idle',
    error: null,
    successMessage: null,
};

export const submitApplication = createAsyncThunk(
    'jobApplication/submit',
    async ({ jobOfferId, formData }: { jobOfferId: string; formData: ApplicationFormData }) => {
        const response = await fetch(`/api/jobs/${jobOfferId}/apply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Échec de la soumission");
        return data;
    }
);

const jobApplicationSlice = createSlice({
    name: 'jobApplication',
    initialState,
    reducers: {
        resetApplicationState: (state) => {
            state.status = 'idle';
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(submitApplication.pending, (state) => {
            state.status = 'loading';
            state.error = null;
            state.successMessage = null;
        });
        builder.addCase(submitApplication.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.successMessage = action.payload.message;
        });
        builder.addCase(submitApplication.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || null;
        });
    }
});

export const { resetApplicationState } = jobApplicationSlice.actions;
export default jobApplicationSlice.reducer;