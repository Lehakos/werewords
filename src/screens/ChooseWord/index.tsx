import React, { useRef } from "react";

import { getRandomElements } from "libs/getRandomElements";
import { WordsList } from "components/WordsList";
import { WORDS_FOR_CHOOSING } from "shared/config";

import { onChooseWord } from "./model";
import dictionary from "./words.json";

export const ChooseWord = () => {
  const words = useRef(getRandomElements(dictionary, WORDS_FOR_CHOOSING));

  return <WordsList words={words.current} onChooseWord={onChooseWord} />;
};
