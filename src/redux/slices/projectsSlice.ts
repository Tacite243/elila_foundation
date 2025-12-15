import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Project, ProjectImage, ProjectStatus } from "@prisma/client";

// Types
export type ProjectWithImages = Project & { images: ProjectImage[] };

// Le type pour le formulaire, sans les champs auto-générés et avec des images structurées
export type ProjectFormData = {
  title: string;
  slug: string;
  description: string;
  status: ProjectStatus | string;
  // Le formulaire envoie des chaînes de caractères (venant de <input type="datetime-local">) ou null.
  startDate: string | null;
  endDate: string | null;
  images: { url: string; altText?: string }[];
};

interface ProjectsState {
  items: ProjectWithImages[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  mutationStatus: "idle" | "loading" | "succeeded" | "failed";
  mutationError: string | null;
}

const initialState: ProjectsState = {
  items: [],
  status: "idle",
  error: null,
  mutationStatus: "idle",
  mutationError: null,
};

// --- THUNKS ---
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await fetch("/api/projects");
    if (!response.ok) throw new Error("Échec de la récupération");
    return (await response.json()) as ProjectWithImages[];
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData: ProjectFormData) => {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) throw new Error("Échec de la création");
    return (await response.json()) as ProjectWithImages;
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: string) => {
    const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Échec de la suppression");
    return id;
  }
);

// AJOUTER CE THUNK MANQUANT : updateProject
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, data }: { id: string; data: ProjectFormData }) => {
    const response = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erreur lors de la mise à jour");
    return await response.json();
  }
);

// --- SLICE ---
const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<ProjectWithImages[]>) => {
      state.items = action.payload;
      state.status = "succeeded";
    },
    resetProjectMutation: (state) => {
      state.mutationStatus = "idle";
      state.mutationError = null;
    },
    resetMutationStatus: (state) => {
      state.mutationStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchProjects.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });

    // Create
    builder.addCase(createProject.pending, (state) => {
      state.mutationStatus = "loading";
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.mutationStatus = "succeeded";
      state.items.unshift(action.payload);
    });
    builder.addCase(createProject.rejected, (state, action) => {
      state.mutationStatus = "failed";
      state.mutationError = action.error.message || null;
    });

    // Delete
    builder.addCase(deleteProject.pending, (state) => {
      state.mutationStatus = "loading";
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.mutationStatus = "succeeded";
      state.items = state.items.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.mutationStatus = "failed";
      state.mutationError = action.error.message || null;
    });
    builder
      .addCase(updateProject.pending, (state) => {
        state.mutationStatus = "loading";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.error = action.error.message || "Erreur inconnue";
      });
  },
});

export const { setProjects, resetProjectMutation, resetMutationStatus } =
  projectsSlice.actions;
export default projectsSlice.reducer;
