import { FC, useMemo } from 'react';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const ingredients = useSelector(getIngredients);

  // Временная заглушка для конструктора
  const bun = ingredients.find((ingredient) => ingredient.type === 'bun');
  const otherIngredients = ingredients.filter(
    (ingredient) => ingredient.type !== 'bun'
  );

  const constructorItems = {
    bun: bun ? { ...bun, price: bun.price } : null,
    ingredients: otherIngredients.map((ing) => ({ ...ing, id: ing._id }))
  };

  const orderRequest = false;
  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };

  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
