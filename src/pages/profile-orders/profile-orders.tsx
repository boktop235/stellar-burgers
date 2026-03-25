import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';
import { Preloader } from '@ui';

export const ProfileOrders = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const data = await getOrdersApi();
          setOrders(data);
        } catch (err) {
          console.error('Ошибка загрузки заказов:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
