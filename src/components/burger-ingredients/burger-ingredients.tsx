import { useState, useRef, useEffect, FC, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector(getIngredients);
  const bun = useSelector((state) => state.burgerConstructor.bun);
  const constructorIngredients = useSelector(
    (state) => state.burgerConstructor.ingredients
  );

  const getCount = useMemo(
    () => (id: string) => {
      if (bun && bun._id === id) return 2;
      return constructorIngredients.filter((item) => item._id === id).length;
    },
    [bun, constructorIngredients]
  );

  const buns = useMemo(
    () =>
      ingredients
        .filter((ingredient) => ingredient.type === 'bun')
        .map((ingredient) => ({
          ...ingredient,
          count: getCount(ingredient._id)
        })),
    [ingredients, getCount]
  );

  const mains = useMemo(
    () =>
      ingredients
        .filter((ingredient) => ingredient.type === 'main')
        .map((ingredient) => ({
          ...ingredient,
          count: getCount(ingredient._id)
        })),
    [ingredients, getCount]
  );

  const sauces = useMemo(
    () =>
      ingredients
        .filter((ingredient) => ingredient.type === 'sauce')
        .map((ingredient) => ({
          ...ingredient,
          count: getCount(ingredient._id)
        })),
    [ingredients, getCount]
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewFilling] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
