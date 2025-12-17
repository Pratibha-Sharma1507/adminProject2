import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 'vol1',
      name: 'Priya Sharma',
      phone: '+91 90000 11111',
      ward: 'Ward 7',
      role: 'Booth Captain',
      status: 'Active'
    },
    {
      id: 'vol2',
      name: 'Imran Ali',
      phone: '+91 90000 11112',
      ward: 'Ward 9',
      role: 'Social Media',
      status: 'On Duty'
    },
    {
      id: 'vol3',
      name: 'Meera Nair',
      phone: '+91 90000 11113',
      ward: 'Ward 12',
      role: 'Door-to-door',
      status: 'Inactive'
    }
  ]
};

const volunteersSlice = createSlice({
  name: 'volunteers',
  initialState,
  reducers: {
    addVolunteer: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(volunteer) {
        return { payload: { ...volunteer, id: nanoid() } };
      }
    },
    updateVolunteer(state, action) {
      const { id, updates } = action.payload;
      const index = state.items.findIndex((v) => v.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates };
      }
    },
    deleteVolunteer(state, action) {
      state.items = state.items.filter((v) => v.id !== action.payload);
    }
  }
});

export const { addVolunteer, updateVolunteer, deleteVolunteer } = volunteersSlice.actions;

export default volunteersSlice.reducer;


