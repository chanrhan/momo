import {useSelector} from "react-redux";
import UserApi from "../api/UserApi";
import ChatApi from "../api/ChatApi";
import AccountApi from "../api/AccountApi";
import SaleApi from "../api/SaleApi";
import ShopApi from "../api/ShopApi";

function useApi(){
    const {accessToken} = useSelector(state=>state.authReducer);

    return {
        userApi: UserApi(accessToken),
        chatApi: ChatApi(accessToken),
        accountApi: AccountApi(accessToken),
        saleApi: SaleApi(accessToken),
        shopApi: ShopApi(accessToken)

    }
}

export default useApi;