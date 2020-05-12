import React from "react";
import styled from "styled-components";
import {
  purple,
  lightBlue,
  green,
  pink,
  indigo,
  deepOrange,
} from "@material-ui/core/colors";
import ButtonBase from "@material-ui/core/ButtonBase";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Box from "@material-ui/core/Box";

type Props = {
  words: string[];
  onChooseWord: (word: string) => void;
};

const colors = [lightBlue, purple, green, pink, deepOrange, indigo].map(
  (c) => c[100]
);
const colorsNum = colors.length;

export const WordsList = ({ words, onChooseWord }: Props) => {
  // const classes = useStyles();
  return (
    <GridList cols={3}>
      {words.map((word, index) => (
        <GridListTile key={word}>
          <Card
            display="flex"
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            bgcolor={colors[index % colorsNum]}
          >
            <Box
              p={3}
              display="flex"
              width="100%"
              component={ButtonBase}
              height="100%"
              onClick={() => {
                onChooseWord(word);
              }}
            >
              <Box
                fontSize="h4.fontSize"
                letterSpacing="0.005em"
                color="text.primary"
                component="span"
              >
                {word.toUpperCase()}
              </Box>
            </Box>
          </Card>
        </GridListTile>
      ))}
    </GridList>
  );
};

const Card = styled(Box)`
  position: relative;

  &::before {
    content: "";

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background-color: rgba(255, 255, 255, 0.2);
    opacity: 0;

    transition: opacity 0.3s;

    pointer-events: none;
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }
`;
