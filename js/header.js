function Header() { 
    this.date_create = new Date();
    this.header_data = [];
    this.curr_slide = 1;
    this.interval = 5000;

    this.getData = function() {
        let current_date = new Date();
        let delta = current_date - this.date_create;
        if(delta >= 900000 || this.header_data.length == 0) {
            //Будем получать данные хидера из базы
            this.header_data = [
                {
                    src: "./img/header/501_header.jpg",
                    alt: "Российский аванпост 501-го легиона",
                    title: "Российский аванпост 501-го легиона"
                },
                {
                    src: "./img/header/rebel_1.jpg",
                    alt: "Российский аванпост легиона повстанцев",
                    title: "Российский аванпост легиона повстанцев"
                },
                {
                    src: "./img/header/501_header_2.jpg",
                    alt: "Российский аванпост 501-го легиона",
                    title: "Российский аванпост 501-го легиона"
                },
                {
                    src: "./img/header/rebel_2.jpg",
                    alt: "Российский аванпост легиона повстанцев",
                    title: "Российский аванпост легиона повстанцев"
                },
                {
                    src: "./img/header/501_header_3.jpg",
                    alt: "Российский аванпост 501-го легиона",
                    title: "Российский аванпост 501-го легиона"
                },
                {
                    src: "./img/header/rebel_3.jpg",
                    alt: "Российский аванпост легиона повстанцев",
                    title: "Российский аванпост легиона повстанцев"
                }
            ]
        } 
    };

    this.getData();

    this.createHeader = function() {
        let container_header = $("#container-header");
        container_header.innerHTML="";
        let header_wrapper = $('<nav>').addClass('container-header_wrapper').appendTo(container_header);
        for(let i=0; i<this.header_data.length; i++) {
            let current_data = this.header_data[i];
            let nav = $('<nav>').addClass('header-nav').attr('data_id', i+1);
            if(i>0) { $(nav).addClass("header-hidden");}
            $(nav).appendTo(header_wrapper);
            let img = $('<img>').addClass('header-img').attr(current_data).appendTo(nav);
        }
        setInterval(this.changeImg.bind(this), this.interval);
    }; 

    this.changeImg = function() {
        let data_id = parseInt($(`nav[data_id=${this.curr_slide}]`).toggleClass('header-hidden').attr('active_header', false).attr('data_id'));
        data_id = (data_id>=this.header_data.length) ? 1:data_id+1;
        $(`nav[data_id=${data_id}]`).toggleClass('header-hidden').attr('active_header', true);
        this.curr_slide = data_id;

    }
}

