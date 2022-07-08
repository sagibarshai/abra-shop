import styled from "styled-components";
import ItemsList from "../Components/Items/ItemsList";
import { deviceSize } from "../constants";

type Props = {
  title: string;
};

const ItemsPage = ({ title }: Props) => {
  return (
    <StyledItemsPageWrapper>
      <StyledCategoryName>{title}</StyledCategoryName>
      <ItemsList title={title} />
    </StyledItemsPageWrapper>
  );
};

const StyledItemsPageWrapper = styled.div`
  padding: 64px 24px 0px 24px;
  overflow-y: auto;

  @media (max-width: ${deviceSize.mobile}) {
    padding: 36px 18px 0px 18px;
  }
`;

const StyledCategoryName = styled.h1`
  font-family: Assistant;
  font-size: 40px;
  font-weight: bold;
  color: #1a223e;
  margin-bottom: 40px;
  @media (max-width: ${deviceSize.mobile}) {
    margin-top: 4px;
    font-size: 24px;
    text-align: center;
    margin-bottom: 24px;
  }
`;
export default ItemsPage;
