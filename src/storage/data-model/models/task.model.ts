/**
 * define model interface `I***Model`
 */
 export interface ITaskModel {
     items: Array<{
        id: string;
        title: string;
        description: string;
        checked: boolean;
     }>;
}
  
  /**
   * define a model initial object `***ModelInitial`
   */
  export const TaskModelInitial: ITaskModel = {
    items: [],
  }
  