export const ModalType = {
    LAYER: {
        Change_Nickname: 'ChangeNickname',
        Add_Shop: 'AddShop',
        Update_Password: 'UpdatePassword',
        Add_Sale: 'AddSale',
        Sale_Detail: 'SaleDetail',
        Select_Card: 'SelectCard',
        Select_Comb: 'SelectComb',
        Select_Exsvc: 'SelectExsvc',
        Select_Plan: 'SelectPlan',
        Select_Second: 'SelectSecond',
        Select_GreenPhone: 'SelectGreen'
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
