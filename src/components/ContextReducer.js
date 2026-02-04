import React, { useReducer, useContext, createContext } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {

    // ➕ ADD ITEM (normal OR custom)
    case "ADD":
      return [...state, action.item];

    // ➖ REMOVE ITEM
    case "REMOVE":
      return state.filter((_, index) => index !== action.index);

    // 🗑️ CLEAR CART
    case "DROP":
      return [];

    // 🔄 UPDATE QTY (same item + same size)
    case "UPDATE":
      return state.map((food) =>
        food.id === action.id && food.size === action.size
          ? {
              ...food,
              qty: food.qty + action.qty,
              price: food.price + action.price
            }
          : food
      );

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
