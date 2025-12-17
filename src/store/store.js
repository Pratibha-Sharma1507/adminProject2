import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import votersReducer from '../features/voters/votersSlice';
import volunteersReducer from '../features/volunteers/volunteersSlice';
import campaignsReducer from '../features/campaigns/campaignsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    voters: votersReducer,
    volunteers: volunteersReducer,
    campaigns: campaignsReducer
  }
});


