import React from "react";

import { RoleCard } from "./RoleCard";

export default {
  title: "RoleCard",
};

export const regular = () => <RoleCard role="regular" />;
export const traitor = () => <RoleCard role="traitor" />;
export const helper = () => <RoleCard role="helper" />;
