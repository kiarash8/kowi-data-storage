/**
 * define model interface `I***Model`
 */
export interface IGeneralModel {
  notification: boolean;
  title: string;
}

/**
 * define a model initial object `***ModelInitial`
 */
export const GeneralModelInitial: IGeneralModel = {
  notification: false,
  title: 'Kowi Data Storage - Taskboard (example)'
}
