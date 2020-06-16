var site_header = new Header();
var site_menu = new Menu();
var site_content = new Content();
var el_header, el_menu, el_container_body, el_cont_left, el_cont_right, arr_menu_child;
var resize_timer;

$(function mainOnLoad() {

    //создаем хидер
    site_header.createHeader();
    //создаем меню
    site_menu.createMenu();
    //заполняем контент
    let data_type = getLinkParametr('data-id');
    let id = getLinkParametr('element-id');
    site_content.createContent(data_type, id);
    //Обновляем переменные (для управления размером)
    el_header = $('#container-header');el_menu = $('#menu');el_container_body = $('#container-body');el_cont_left = $('#content-left');el_cont_right = $('#content-right');arr_menu_child = $('.link-menu-child');
    changeStyles();
   
    $(window).on('resize', windowResize);  
});


function getLinkParametr(type) {
    let result = null;
    window.location.search.substr(1).split("&").forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === type) result = tmp[1];
    });
    if(type!='element-id' && result==null) {
        result='articles_preview';
    }
    return result;
}

function windowResize(){
    if(resize_timer) {clearTimeout(resize_timer);}
    resize_timer = setTimeout(changeStyles, 100);
}

function changeStyles() {
    if(window.innerWidth>992){
        //Стили блока контейнер
        $(el_container_body).removeClass('flc').addClass(['row', 'h-75']);
        //Стили блока контента право
        $(el_cont_right).removeClass('col').addClass(['margin-t-5', 'col-10']);
        //Стили блока контейнер лево
        $(el_cont_left).removeClass('col').addClass('col-2');
        //Стили меню
        $(el_menu).removeClass('flr');
        //Стили header
        $(el_header).removeClass('h-auto').addClass('h-25');
        //Управление меню
        $(arr_menu_child).removeClass('menu_down').addClass('menu_right');
    } else {
         //Стили блока контейнер
        $(el_container_body).addClass('flc').removeClass(['row', 'h-75']);
        //Стили блока контента право
        $(el_cont_right).removeClass(['margin-t-5', 'col-10']).addClass('col');
        //Стили блока контейнер лево
        $(el_cont_left).removeClass('col-2').addClass('col'); 
        //Стили меню
        $(el_menu).addClass('flr');
        //Стили header
        $(el_header).removeClass('h-25').addClass('h-auto');
         //Управление меню
        $(arr_menu_child).removeClass('menu_right').addClass('menu_down');
    }
}

function createContent(e){
    if(!$(e.target).hasClass('menu-link')){return;}
    else {
        if($(e.target).attr('link-type')!='internal') {
            return;
        } 
    }
    e.preventDefault();
   
    window.history.pushState('','','./index.html'+$(e.target).attr('href')); 
    let data_type = getLinkParametr('data-id');
    let id = getLinkParametr('element-id');
    site_content.createContent(data_type, id);  
}

