import { selector } from "recoil";
import { creatorIdState } from "@/store/atoms/creator";

export const creatorIdSelector = selector<string>({
  key: "creatorIdSelector",
  get: ({ get }) => {
    return get(creatorIdState);
  },
});
