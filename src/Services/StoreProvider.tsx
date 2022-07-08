import { createContext, useState, useEffect, useMemo } from "react";
import { SERVER_URL, ITEMS_ENDPOINT } from "../constants";

type Value = {
  cart?: Item[];
  addItemToCart?: (item: Item) => void;
  removeItemFromCart?: (item: Item) => void;
  storeItems?: Item[];
  checkout?: () => Item | void;
};
type Props = {
  children: JSX.Element | JSX.Element[];
};
type Item = {
  catagories?: string[];
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
};

export const StoreContext = createContext<Value | [] | undefined>([]);
export const StoreProvider = (props: Props) => {
  const [items, setItems] = useState<Item[]>([]);
  const [cart, setCart] = useState<Item[]>([]);

  const setStoreItems = async () => {
    try {
      const response = await fetch(SERVER_URL + "/" + ITEMS_ENDPOINT);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addItemToCart = (item: Item) => {
    const storeItem: Item | undefined = items.find(
      (element) => element.id === item.id
    );

    const cartItem: Item | undefined = cart.find(
      (element) => element.id === item.id
    );

    if (storeItem?.quantity === 0) return;
    if (cartItem) {
      if (storeItem?.quantity === cartItem.quantity) return;

      cartItem.quantity++;
      setCart([...cart]);
    } else {
      const newCartItem = {
        name: item.name,
        id: item.id,
        price: item.price,
        image: item.image,
        quantity: 1,
      };

      setCart([...cart, newCartItem]);
    }
  };

  const removeItemFromCart = (item: Item, forceDelete = false) => {
    const cartItem = cart.find((element) => element.id === item.id);

    if (!cartItem) return;

    cartItem.quantity--;
    if (cartItem.quantity <= 0 || forceDelete) {
      const updatedCart = cart.filter((element) => element.id !== item.id);
      setCart(updatedCart);
    } else {
      setCart([...cart]);
    }
  };

  const storeItems = useMemo<Item[] | []>(() => {
    return items.map((item) => {
      const newItem = { ...item };
      const cartItem = cart.find((element) => element.id === newItem.id);

      if (cartItem) {
        newItem.quantity -= cartItem.quantity;
      }

      return newItem;
    });
  }, [items, cart]);
  const checkout = () => {
    const newItems = items.map((item) => {
      const cartItem = cart.find((element) => element.id === item.id);
      const newItem = { ...item };
      if (cartItem) {
        newItem.quantity -= cartItem.quantity;
      }

      return newItem;
    });

    setItems(newItems);
    setCart([]);
  };

  useEffect(() => {
    setStoreItems();
  }, []);

  const value: Value = {
    cart,
    addItemToCart,
    removeItemFromCart,
    storeItems,
    checkout,
  };
  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
};
