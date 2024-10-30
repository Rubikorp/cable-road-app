import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Repair {
  id: string;
  description: string;
  photos: string[];
}

interface Pole {
  id: string;
  number: string;
  repairs: Repair[];
  photos: string[];
}

interface PolesState {
  poles: Pole[];
}

const initialState: PolesState = {
  poles: [],
};

const polesSlice = createSlice({
  name: 'poles',
  initialState,
  reducers: {
    addPole: (state, action: PayloadAction<Pole>) => {
      state.poles.push(action.payload);
    },
    updatePole: (state, action: PayloadAction<Pole>) => {
      const index = state.poles.findIndex((pole) => pole.id === action.payload.id);
      if (index !== -1) {
        state.poles[index] = action.payload;
      }
    },
    deletePole: (state, action: PayloadAction<string>) => {
      // Удаляем полюс по его ID
      state.poles = state.poles.filter((pole) => pole.id !== action.payload);
    },
   },
});

export const { addPole, updatePole,deletePole } = polesSlice.actions;
export default polesSlice.reducer;