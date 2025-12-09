import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Le type pour une erreur de validation Zod simplifiée
type ZodErrorPayload = {
    errors: {
        fieldErrors: Record<string, string[] | undefined>;
    }
}
// Le type pour une erreur générique
type MessageErrorPayload = {
    message: string;
}

// Le type pour un utilisateur tel que l'API le renvoie (sans mdp)
type UserData = {
    id: string;
    name: string | null;
    email: string;
    createdAt: string; // JSON convertit les dates en string
}

// Le type pour les données du formulaire de création
type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
}

interface UsersState {
    items: UserData[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: ZodErrorPayload | MessageErrorPayload | null;
}

const initialState: UsersState = {
    items: [],
    status: 'idle',
    error: null,
};

// Thunks
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch('/api/users');
    if (!response.ok) throw new Error("Échec du chargement des utilisateurs.");
    return (await response.json()) as UserData[];
});

export const createUser = createAsyncThunk(
    'users/createUser',
    async (userData: CreateUserFormData, { rejectWithValue }) => {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) {
            return rejectWithValue(data);
        }
        return data as UserData;
    }
);

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string, { rejectWithValue }) => {
    const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.message || "Échec de la suppression.");
    }
    return id;
});

// Slice
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch
        builder.addCase(fetchUsers.pending, (state) => { state.status = 'loading'; });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state) => { state.status = 'failed'; });

        // Create
        builder.addCase(createUser.pending, (state) => { state.error = null; });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.items.push(action.payload);
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.payload as ZodErrorPayload;
        });

        // Delete
        builder.addCase(deleteUser.pending, (state) => { state.error = null; });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.items = state.items.filter(user => user.id !== action.payload);
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.error = { message: action.payload as string };
        });
    }
});

export default usersSlice.reducer;