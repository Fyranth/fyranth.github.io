//блок обработки меню
function Menu() {
    this.date_create = new Date();
    this.menu_data = [];
    this.created = false;

    this.getData = function() {
        let current_date = new Date();
        let delta = current_date - this.date_create;
        if(delta >= 900000 || this.menu_data.length == 0) {
            this.created = false;
            this.menu_data = [
                {
                    id:0,
                    link: './index.html',
                    data_id: '',
                    title: 'Главная',
                    children: []
                },
                {
                    id:1,
                    link: '',
                    data_id: '',
                    title: 'О легионах',
                    children: [
                        {
                            id:0,
                            parentid:1,
                            link: '',
                            data_id: 'article_contacts',
                            title: 'Контакты',
                            children: []   
                        },
                        
                        {
                            id:2,
                            parentid:1,
                            link: 'http://501st.ru/forum/',
                            data_id: 'forum',
                            title: 'форум',
                            children: [] 
                        },
                        {
                            id:3,
                            parentid:1,
                            link: 'http://501st.com',
                            data_id: '',
                            title: '501st legion',
                            children: [] 
                        },
                        {
                            id:4,
                            parentid:1,
                            link: 'http://rebellegion.com',
                            data_id: '',
                            title: 'Rebel legion',
                            children: [] 
                        },
                    ]
                },
                {
                    id:2,
                    link: '',
                    data_id: 'article_about',
                    title: 'О нас',
                    children: [] 
                },
                {
                    id: 3,
                    link: '',
                    data_id: 'gallery',
                    title: 'Галерея',
                    children: []  
                }
            ]
        }
    }
    this.getData();

    this.createMenu = function() {
        let content_left = $('#content-left').html('');
        this.getData();
        if(!this.created) {
            let main_nav = $('<nav>').addClass('sidebar-box');
            //заголовок  менюшки
            let nav_header = $('<nav>').addClass('flr').appendTo(main_nav);
            let menu_header = $('<h4>', {text: 'Навигация'}).appendTo(nav_header);
            let header_but = $('<span>', {text: '&equiv;'}).appendTo(nav_header).hide();
            let nav_links = $('<nav>', {id: 'menu'}).appendTo(main_nav);
            
            this.menu_data.forEach((item)=>{$(createLinkNav(item)).appendTo(nav_links)});
            $(main_nav).appendTo(content_left);
            this.created=true;
            this.cache = main_nav.outerHTML;
        } else {
            let main_nav = $('<nav>');
            main_nav.outerHTML = this.cache;
            content_left.appendChild = main_nav;
        }

    }

    function createLinkNav(data) {
        let nav = $('<nav>').addClass('link-menu');
        let obj = {};
        if(data.link!='') {
            obj['href'] = data.link;
            if(data.link!='./index.html'){ 
                obj['target'] = '_blank';
            }
            obj['link-type'] = 'external';
        }else if(data.data_id!=''){
            obj['href'] ='?data-id='+data.data_id;
            obj['link-type'] = 'internal';   
        }
        let a = $('<a>', obj).text(data.title).addClass('menu-link').appendTo(nav).on('click', createContent);
        //.on('click', createContent);
        if(data.children.length>0) {
            let nav_child_box = $('<nav>').addClass('link-menu-child').appendTo(nav);
            data.children.forEach((item)=>{$(createLinkNav(item)).appendTo(nav_child_box)});
        }
        return nav;
    }
}

