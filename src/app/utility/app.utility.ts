import { Validators } from "@angular/forms";

export class AppUtility {

    public static isEmptyString(str): boolean {
        return (!str || 0 === str.length);
    }

    public static isEmptyObject(object): boolean {
        for (var key in object) {
            if (object.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    public static prepareValidation(value: any): any {
        const validationArray = [];
        if (value) {
            validationArray.push(Validators.required);
        }
        return validationArray;
    }
}