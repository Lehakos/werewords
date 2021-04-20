import { Role } from "shared/constants/roles";

export type PlayerBaseInformation = {
  id: string;
  name: string;
};

export type Player = PlayerBaseInformation & {
  master: boolean;
  role: Role;
};

export type ById = {
  [id: string]: Player;
};

export type Ids = string[];
