export interface IField {
    [key: string]: {
        type: 'text' | 'checked';
        value: any,
        freezeValue?: any;
        validation: boolean,
        required: boolean
    }
}
