export const ModalType = {
    LAYER: {
        Change_Nickname: 'ChangeNickname',
        Add_Shop: 'AddShop',
        Update_Password: 'UpdatePassword',
        Add_Sale: 'AddSale',
        Sale_Detail: 'SaleDetail'
    },
    MENU: {
        Change_Shop: 'ChangeShop',
        Test: 'MenuModalTest'
    },
    SNACKBAR: {
        Alert: 'Alert'
    },
    TOAST: {

    },
    TOOLTIP: {

    },
    getType: (modalName)=>{
        for(const type in ModalType){
            if(typeof ModalType[type] === 'object'){
                for(const name in ModalType[type]){
                   if(ModalType[type][name] === modalName){
                       return type;
                   }
                }
            }
        }
        return null;
    }
}
