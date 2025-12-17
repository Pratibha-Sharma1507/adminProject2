import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 'v1',
      name: 'Ramesh Kumar',
      age: 42,
      gender: 'Male',
      booth: 'Ward 7 - Booth 23',
      phone: '+91 98765 00001',
      priority: 'High'
    },
    {
      id: 'v2',
      name: 'Aisha Khan',
      age: 31,
      gender: 'Female',
      booth: 'Ward 9 - Booth 11',
      phone: '+91 98765 00002',
      priority: 'Medium'
    },
    {
      id: 'v3',
      name: 'Sanjay Patel',
      age: 55,
      gender: 'Male',
      booth: 'Ward 12 - Booth 04',
      phone: '+91 98765 00003',
      priority: 'Low'
    }
  ]
};

const votersSlice = createSlice({
  name: 'voters',
  initialState,
  reducers: {
    addVoter: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(voter) {
        return { payload: { ...voter, id: nanoid() } };
      }
    },
    updateVoter(state, action) {
      const { id, updates } = action.payload;
      const index = state.items.findIndex((v) => v.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates };
      }
    },
    deleteVoter(state, action) {
      state.items = state.items.filter((v) => v.id !== action.payload);
    }
  }
});

export const { addVoter, updateVoter, deleteVoter } = votersSlice.actions;

export default votersSlice.reducer;


