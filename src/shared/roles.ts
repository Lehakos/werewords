import { ValuesType } from "utility-types";

export const roles = {
  traitor: "traitor",
  helper: "helper",
  regular: "regular",
} as const;

export const roleNames = {
  [roles.traitor]: "Предатель",
  [roles.helper]: "Помощник",
  [roles.regular]: "Обычный",
};

export type Role = ValuesType<typeof roles>;
