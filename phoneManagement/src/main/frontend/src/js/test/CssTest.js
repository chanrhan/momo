import Test from "./test.module.css"
import {cm} from "../utils/cm";

export function CssTest(){
    return (
        <div>
            <h1>CSS 테스트</h1>
            <li>
                <div>
                    <input type="checkbox" name='radio' id='hi' className={Test.inp} checked={true} readOnly/>
                    <label htmlFor="hi" className={Test.label}></label>
                    <input type="text" value='박희찬 한녕' className={Test.text} readOnly/>
                </div>
            </li>
            <li>
                <div>
                    <input type="checkbox" name='radio' id='hi' className={Test.inp} checked={false} readOnly/>
                    <label htmlFor="hi" className={Test.label}></label>
                    <input type="text" value='강윤민 한녕' className={Test.text}/>
                </div>
            </li>
        </div>
    )
}