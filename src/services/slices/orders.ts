import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import { RootState } from '../store';

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res.order as unknown as TOrder;
  }
);

type TOrdersState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: TOrdersState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
        state.orderModalData = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка создания заказа';
        state.orderModalData = null;
      });
  }
});

export const { clearOrderModal } = ordersSlice.actions;

export const getOrderRequest = (state: RootState) => state.orders.orderRequest;
export const getOrderModalData = (state: RootState) =>
  state.orders.orderModalData;

export default ordersSlice.reducer;
