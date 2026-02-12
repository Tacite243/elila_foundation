import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import articlesReducer from './slices/articlesSlice';
import eventsReducer from './slices/eventsSlice';
import usersReducer from './slices/usersSlice'
import projectsReducer from './slices/projectsSlice';
import jobOffersReducer from './slices/jobOffersSlice';
import jobApplicationReducer from './slices/jobApplicationSlice';
import impactStatsReducer from './slices/impactStatsSlice';
import progamsReducer from './slices/programsSlice';
import themeReducer from './slices/themeSlice';


export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            articles: articlesReducer,
            events: eventsReducer,
            users: usersReducer,
            projects: projectsReducer,
            jobOffers: jobOffersReducer,
            jobApplication: jobApplicationReducer,
            impactStats: impactStatsReducer,
            programs: progamsReducer,
            theme: themeReducer,
        },
    });
}

// Exporter ces types est une bonne pratique pour l'utilisation avec TypeScript
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];