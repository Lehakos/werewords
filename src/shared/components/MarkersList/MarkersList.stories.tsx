import React from "react";

import { MarkersList } from "./MarkersList";

export default {
  title: "MarkersList",
};

export const yes = () => <MarkersList type="yes" count={5} />;
export const no = () => <MarkersList type="no" count={5} />;
export const maybe = () => <MarkersList type="maybe" count={5} />;
export const soClose = () => <MarkersList type="so close" count={5} />;
export const soFar = () => <MarkersList type="so far" count={5} />;
export const correct = () => <MarkersList type="correct" count={5} />;
