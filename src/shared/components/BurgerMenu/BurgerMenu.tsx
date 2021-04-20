import React, { useState, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

type Item = {
  label: string;
  value: string;
};

type Props = {
  items: Item[];
  onSelectItem: (value: string) => void;
};

export const BurgerMenu = ({ items, onSelectItem }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorEl = useRef(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (value: string) => {
    onSelectItem(value);
    closeMenu();
  };

  return (
    <>
      <IconButton ref={anchorEl} onClick={toggleMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl.current}
        keepMounted
        open={isOpen}
        onClose={closeMenu}
      >
        {items.map((item) => (
          <MenuItem
            key={item.value}
            onClick={() => handleItemClick(item.value)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
