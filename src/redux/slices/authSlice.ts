import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signIn } from 'next-auth/react';

// Le type des identifiants que nous enverrons
interface LoginCredentials {
    email: string;
    password: string;
}

// L'état initial de notre slice
interface AuthState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    status: 'idle',
    error: null,
};

// Création de l'action asynchrone (Thunk) pour la connexion
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            // On utilise la fonction signIn de NextAuth, c'est la méthode recommandée !
            // `redirect: false` est crucial pour gérer la réponse ici au lieu d'une redirection de page.
            const result = await signIn('credentials', {
                ...credentials,
                redirect: false,
            });

            if (result?.error) {
                // Si NextAuth renvoie une erreur (ex: identifiants incorrects), on la rejette.
                throw new Error(result.error);
            }

            if (!result?.ok) {
                throw new Error("La connexion a échoué. Veuillez réessayer.");
            }

            // Si tout va bien, le `useSession` hook de NextAuth se mettra à jour automatiquement.
            return { success: true };

        } catch (error: unknown) {
            // On utilise rejectWithValue pour passer le message d'erreur au reducer
            if (error instanceof Error){
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue("Une erreur inconue est survenue.");
            }
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Permet de réinitialiser l'état (ex: en fermant le modal)
        resetAuthState: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;