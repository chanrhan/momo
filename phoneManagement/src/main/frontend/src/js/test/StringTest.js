import {useState} from "react";
import {StringUtils} from "../utils/StringUtils";

export function StringTest(){
    const [result, setResult] = useState('')
    const [str1, setStr1] = useState()
    const [str2, setStr2] = useState()

    const compare = ()=>{
        const res = StringUtils.getLevenshteinDistance(str1, str2);
        setResult(res);
    }
    return (
        <div>
            <div style={{
                padding: '10px',
                backgroundColor: `#c5c5c5`,
                width: '600px',
                height: '600px'
            }}>
                <h1>String Test</h1>
                <div>
                    <input type="text" value={str1} onChange={e=>{
                        setStr1(e.target.value)
                    }}/>
                </div>
                <div style={{
                    marginTop: '5px'
                }}>
                    <input type="text" value={str2} onChange={e=>{
                        setStr2(e.target.value)
                    }}/>
                </div>
                <button style={{
                    marginTop: '5px',
                    backgroundColor: `#47e`,
                    padding: '4px 6px 4px 6px',
                    color: "white",
                    borderRadius: '6px'
                }} type='button' onClick={compare}>Compare</button>
                <span style={{
                    display: "block",
                    fontSize: '40px',
                    marginTop: '10px'
                }}>
                    {result}
                </span>
            </div>
        </div>
    )
}