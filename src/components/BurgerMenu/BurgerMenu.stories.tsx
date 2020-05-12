import React from "react";

import { BurgerMenu } from "./BurgerMenu";

export default {
  title: "BurgerMenu",
};

export const basic = () => (
  <BurgerMenu
    items={[
      { label: "One", value: "a" },
      { label: "Two", value: "b" },
      { label: "Three", value: "c" },
    ]}
    onSelectItem={() => {}}
  />
);
