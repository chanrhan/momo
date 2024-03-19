
// let customContext = null;

window.oncontextmenu=function (){
    return false;
}

$(document).ready(function (){
    // customContext = $('#test-context');
})
// $(document).on('click',function (){
//     customContext.hide();
// });


function addClass(){
    var element = $('#test_addClass');
    element.addClass('chat-self')
}

function updateItem(){
    console.log("add");
    $('#list_item').append(generateItemElement());
}

function generateItemElement(){
    var item = $('<div>').prop({
        className: 'form-control',
        innerHTML: 'ITEM'
    });
    item.on('contextmenu', function (event){
        rightClickEvent(event);
        // if ((event.button === 2)||(event.which === 3)) {
        // }else{
        //     clickEvent(event);
        // }
    });
    return item;
}

function clickEvent(e){
    console.log("click");
}

function rightClickEvent(e){
    console.log("right click");
    e.preventDefault();

    let customContext = $('<div>').addClass('test-context').append(getContextMenu());

    customContext.css({
        left: e.pageX + 'px',
        top: e.pageY + 'px'
    });
    $('body').append(customContext);
}

function getContextMenu(){
    return $('<ul>').text('TEST');
}