import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from 'react-redux';
import {
  constructorItemsState,
  orderModalState,
  orderBurger,
  clearConstructor,
  orderRequestState
} from '../../services/slices/burgerConstructor';
import { AppDispatch } from 'src/services';
import { getUserState } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const constructorItems = useSelector(constructorItemsState);
  const orderModalData = useSelector(orderModalState);
  const orderRequest = useSelector(orderRequestState);
  const { user } = useSelector(getUserState);
  const navigate = useNavigate();

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;
    if (user) {
      const bun = constructorItems.bun._id;
      await dispatch(
        orderBurger([
          bun,
          ...constructorItems.ingredients.map((i) => i._id),
          bun
        ])
      );
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
