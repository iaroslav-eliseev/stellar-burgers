import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIngredientState } from '../../services/slices/burgerIngredients';
import { TIngredient } from '../../utils/types';

export const IngredientDetails: FC = () => {
  const id = useParams();

  const { ingredients } = useSelector(getIngredientState);

  const ingredientData = ingredients.find(
    (ingredient: TIngredient) => ingredient._id === id?.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
