import {check} from 'express-validator';

export const bodyValidation = (method) => {
    switch (method) {
        case 'signupUser': {
              return [
                check('name', 'Plese Enter userName').not().isEmpty(),
                check('email', 'Email is invalid').exists().isEmail(),
                check('password', 'Password contain at least 5 character').isLength({ min: 5 })
              ];
          }
          case 'signinUser': {
              return [
                  check('email', 'Email is invalid').exists().isEmail(),
                  check('password','Please Required password').not().isEmpty(),
              ]
        }
        case 'checkItem':{
            return[
                check('name','Please Required Name').not().isEmpty(),
                check('description','Please Enter the Description').not().isEmpty(),
                check('price','Please Required Price').not().isEmpty(),
                check('size','Please Required size').not().isEmpty(),
                check('catergory','Please Required Catergory').not().isEmpty()

            ]
        
        }
        case 'checkAddCartItem':{
            return[
                check('quantity','Please Required Number of Item').not().isEmpty(),
            ]
        }
        default: null
          
      }
}

