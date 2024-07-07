export const ElementUtils = {
    getAbsolutePos: (e, offsetTop, offsetLeft)=>{
        const rect = e.target.getBoundingClientRect();
        return {
            top : rect.top + window.scrollY + (offsetTop ? Math.floor(rect.height * offsetTop) : 0),
            left : rect.left + window.scrollX + (offsetLeft ? Math.floor(rect.width * offsetLeft) : 0)
        }
    }
}