import { Text } from 'react-native';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IPole, IRepair} from '../types/storeTypes'

interface PolesState {
  poles: IPole[];
}

const initialState: PolesState = {
  poles: [],
};

const polesSlice = createSlice({
  name: 'poles',
  initialState,
  reducers: {
    addPole: (state, action: PayloadAction<IPole>) => {
      state.poles.push(action.payload);
    },
    updatePole: (state, action: PayloadAction<IPole>) => {
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