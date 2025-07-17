import { useContext } from "react";
import type { DnDContextType } from "../provider/DnDContext";
import DnDContext from "../provider/DnDContext";

export const useDnD = (): DnDContextType => {
  return useContext(DnDContext);
};
