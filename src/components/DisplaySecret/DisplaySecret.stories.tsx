import React from "react";

import { DisplaySecret } from "./DisplaySecret";

export default {
  title: "DisplaySecret",
};

export const basic = () => (
  <DisplaySecret title="Say hello?" onHideSecret={() => {}}>
    HELLO!
  </DisplaySecret>
);
