import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import { RootState } from '../store';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  selectedOrder: TOrder | null;
  loading: boolean;
  error: string | null | undefined;
};

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  selectedOrder: null,
  loading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk<
  { orders: TOrder[]; total: number; totalToday: number },
  void,
  { rejectValue: string }
>('feeds/getFeeds', async (_, { rejectWithValue }) => {
  try {
    const feeds = await getFeedsApi();
    return feeds;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    throw new Error('Неизвестная ошибка получения данных заказов');
  }
});

export const getOrderByNumber = createAsyncThunk<
  { orders: TOrder[] },
  number,
  { rejectValue: string }
>('feeds/getOrderByNumber', async (num, { rejectWithValue }) => {
  try {
    const selectedOrder = await getOrderByNumberApi(num);
    return selectedOrder;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    throw new Error('Неизвестная ошибка получения данных по номеру заказа');
  }
});

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    clearSelectedOrder(state) {
      state.selectedOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message;
      });
  }
});

// Селекторы
export const getFeedOrders = (state: RootState) => state.feeds.orders;
export const getFeedTotal = (state: RootState) => state.feeds.total;
export const getFeedTotalToday = (state: RootState) => state.feeds.totalToday;
export const getSelectedOrder = (state: RootState) => state.feeds.selectedOrder;
export const getFeedLoading = (state: RootState) => state.feeds.loading;

// Алиасы для удобства
export const getFeeds = getFeedOrders;
export const getLoading = getFeedLoading;

export default feedSlice.reducer;
