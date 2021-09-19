import { IModels } from "./data-model";

export type Method = 'SET' | 'RESET';

export interface IContext {
    state: IModels,
    dispatch: React.Dispatch<React.SetStateAction<IModels>>
}

// literal type of model name
export type ModelName = keyof IModels;

// model config type
export type ModelConfig = {
  [name in ModelName]: {
    storage: boolean;
    modelInitial: any;
  };
};

export interface IContext {
  state: IModels,
  dispatch: React.Dispatch<React.SetStateAction<IModels>>
}
