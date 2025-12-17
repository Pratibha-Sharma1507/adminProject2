import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 'c1',
      title: 'Youth Townhall',
      type: 'Townhall',
      ward: 'Ward 9',
      date: '2025-12-20',
      status: 'Scheduled'
    },
    {
      id: 'c2',
      title: 'Door-to-door Blitz',
      type: 'Door-to-door',
      ward: 'Ward 7',
      date: '2025-12-19',
      status: 'Ongoing'
    },
    {
      id: 'c3',
      title: 'Women Safety March',
      type: 'Rally',
      ward: 'Ward 12',
      date: '2025-12-21',
      status: 'Planned'
    }
  ]
};

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    addCampaign: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(campaign) {
        return { payload: { ...campaign, id: nanoid() } };
      }
    },
    updateCampaign(state, action) {
      const { id, updates } = action.payload;
      const index = state.items.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates };
      }
    },
    deleteCampaign(state, action) {
      state.items = state.items.filter((c) => c.id !== action.payload);
    }
  }
});

export const { addCampaign, updateCampaign, deleteCampaign } = campaignsSlice.actions;

export default campaignsSlice.reducer;


