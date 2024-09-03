import { selector } from "recoil";
import { streamIdState } from "@/store/atoms/stream";

export const streamIdSelector = selector<string>({
  key: "streamIdSelector",
  get: ({ get }) => {
    return get(streamIdState);
  },
});
