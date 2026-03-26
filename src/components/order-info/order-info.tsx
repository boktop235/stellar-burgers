import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrderByNumber,
  getSelectedOrder,
  getFeedLoading
} from '../../services/slices/feedSlice';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { TIngredient } from '../../utils/types';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';

type TIngredientsWithCount = {
  [key: string]: TIngredient & { count: number };
};

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();
  const selectedOrder = useSelector(getSelectedOrder);
  const loading = useSelector(getFeedLoading);
  const ingredients = useSelector(getIngredients);

  useEffect(() => {
    if (number) {
      dispatch(getOrderByNumber(Number(number)));
    }
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!selectedOrder || !ingredients.length) return null;

    const date = new Date(selectedOrder.createdAt);

    const ingredientsInfo = selectedOrder.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          if (!acc[item]) {
            acc[item] = { ...ingredient, count: 1 };
          } else {
            acc[item].count++;
          }
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc: number, item: TIngredient & { count: number }) =>
        acc + item.price * item.count,
      0
    );

    return {
      ...selectedOrder,
      ingredientsInfo,
      date,
      total
    };
  }, [selectedOrder, ingredients]);

  if (loading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
