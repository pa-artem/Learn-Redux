import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

function timeout(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export const changeByAmountAsync = createAsyncThunk('change-by-amount-async', async () => {
  await timeout(500);
  return 42;
});

const slice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    loading: false,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(changeByAmountAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeByAmountAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.value += action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = slice.actions;

export default slice.reducer;
