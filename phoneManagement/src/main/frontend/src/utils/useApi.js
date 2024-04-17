import {useSelector} from "react-redux";
import UserApi from "../api/UserApi";
import ChatApi from "../api/ChatApi";
import AccountApi from "../api/AccountApi";
import SaleApi from "../api/SaleApi";
import ShopApi from "../api/ShopApi";
import NoteApi from "../api/NoteApi";
import TestApi from "../api/TestApi";

function useApi(){
    const {accessToken} = useSelector(state=>state.authReducer);

    return {
        userApi: UserApi(accessToken),
        chatApi: ChatApi(accessToken),
        accountApi: AccountApi(accessToken),
        saleApi: SaleApi(accessToken),
        shopApi: ShopApi(accessToken),
        noteApi: NoteApi(accessToken),
        testApi: TestApi(accessToken)
    }
}

export default useApi;