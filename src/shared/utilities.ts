import { IField } from "./type";

function validation(fields: IField) { 
    return Object.keys(fields).map(x=> fields[x]).filter(x=> x.required === true).map(x=> x.value !== '').includes(false) ? false : true;
 }

function fieldsValidation(fields: IField) {
    let checkedField: IField | {} = {};
    Object.keys(fields).forEach(el => {
        const val = {
            ...fields[el],
            value: fields[el].value, 
            validation: (
                (fields[el].value ? 
                typeof(fields[el].value) === 'object' ? fields[el].value.length === 0 : fields[el].value === ''
                : true)
                &&  fields[el].required === true),
            required: fields[el].required
        };
        Object.assign(checkedField, {[el]: val});
    });
    return(checkedField!);
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
        return v.toString(16);
    });
}

export const Utilities = {
    validation,
    fieldsValidation,
    uuidv4
}
