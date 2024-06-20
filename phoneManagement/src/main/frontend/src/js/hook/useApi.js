import {useSelector} from "react-redux";
import UserApi from "../api/UserApi";
import ChatApi from "../api/ChatApi";
import PublicApi from "../api/PublicApi";
import SaleApi from "../api/SaleApi";
import ShopApi from "../api/ShopApi";
import NotificationApi from "../api/NotificationApi";
import TestApi from "../api/TestApi";
import GMDApi from "../api/GMDApi";

function useApi(){
    const {accessToken} = useSelector(state=>state.authReducer);

    return {
        userApi: UserApi(accessToken),
        chatApi: ChatApi(accessToken),
        publicApi: PublicApi(accessToken),
        saleApi: SaleApi(accessToken),
        shopApi: ShopApi(accessToken),
        notifApi: NotificationApi(accessToken),
        testApi: TestApi(accessToken),
        gmdApi: GMDApi(accessToken)
    }
}

export default useApi;