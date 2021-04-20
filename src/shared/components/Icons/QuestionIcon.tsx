import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

import { ReactComponent as QuestionIconSvg } from "./svg/question.svg";

export const QuestionIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 6.827 6.827" component={QuestionIconSvg} />
  );
};
