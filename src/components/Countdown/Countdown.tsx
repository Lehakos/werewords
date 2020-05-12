import React, { ReactNode, useRef, useState, useEffect } from "react";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

type Props = TypographyProps & {
  count?: number;
  step?: number;
  onFinish?: () => void;
  component?: ReactNode;
};

export const Countdown = ({
  count = 3,
  step = 1000,
  onFinish,
  ...rest
}: Props) => {
  const [remained, setRemained] = useState(count);
  const remainedRef = useRef(remained);

  remainedRef.current = remained;

  useEffect(() => {
    const timer = setInterval(() => {
      const newRemained = remainedRef.current - 1;

      if (newRemained > 0) {
        setRemained(newRemained);
        return;
      }

      if (onFinish) {
        onFinish();
      }

      clearInterval(timer);
    }, step);

    return () => {
      clearInterval(timer);
    };
  }, []); // eslint-disable-line

  return <Typography {...rest}>{remained}</Typography>;
};
