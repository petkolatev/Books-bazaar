import { ValidatorFn } from "@angular/forms";


export function matchPassword(passwordControlName: string, rePasswordControlName: string): ValidatorFn {
    return (control) => {
        const passwordFormCotrol = control.get(passwordControlName)
        const rePasswordFormControl = control.get(rePasswordControlName)
        const isMatchingPaswords = passwordFormCotrol?.value === rePasswordFormControl?.value
        return isMatchingPaswords? null:{matchPassword:true}
    }
}