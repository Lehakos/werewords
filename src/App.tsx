import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { useStore } from "effector-react";

import { AddPlayers } from "screens/AddPlayers";
import { ShowRoles } from "screens/ShowRoles";
import { ShowWord } from "screens/ShowWord";
import { ChooseWord } from "screens/ChooseWord";
import { GameBoard } from "screens/GameBoard";
import { screenNames, $currentScreen } from "model/routing";

function App() {
  const currentScreen = useStore($currentScreen);
  const isAddPlayers =
    currentScreen === screenNames.addPlayers ||
    currentScreen === screenNames.showRoles;
  const isChooseWord = currentScreen === screenNames.chooseWord;

  return (
    <Container>
      <Box my={4}>
        {isAddPlayers && <AddPlayers />}
        {isChooseWord && <ChooseWord />}
        {!isAddPlayers && !isChooseWord && <GameBoard />}
        {currentScreen === screenNames.showRoles && <ShowRoles />}
        {currentScreen === screenNames.showWord && <ShowWord />}
      </Box>
    </Container>
  );
}

export default App;
