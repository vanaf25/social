export type fieldValidatorType=(value:string)=>string | undefined;
export const requiredField:fieldValidatorType=(value:string):string | undefined=>{
    if(value){
        return undefined
    }
    return "Input is empty"
}
export const maxLength=(maxlength:number):fieldValidatorType=>(value)=>{
        if (value.length>maxlength){
            return `Input mustn't contain more symbols than ${maxlength} symbols `
        }
    }