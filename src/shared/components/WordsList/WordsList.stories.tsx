import React from "react";
import Container from "@material-ui/core/Container";

import { WordsList } from "./WordsList";

export default {
  title: "WordsList",
  decorators: [(storyFn: any) => <Container>{storyFn()}</Container>],
};

export const basic = () => (
  <WordsList
    words={["Школа", "Крокодил", "Слон", "Отвертка", "Самолет", "Капуста"]}
    onChooseWord={() => {}}
  />
);
