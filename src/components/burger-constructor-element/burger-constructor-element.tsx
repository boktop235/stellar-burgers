import { FC, memo } from 'react';
import { useDispatch } from '../../services/store';
import {
  removeIngredient,
  changeIngredientsOrder
} from '../../services/slices/burger-constructor';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(changeIngredientsOrder({ from: index, to: index - 1 }));
      }
    };

    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        dispatch(changeIngredientsOrder({ from: index, to: index + 1 }));
      }
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
