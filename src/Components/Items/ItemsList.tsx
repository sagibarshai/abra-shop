import styled from "styled-components";
import ItemCard from "./ItemCard";
import { deviceSize } from "../../constants";
import { StoreContext } from "../../Services/StoreProvider";
import { useContext } from "react";

type Props = {
  title:string
}
type Item = {
  catagories?:string[] | undefined,
  id?:number,
  image?:string,
  name?:string,
  price?:number,
  quantity?:number
}
type Store = {
  storeItems: Item[] | [] ,
  addItemToCart: (item:Item) => void,
}

const ItemsList = ({title}:Props) => {
  const store = useContext(StoreContext);
  const { storeItems, addItemToCart } = store as Store
  let filteredItmes  = [] as Item[] 
  storeItems.map((item:Item) => {
    const catagorie:string|undefined  = item.catagories.find(type => {
      if(title === 'BestSellers')  title = 'best-seller'
      return type === title.toLowerCase()})
    if(catagorie) filteredItmes.push(item)
  })
  return (
    <ItemsListWrapper>
      { filteredItmes.map((item) => (
        <ItemCard
          key={item.id}
          image={item.image}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          onAddToBag={() => addItemToCart(item)}
        />
      ))}
    </ItemsListWrapper>
  );
};

const ItemsListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 48px 24px;
  flex-wrap: wrap;
  margin-bottom: 117px;
  @media (max-width: ${deviceSize.mobile}) {
    gap: 20px 18px;
    margin-bottom: 89px;
  }
`;

export default ItemsList;
