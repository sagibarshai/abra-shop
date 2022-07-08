import { useState } from "react";
import styled from "styled-components";
import { useMedia } from "../../../Hooks/useMedia";
import menuImage from "../../../Images/menu.png";
import Drawer from "../Drawer";
import DrawerMenu from "./DrawerMenu";
import { BrowserRouter, NavLink } from "react-router-dom";
 
type Item = {
  catagories?:string[] | undefined,
  id?:number,
  image?:string,
  name?:string,
  price?:number,
  quantity?:number,
}

type Props = {
  menuItems:Item[] | [],
  className:string,
  onMenuItemChanged:(item:Item) => void,
  setTitle:(title:string) => void,
  humburgerResolution:number,
  
} 

const Menu = ({
  menuItems,
  className,
  onMenuItemChanged,
  humburgerResolution = 880,
  setTitle,
  
}:Props) => {
  const breakPoints = [
    { min: 0, max: humburgerResolution, name: "mobile" },
    { min: humburgerResolution + 1, max: 10000, name: "desktop" },
  ];

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const breakPoint = useMedia(breakPoints);
  return (
    <BrowserRouter>
      <MenuWrapper className={className}>
        {breakPoint?.name === "mobile" && (
          <>
            <Hamburger
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              src={menuImage}
              alt="Burger menu"
            ></Hamburger>
            {isDrawerOpen && (
              <Drawer>
                <DrawerMenu
                  menuItems={menuItems}
                  onClose={() => setIsDrawerOpen(false)}
                  setTitle={setTitle}
                />
              </Drawer>
            )}
          </>
        )}
        {breakPoint?.name === "desktop" &&
          menuItems.map((item) => {
            return (
              <NavLink to={`/${item.name}`}
                key={item.id}
                onClick={() => {
                  onMenuItemChanged(item)
                  setTitle(item.name)
                }}
                style={({isActive}) => ({
                  fontSize: '20px',
                  textDecoration: 'none',
                  borderBottom: isActive ? '1px solid white' : 'none',
                  fontWeight: isActive ?  "600" : 'normal',
                  paddingBottom:isActive ? '15px' : '0',
                  color:'white',
                })}
                >
                {item.name}
              </NavLink>
               
            );
          })}
      </MenuWrapper>
    </BrowserRouter>
  );
};
type StyleProps = {
  active:boolean
}
const MenuItem = styled.a`
  font-size: 20px;
  font-weight: ${(props:StyleProps) => (props.active ? "600" : "normal")};
  text-decoration: none;
  ${(props) =>
    props.active &&
    `
    border-bottom: 2px solid #fff;
    `}
  color: #fff;
`;
const MenuWrapper = styled.nav`
  font-family: Assistant;
  display: flex;
  gap: 26px;
`;

const Hamburger = styled.img`
  cursor: pointer;
`;

export default Menu;
