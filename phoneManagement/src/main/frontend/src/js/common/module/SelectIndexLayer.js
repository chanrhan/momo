import {ObjectUtils} from "../../utils/objectUtil";
import {useRenderlessModal} from "../../hook/useRenderlessModal";

export function SelectIndexLayer({initValue, inputField, cssModule, cssModules=[], buttonClassName, className, name, value, onChange, values, children, buttonStyle}){
    const renderlessModal = useRenderlessModal(`RDL_${name}__${Date.now()}`)

    const handleChange = i=>{
        if(onChange){
            onChange(i);
        }else{
            inputField.put(name, i);
        }
        renderlessModal.close()
    }

    const fromCssModule = key=>{
        if(!ObjectUtils.isEmpty(cssModule)){
            return cssModule[key]
        }
        if(ObjectUtils.isEmpty(cssModules)){
            return ''
        }
        if(cssModules && !Array.isArray(cssModules)){
            return cssModules[key];
        }
        if(cssModules.length === 1){
            return cssModules[0][key];
        }

        return cssModules.map(cm=>cm[key]).join(' ');
    }


    const getButtonName = ()=>{
        if(!ObjectUtils.isEmpty(value)){
            return value;
        }else if(!ObjectUtils.isEmpty(inputField)) {
            const getValue = inputField.get(name);
            // console.log(`g v : ${getValue}`)
            return !ObjectUtils.isEmpty(getValue) ? values[getValue] : (initValue ?? values[0])
        }
        return values[0]
    }


    if(ObjectUtils.isEmpty(values)){
        return null;
    }

    return (
        <>
            <button type="button" className={`select_btn ${buttonClassName} ${fromCssModule('select_btn')}`}
                    onClick={renderlessModal.clickToOpen}>{getButtonName()}</button>
            <ul ref={renderlessModal.ref}
                className={`select_layer ${fromCssModule('select_layer')} ${className} ${renderlessModal.active && `active ${fromCssModule('active')}`}`}>
                {
                    values && values.map((v, i) => {
                        return <li key={i} className={`select_item ${fromCssModule('select_item')}`}>
                            <button type="button" onClick={() => {
                                handleChange(i);
                            }}>{v}</button>
                        </li>
                    })
                }
            </ul>
        </>
    )
}