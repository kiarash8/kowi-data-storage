import { createContext, useReducer } from 'react';
import { Models, modelNameKeys } from './data-model';
import { IContext, Method, ModelName } from './type';

const Context = createContext<IContext>({} as IContext);

const initialState = () => {
  const state: any = {};
  modelNameKeys.forEach(model => {
    state[model] = getModelData(model);
  });

  return state;
}

function getModelData(model: ModelName){
  const modelConfig = Models[model];
  if(!modelConfig.storage)
    return modelConfig.modelInitial;

  const storageData = localStorage.getItem(model);
  return (storageData !== null && storageData !==  undefined) ? JSON.parse(storageData) : modelConfig.modelInitial;
}

function Reducer(state: any, action: any) {
  const [method, model] = action.type.toString().split('_');
  return (method === 'SET' || method === 'RESET') ? getNewState(method, model, action, state) : state;
}

function getNewState(method: Method, model: ModelName, action: any, state: any){
  const modelConfig = Models[model];
  const modelBody: any = (method === 'RESET') ? modelConfig.modelInitial : {};
  if(method === 'SET'){
      Object.keys(modelConfig.modelInitial).forEach(field => {
          modelBody[field] = (action.payload[field] === undefined ? state[model][field] : action.payload[field]);
      });
  }

  if(modelConfig.storage) { localStorage.setItem(model, JSON.stringify(modelBody)) }

  return {
      ...state,
      [model]: modelBody
  };
}

const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(Reducer, initialState());

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

/**
 * `action` has two methods (`'SET'`, `'RESET'`)
 * 
 *  `dispatch`, `model` has required in both methods
 * 
 *  a `payload` is an object of property or properties needed to change, only required in the `SET method`
 */
function Action(
  method: Method,
  dispatch: React.Dispatch<any>,
  model: ModelName,
  payload?: any,
) { 
  return dispatch({
      type: `${method}_${model}`,
      payload: method === 'SET' ? payload : Models[model].modelInitial
  });
}

export const Storage = { Provider, Context, Action };
