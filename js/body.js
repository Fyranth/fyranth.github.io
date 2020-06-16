function Content() {
    this.data = '';

    this.getData = function(type) {
        if(type=='articles_preview'){
            this.data = content_main;
        }
        if(type=='articles_full'){
            this.data = content_main_detailed;
        }
        if(type=='article_about'){
            this.data = content_about;
        }
        if(type=='article_contacts') {
            this.data = content_contacts;
        }
        if(type=='gallery'){
            this.data = content_gallery;
        }
    }

    this.createContent = function(data_type, id) {
        this.getData(data_type);
        if(this.data=='') {return;}
        let type = this.data.type;
        let container = $('#content-right').html('');
        if(id!=undefined) {
            let content_data = this.data.content.find(obj=>{ return obj.id == id });
            if(type=='articles_preview') {$(createArticlesPreview(content_data)).appendTo(container);}
            if(type=='articles_full'){$(createArticle(content_data)).appendTo(container);}
            if(type=='article_full'){$(createArticle(content_data)).appendTo(container);}
            if(type=='gallery'){$(createAlbum(content_data)).appendTo(container);}
        } else {
            let content_data = this.data.content;
            if(type=='articles_preview') {$(createArticlesPreview(content_data)).appendTo(container);}
            if(type=='articles_full'){$(createArticle(content_data)).appendTo(container);}
            if(type=='article_full'){$(createArticle(content_data[0])).appendTo(container);}
            if(type=='gallery'){$(createAlbums(content_data)).appendTo(container);} 
        }
        $(container).append(createFooter());
    }
    
}

function createArticlesPreview(content) {
    let main_div = $('<div>');
    $('<h4>', {text: 'Новости'}).appendTo(main_div);
    content.forEach(element => {
        let m = moment(element.date);
        m.locale('ru');
        $('<div>').html(element.data)
        .append($('<nav>').addClass('article_preview-postdata')
        .append($('<p>', { text: `Автор: Админ, ${m.format('LL')}`,}))
        .append($('<a>', {href: `?data-id=articles_full&element-id=${element.id}`, text: 'Читать все...'})))
        .addClass('article_preview').appendTo(main_div);}); 
    return main_div;
}

function createArticle(content) {
    let m = moment(content.date);
    m.locale('ru'); 
    let main_div = $('<div>');
        $('<div>', {
            html: content.data, 
            append: $('<nav>', { 
                append: $('<p>', { text: `Автор: Админ, ${m.format('LL')}`}) 
            }).addClass('article_preview-postdata')

        }).addClass('article_preview').appendTo(main_div); 
    return main_div;
}

function createAlbums(content) {
    let main_div = $('<div>').addClass('gallery, w-100').append($('<h4>', {text: 'Галерея'}));
    content.forEach(item=> {
        let div = $('<div>').addClass('album_preview').appendTo(main_div)
        .append($('<h5>').text(item.title)).append($('<h6>').text(item.date_place))
        .append($('<nav>')
                .append($('<a>', {href: `?data-id=gallery&element-id=${item.id}`}).addClass('w-75').append($('<img>', {src: `./img/albums/${item.id}/${item.images[0]}`}).addClass('w-100'))));
        
    });
    return main_div;
}
function createAlbum(content) {
    let main_div = $('<div>').addClass('gallery, w-100')
    .append($('<h4>', {text: `${content.title}`}))
    .append($('<h5>', {text: `${content.date_place}`}));
    let coll = $('<div>').addClass('album').appendTo(main_div);
    content.images.forEach(item=> {
        let div = $('<nav>').addClass('col-5 p-0').appendTo(coll)
                .append($('<img>', {src: `./img/albums/${content.id}/${item}`}).addClass('w-100')
                .attr('img-id', item).on('click', openslider));
        
    });
    let slider_div = $('<div>').addClass('slider_back')
                    .append($('<div>', {id: 'slider'}).addClass('slider')
                            .append($('<input type="button" value="&#10008;">').addClass('slider_close').on('click', closeslider))
                            .append($('<input type="button" value="&laquo;">').addClass('slider_move_left').on('click', moveImg))
                            .append($('<input type="button" value="&raquo;">').addClass('slider_move_right').on('click', moveImg)))
                    .appendTo(main_div);
    return main_div;
}
function createFooter(){
    return $(`<div class="w-100">
    <p class="footer">
        The 501st Legion and Rebel Legion are worldwide Star Wars costuming organizations comprised of and operated by Star Wars fans. While not sponsored by Lucasfilm Ltd., they are Lucasfilm's preferred costuming groups. Star Wars, its characters, costumes, and all associated items are the intellectual property of Lucasfilm. © & ™ Lucasfilm Ltd. All rights reserved. Used under authorization.
    </p>
    </div>`);
}

function openslider (e) {
    let img = e.target;
    let img_id = $(img).attr('img-id');
    let album_id = getLinkParametr('element-id');
    let album_data = site_content.data.content.find(obj=>{ return obj.id == album_id });
    //debugger;
    //Делаем слайдер видимым
    var slider = $('#slider').css('display', 'flex').attr('album-id', album_id);
    //Включаем показ тумана войны
    var slider_parent = $('#slider').parent().css('display', 'flex');
    //очистим слайдер
    $('.slider_img_box').remove();
    //загружаем в него картинки
    album_data.images.forEach(item => {
        let newDiv = $('<div>').addClass('slider_img_box').css('display', 'flex').attr({act: true, img_id: item})
        .append($('<img>', {src: `./img/albums/${album_id}/${item}`}).addClass('slider_img'))
        .appendTo(slider);
        if(item != img_id) {
            $(newDiv).css('display', 'none').attr('act',false);
        }
    })
}

function closeslider() {
    //Делаем слайдер невидимым
    var slider = document.getElementById('slider');
    var slstyle = slider.style;
    slstyle.display = 'none'; 
    //Выключаем показ тумана войны
    var slider_parent = slider.parentElement;
    var ptstyle = slider_parent.style;
    ptstyle.display = 'none';
    ImgNumber=0;  
}

function moveImg(e) {
    let album_id = $('#slider').attr('album-id');
    let step_type = $(e.target).attr('id'); 
    let album_data = site_content.data.content.find(obj=>{ return obj.id == album_id });
    let img = $('div[act=true]');
    let imgId = $(img).attr('img_id');
    $(img).attr('act', false).css('display', 'none');
    let i = jQuery.inArray(imgId, album_data.images);
    if(step_type=='step-') {
        i = (i-1 < 0) ? album_data.images.length-1 : i-1; 
        $(`div[img_id='${album_data.images[i]}']`).attr('act', true).css('display', 'flex');
    } else {
        i = (i+1 > album_data.images.length-1) ? 0 : i+1; 
        $(`div[img_id='${album_data.images[i]}']`).attr('act', true).css('display', 'flex');
    }



}