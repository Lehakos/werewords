import React, { useRef } from "react";

import { getRandomElements } from "shared/libs/getRandomElements";
import { WordsList } from "shared/components/WordsList";
import { WORDS_FOR_CHOOSING } from "shared/constants/config";
import { setWord } from "model/game";
import { nextScreen } from "model/routing";
import { useAppDispatch } from "shared/app-state";

import dictionary from "./words.json";

export const ChooseWord = () => {
  const dispatch = useAppDispatch();
  const words = useRef(getRandomElements(dictionary, WORDS_FOR_CHOOSING));

  return (
    <WordsList
      words={words.current}
      onChooseWord={(word) => {
        dispatch(setWord(word));
        dispatch(nextScreen());
      }}
    />
  );
};
