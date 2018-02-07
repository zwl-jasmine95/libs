class dialog{
    constructor(){
        
    }

    init() {
        let dialogHtml = `
            <section id="dialog">
                <div class="dialog-mask"></div>
                <div class="dialog-main">
                    <span class="dialog-close">&times;</span>
                </div>
            </section>
        `
        if($('body').find('#dialog').length == 0){
            $('body').append(dialogHtml)
        }

        let $dialog = $('#dialog')
        this.$el = $('#dialog .dialog-main')

        $dialog.addClass('appear')
       
        $('#dialog :not(.dialog-main)').on('click',function(event){
            removeDialog()
        })

        $dialog.on('click','.dialog-close',function(event){
            removeDialog()
        })
    }

    msg(tip) {
        this.init()
        let _msg = `<div class="main-content">${tip}</div>`
        this.$el.addClass('msg').append(_msg)
    }

    confirm(param){
        this.init()

        let obj = param || {}, _btn = '', _class = '', _title = ''
        let msg = obj.msg || ''
        let btn = obj.btn || ['取消']
        let btnClass = obj.btnClass || ['cancel']

        // 样式
        if(obj.style && obj.style.width && obj.style.height){
            let top = obj.style.height/2 + 'px'
            let left = obj.style.width/2 + 'px'

            this.$el.css({
                'width' : obj.style.width,
                'height' : obj.style.height,
                'top' : 'calc(50% - ' + top + ')',
                'left' : 'calc(50% - ' + left + ')'
            })
        }

        // end 样式
        btn.forEach((d,i) => {
            _btn += `
                <button class="${btnClass[i]}">${d}</button>
            `
        })

        // 标题
        if(obj.title){
            _title = `<h3>${obj.title}</h3>`
        }
        // 按钮个数
        if(btn.length == 1){
            _class = 'only'
        }else if(btn.length == 2){
            _class = 'double'
        }

        let _html = `
            <div class="main-content">
                ${_title}
                <p>${msg}</p>
            </div>
            <div class="main-btn ${_class}">${_btn}</div>
        `
        this.$el.addClass('confirm').append(_html)

        this.$el.on('click','button.cancel',function(event){
            removeDialog()
        })
    }
}

function removeDialog(){
    $('#dialog').remove()
    event.stopPropagation()
    event.preventDefault()
}

let Dialog = new dialog()


