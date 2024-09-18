import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from 'react-redux';
import {
  getConstructorState,
  orderBurger,
  clearConstructor
} from '../../services/slices/burgerConstructor';
import { AppDispatch } from 'src/services';
import { getUserState } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { constructorItems, orderRequest, orderModalData } =
    useSelector(getConstructorState);
  const { user } = useSelector(getUserState);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (user) {
      const bun = constructorItems.bun._id;
      dispatch(
        orderBurger([
          bun,
          ...constructorItems.ingredients.map((i) => i._id),
          bun
        ])
      );
      dispatch(clearConstructor());
    } else {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {
    dispatch(clearConstructor());
  };

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
