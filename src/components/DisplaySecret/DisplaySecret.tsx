import React, { FC, ReactNode, useEffect, useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import { Countdown } from "components/Countdown";

type Props = {
  onHideSecret: () => void;
  title?: ReactNode;
};

export const DisplaySecret: FC<Props> = ({ title, onHideSecret, children }) => {
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);

  const handleChangeState = useCallback(() => {
    if (!isSecretVisible) {
      setIsCountdownVisible(true);
    } else {
      setIsSecretVisible(false);
      onHideSecret();
    }
  }, [isSecretVisible, onHideSecret]);

  const handleCountdownFinish = () => {
    setIsCountdownVisible(false);
    setIsSecretVisible(true);
  };

  useEffect(() => {
    const hadleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      handleChangeState();
    };

    window.removeEventListener("keydown", hadleKeyDown);
    window.addEventListener("keydown", hadleKeyDown);

    return () => {
      window.removeEventListener("keydown", hadleKeyDown);
    };
  }, [handleChangeState]);

  const classes = useStyles();

  return (
    <Backdrop className={classes.root} onClick={handleChangeState} open>
      <Box
        display="flex"
        color="#fff"
        width="100%"
        height="100%"
        alignItems="center"
        position="relative"
      >
        <Container>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            textAlign="center"
          >
            {!!title && (
              <Typography variant="h2" component="h3" gutterBottom>
                {title}
              </Typography>
            )}
            {isCountdownVisible && (
              <Countdown
                variant="h1"
                component="div"
                color="inherit"
                onFinish={handleCountdownFinish}
              />
            )}
            {isSecretVisible && children}
          </Box>
        </Container>

        {!isCountdownVisible && (
          <Box
            position="absolute"
            bottom="0"
            left="0"
            width="100%"
            justifyContent="center"
            textAlign="center"
            p={2}
          >
            <Typography>НАЖМИТЕ ЛЮБУЮ КНОПКУ</Typography>
          </Box>
        )}
      </Box>
    </Backdrop>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.modal,
  },
}));
