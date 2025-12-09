import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Définir les types pour notre état
type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
}

// L'état initial, 'system' est un excellent choix par défaut
const initialState: ThemeState = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Notre action pour changer le thème
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

// Exporter l'action pour l'utiliser dans nos composants
export const { setTheme } = themeSlice.actions;

// Exporter un "selector" pour lire facilement l'état du thème depuis le store
export const selectCurrentTheme = (state: RootState) => state.theme.theme;

// Exporter le reducer pour l'ajouter au store principal
export default themeSlice.reducer;