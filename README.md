# Kowi Data Storage

model-based storage using React Context with the power of Typescript 

## About the Context
Context provides a way to pass data through the component tree without having to pass props down manually at every level.

In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

## How to use
 1. copy the **src/storage** folder into the new project in the same directory
 2. create a new model inside the path **storage/data-model/models** and follow the naming rule ***.model.ts**
 3. inside the model, you have to create the **model interface** and define the **initial object**
 > follow the **naming rule** inside the model file
 - **Interface**: I*Model
 - **Initial object**: *ModelInitial
```typescript
export interface IGeneralModel {
	notification: boolean;
	title: string;
}

export const GeneralModelInitial: IGeneralModel = {
	notification: false,
	title: 'Kowi Data Storage - Taskboard (example)'
}
```
 4. open the **storage/data-model/index.ts** file to import the new model and set some pre config
 5. import the **interface** and the **initial object**
 ```typescript
import { GeneralModelInitial, IGeneralModel } from  './models/general.model';
```
 6. append a new property to the **IModels interface** for the new model and append a **model name** to **modelNameKeys**
  ```typescript
export interface IModels {
	general: IGeneralModel;
}

export const modelNameKeys:(keyof IModels)[] = [
	'general',
];
```
 7. you have to specify the **model config** in Models constant, **use the same name** you used before set the model initial property to an imported initial object, and **if you prefer to store the data inside the browser local storage, set the storage property true**
  ```typescript
export const Models: ModelConfig = {
	'general': {
		storage: true,
		modelInitial: GeneralModelInitial
	},
};
```
 8. now you’re ready to use the storage inside of the project, for making this happen open the **src/index.tsx** file to config the storage provider
  ```typescript
import { Storage } from  './storage';
```
  ```typescript
<Storage.Provider>
	<App/>
</Storage.Provider>
```
 9. the storage is now accessible inside the app
> import the Storage and use the codes below to access the state and dispatch a new state inside of the functional component

*the state has a completions models list help you to choose easily and speed up your workflow*
  ```typescript
const { state, dispatch } = useContext(Storage.Context);

return (
	<span>{state.general.title}</span>
)
```

**SET and RESET the Model** *(the action method also has a completions list)*
```typescript
const { state, dispatch } = useContext(Storage.Context);

const save = () => {
	Storage.Action('SET', dispatch, 'general', {
		// you don’t have to put all the model fields here just put the fields that you wanted to change
		title: 'some new title',
	});
}

const reset = () => {
	Storage.Action('RESET', dispatch, 'general');
}
```