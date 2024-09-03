import { atom } from "recoil";

export const creatorIdState = atom<string>({
  key: "creatorIdState",
  default: "",
});
