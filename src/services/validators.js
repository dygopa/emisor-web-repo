class Validators {
    constructor() {
    }

    validateField(propType, propValue) {
        switch(propType) {
          case 'email':
            let emailValid = propValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            return emailValid
          default:
            break;
        }
    }

    validateCompleteObject(propObject) {
        let object = propObject
        let listErrors = []

        for (const key in object) {
          if(object[key] === undefined || object[key] === "" ){
            listErrors.push(key)
          }
        }

        return listErrors
    }

    validateObjectWithList(propList, propObject){
        let returnedValue = []
        for (const key in propObject) {
            if (propList.includes(key) && (propObject[key] === undefined || propObject[key] === "")) {
                returnedValue.push(key)
            }
        }
        return returnedValue
    }
}

export default new Validators