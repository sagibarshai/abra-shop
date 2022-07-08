import styled from "styled-components";
import * as ReactDOM from "react-dom";
type Props = {
  children: JSX.Element|JSX.Element[]
}
const Drawer = (props:Props) => {
  return ReactDOM.createPortal(
    <StyledPageWrapper>
      <StyledDrawerWrapper>
        {props.children}
      </StyledDrawerWrapper>
    </StyledPageWrapper>,
    document.body
  );
};

const StyledPageWrapper = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;

`;
const StyledDrawerWrapper = styled.div`
  position: absolute;
  top: 0px;
  width: 76.2%;
  height: 100%;
  background-color: #fff;
  z-index: 10;
`;
export default Drawer;
