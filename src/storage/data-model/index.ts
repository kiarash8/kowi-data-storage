import { ModelConfig } from '../type';
import { GeneralModelInitial, IGeneralModel } from './models/general.model';
import { ITaskModel, TaskModelInitial } from './models/task.model';
import { IUserModel, UserModelInitial } from './models/user.model';

/**
 * append a property for each model and assigned to the model interface
 * 
 * model: I***Model;
 * 
 */
export interface IModels {
  general: IGeneralModel;
  user: IUserModel;
  task: ITaskModel;
}

/**
 * append a model name
 */
export const modelNameKeys:(keyof IModels)[] = [
  'general',
  'user',
  'task'
];

/**
 * specify model config
 * 
 * 'model': {
 *  storage: false,
 *  model: ***ModelInitial
 * }
 */
export const Models: ModelConfig = {
  'general': {
    storage: true,
    modelInitial: GeneralModelInitial
  },
  'user': {
    storage: true,
    modelInitial: UserModelInitial
  },
  'task': {
    storage: false,
    modelInitial: TaskModelInitial
  },
};
