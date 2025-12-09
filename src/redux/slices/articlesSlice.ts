import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Article, Category } from "@prisma/client";
import axios from 'axios';

// Rappel des types pour la sérialisation (que nous avons définis avant)
type Serializable<T> = {
    [P in keyof T]: T[P] extends Date ? string : T[P];
};

type SerializableArticle = Serializable<Article>;
type SerializableCategory = Serializable<Category>;

// On définit le type exact de ce que l'on reçoit du backend
export type ArticleWithRelations = SerializableArticle & {
    category: SerializableCategory;
    // On dit à TypeScript que l'auteur n'est qu'un objet partiel
    // avec seulement un 'id' et un 'name'.
    author: {
        id: string;
        name: string | null;
    };
};

// pour les articles publics (plus léger)
export type PublicArticle = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    readTime: string;
    createdAt: string; // Garder en string pour la simplicité côté client
    category: { name: string };
    content: string;
    author: { name: string | null };
};

type ZodValidationError = {
    errors: {
        fieldErrors: {
            [key: string]: string[] | undefined;
        };
    };
};

// Type pour une erreur générique avec juste un message
type GenericApiError = {
    message: string;
};

// Le type pour les données de création/mise à jour
export type ArticleFormData = Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'authorId'>;

interface ArticlesState {
    items: ArticleWithRelations[];
    publicItems: PublicArticle[]
    currentPublicArticle: PublicArticle | null;
    // Statut pour le chargement de la liste
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    publicStatus: 'idle' | 'loading' | 'succeeded' | 'failed'; // Statut pour le public
    error: string | null;
    // Statut pour les actions individuelles (create, update, delete)
    mutationStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    mutationError: ZodValidationError | GenericApiError | null;
};

const initialState: ArticlesState = {
    items: [],
    publicItems: [],
    currentPublicArticle: null,
    status: 'idle',
    publicStatus: 'idle',
    error: null,
    mutationStatus: 'idle',
    mutationError: null,
};



// --- THUNKS ASYNCHRONES ---

// --- Thunks Publics ---
export const fetchPublicArticles = createAsyncThunk('articles/fetchPublicArticles', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/articles/public');
        return response.data as PublicArticle[];
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: 'Une erreur inconnue est survenue' });
    }

});

export const fetchPublicArticleBySlug = createAsyncThunk('articles/fetchPublicArticleBySlug', async (slug: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/articles/public/${slug}`);
        return response.data as PublicArticle;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: 'Une erreur inconnue est survenue' });
    }
});

// --- Thunks Admin ---
export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/articles');
        return response.data as ArticleWithRelations[];
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: 'Une erreur inconnue est survenue' });
    }
});

export const createArticle = createAsyncThunk('articles/createArticle', async (articleData: ArticleFormData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/articles', articleData);
        return response.data as ArticleWithRelations;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: 'Une erreur inconnue est survenue' });
    }
});

export const updateArticle = createAsyncThunk('articles/updateArticle', async ({ id, data }: { id: string, data: Partial<ArticleFormData> }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/articles/${id}`, data);
        return response.data as ArticleWithRelations;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: 'Une erreur inconnue est survenue' });
    }
});

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (id: string, { rejectWithValue }) => {
    try {
        await axios.delete(`/api/articles/${id}`);
        return id;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: 'Une erreur inconnue est survenue' });
    }
});


// --- LE SLICE ---

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        // Action pour initialiser le store avec les données du serveur
        setArticles: (state, action: PayloadAction<ArticleWithRelations[]>) => {
            state.items = action.payload;
            state.status = 'succeeded';
        },
        // Pour réinitialiser le statut d'une mutation (après affichage d'un succès/erreur)
        resetMutationStatus: (state) => {
            state.mutationStatus = 'idle';
            state.mutationError = null;
        }
    },
    extraReducers: (builder) => {
        // Fetch
        builder.addCase(fetchArticles.pending, (state) => { state.status = 'loading'; });
        builder.addCase(fetchArticles.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        });
        builder.addCase(fetchArticles.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || null;
        });

        builder.addCase(fetchPublicArticles.pending, (state) => {
            state.publicStatus = 'loading';
        })
        builder.addCase(fetchPublicArticles.fulfilled, (state, action: PayloadAction<PublicArticle[]>) => {
            state.publicStatus = 'succeeded';
            state.publicItems = action.payload;
        })
        builder.addCase(fetchPublicArticles.rejected, (state) => {
            state.publicStatus = 'failed';
        });

        builder
            .addCase(fetchPublicArticleBySlug.pending, (state) => {
                state.publicStatus = 'loading';
            })
            .addCase(fetchPublicArticleBySlug.fulfilled, (state, action: PayloadAction<PublicArticle>) => {
                state.publicStatus = 'succeeded';
                state.currentPublicArticle = action.payload;
            })
            .addCase(fetchPublicArticleBySlug.rejected, (state) => {
                state.publicStatus = 'failed';
                state.currentPublicArticle = null;
            });


        // Create
        builder.addCase(createArticle.pending, (state) => {
            state.mutationStatus = 'loading';
            state.mutationError = null;
        });
        builder.addCase(createArticle.fulfilled, (state, action) => {
            state.mutationStatus = 'succeeded';
            state.items.unshift(action.payload); // Ajoute le nouvel article au début de la liste
        });
        builder.addCase(createArticle.rejected, (state, action) => {
            state.mutationStatus = 'failed';
            state.mutationError = action.payload as ZodValidationError | GenericApiError;
        });

        // Update
        builder.addCase(updateArticle.pending, (state) => {
            state.mutationStatus = 'loading';
            state.mutationError = null;
        });
        builder.addCase(updateArticle.fulfilled, (state, action) => {
            state.mutationStatus = 'succeeded';
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        });
        builder.addCase(updateArticle.rejected, (state, action) => {
            state.mutationStatus = 'failed';
            state.mutationError = action.payload as ZodValidationError | GenericApiError;
        });

        // Delete
        builder.addCase(deleteArticle.pending, (state) => {
            state.mutationStatus = 'loading';
            state.mutationError = null;
        });
        builder.addCase(deleteArticle.fulfilled, (state, action) => {
            state.mutationStatus = 'succeeded';
            // action.payload est l'ID renvoyé par le thunk
            state.items = state.items.filter(item => item.id !== action.payload);
        });
        builder.addCase(deleteArticle.rejected, (state, action) => {
            state.mutationStatus = 'failed';
            state.mutationError = action.payload as ZodValidationError | GenericApiError;
        });
    }
});

export const { setArticles, resetMutationStatus } = articlesSlice.actions;
export default articlesSlice.reducer;