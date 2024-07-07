export function SelectOptionLayer({name, values, cm}){
    return (
        <select name={name} value={0} className={`select_btn ${cm && cm['select_btn']}`}>
            {
                values && values.map((v,i)=>{
                    return <option value={i}>{v}</option>
                })
            }
        </select>
    )
}