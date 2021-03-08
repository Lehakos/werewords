import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { useStore } from "effector-react";

import { AddPlayers } from "screens/AddPlayers";
import { ShowRoles } from "screens/ShowRoles";
import { ShowWord } from "screens/ShowWord";
import { ChooseWord } from "screens/ChooseWord";
import { GameBoard } from "screens/GameBoard";
import { ScreensEnum, $currentScreenIndex } from "model/routing";

function App() {
  const currentScreen = useStore($currentScreenIndex);
  const isAddPlayers =
    currentScreen === ScreensEnum.addPlayers ||
    currentScreen === ScreensEnum.showRoles;
  const isChooseWord = currentScreen === ScreensEnum.chooseWord;

  return (
    <Container>
      <Box my={4}>
        {isAddPlayers && <AddPlayers />}
        {isChooseWord && <ChooseWord />}
        {!isAddPlayers && !isChooseWord && <GameBoard />}
        {currentScreen === ScreensEnum.showRoles && <ShowRoles />}
        {currentScreen === ScreensEnum.showWord && <ShowWord />}
      </Box>
    </Container>
  );
}

export default App;
