import ConvertedEnum from "./converted-enum";

const validTaskStates = {
  INITIAL: "initial",
  LOADING: "loading",
  FINISHED: "finished",
};

export const ValidTaskStatesEnum = ConvertedEnum(validTaskStates);
