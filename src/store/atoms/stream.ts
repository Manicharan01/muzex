import { atom } from "recoil";

export const streamIdState = atom<string>({
  key: "streamIdState",
  default: "",
});
