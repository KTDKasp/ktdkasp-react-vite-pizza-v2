import { CartItem } from "../redux/cart/types";

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, item) => item.price * item.count + sum, 0);
};