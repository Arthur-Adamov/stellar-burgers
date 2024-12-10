import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  getBun,
  getOtherIngredients,
  clearBurgerConstructor
} from '../../services/slices/constructorSlice/constructorSlice';
import {
  orderRequestSelector,
  sendUserOrder,
  getUserOrderSelector
} from '../../services/slices/userOrdersSlice/userOrdersSlice';
import { isAuthenticatedSelector } from '../../services/slices/userSlice/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = {
    bun: useSelector(getBun),
    ingredients: useSelector(getOtherIngredients)
  };

  const orderRequest = useSelector(orderRequestSelector);

  const orderModalData = useSelector(getUserOrderSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (isAuthenticated) {
      const orderData = [
        constructorItems.bun?._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id)
      ];
      dispatch(sendUserOrder(orderData));
    } else {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {
    dispatch(clearBurgerConstructor());
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

  // return null;

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
