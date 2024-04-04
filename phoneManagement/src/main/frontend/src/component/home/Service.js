import AutoRouter from "../../Route/AutoRouter";
import Header from "../common/Header";
import Footer from "../common/Footer";

function Service(){
    return (
        <div>
            <Header/>
            <h3 className='debug-page'>Service Page</h3>
            <AutoRouter/>
            <Footer/>
        </div>
    )
}

export default Service;