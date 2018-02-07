/*
 * z-carousel
 * Copyright 2017.10
 * Authors: zeng wenli.
 * Email:zengwenli95@gmail.com
 * All Rights Reserved.
 *
 * blog:
 * Project: https://github.com/zwl-jasmine95/libs/tree/master/carousel
 */
class zCarousel {
    /**
     * @param {object} obj 
     * //——播放属性
     * width {number} 轮播区域宽度（px）
     * height {number} 轮播区域高度（px）
     * speed {string} 轮播速度 slow|normal|fast
     * time {number} 停顿时间（ms）
     * 
     * //——其他配置
     * isRound {boolen} 是否自动轮播
     * arrowSlider {boolen} 是否能够手动切换滑块
     * circle {boolen} 是否包含滑动小圆点
     * circleSlider {boolen} 点击原点是否能切换滑块
     */
    constructor(obj) {
        const s = {
            'slow':0.01,
            'normal':0.025,
            'fast':0.05
        }

        // 传入的参数
        this.width = obj.width || 500
        this.height = obj.height || 300
        this.speed = s[(obj.speed || 'normal')] * this.width
        this.time = obj.time || 3000

        this.isRound = obj.isRound != undefined ? obj.isRound : true
        this.arrowSlider = obj.arrowSlider != undefined ? obj.arrowSlider : true
        this.circle = obj.circle != undefined ? obj.circle : true
        this.circleSlider = obj.circleSlider != undefined ? obj.circleSlider : true
        
        // 页面元素
        this._box = document.querySelector('#slider-box')
        this._content = document.querySelector('#slider-box .slider-content')
        this._li = document.querySelectorAll('#slider-box .slider-item')

        this.len = this._li.length
        this.max_width = this.len * this.width

        // 全局变量
        this.animation = {}
    }
    
    /**
     * 设置轮播区域宽高
     * 设置所有li标签的宽度
     * 克隆第一个li节点，插入到所有li标签后面，实现无缝连接滑动
     */
    setBoxSize() {
        this._box.style.height = this.height + 'px'
        this._box.style.width = this.width + 'px'

        this._li.forEach(_i => {
            _i.style.width = this.width + 'px'
        })
        
        let _first_li = this._li[0].cloneNode(true)
        this._content.appendChild(_first_li)
    }

    /**
     * 生成上一页下一页按钮
     */
    creatBtn(){
        let _prev = creatNode('slider-btn slider-prev','<')
        let _next = creatNode('slider-btn slider-next','>')
        this._box.insertBefore(_prev,this._box.childNodes[0])
        this._box.appendChild(_next)

        this._prev = document.querySelector('#slider-box .slider-prev')
        this._next = document.querySelector('#slider-box .slider-next')

        function creatNode(className,text){
            var node = document.createElement("div")
            var textnode = document.createTextNode(text)
            node.appendChild(textnode)
            node.setAttribute('class',className)
            return node
        }
    }

    /**
     * 根据li标签的数量动态生成相同数量的小圆点
     */
    creatCircle() {
        const _circle = document.createElement('div')
        _circle.setAttribute('class', 'slider-circle')

        for (let i = 0; i < this.len ;i++) {
            let _item = document.createElement('div')
            i == 0 ? _item.setAttribute('class', 'circle-item circle-item-active')
                : _item.setAttribute('class', 'circle-item')
            _circle.appendChild(_item)
        }
        this._box.appendChild(_circle)
    }
    
    /**
     * 小圆点样式变化
     * @param {string} dir 滑动方向 'left'|'right'
     */
    circleSlide(dir){
        let left = Math.abs(this._content.offsetLeft)
        let index = left / this.width
        let _circle = document.querySelectorAll('#slider-box .slider-circle .circle-item')
        let length = _circle.length
        for (let _d of _circle){
            _d.classList.remove("circle-item-active")
        }
        
        if(dir == 'left'){
            if(index < length - 1){
                _circle[index+1].classList.add("circle-item-active")
            }else if(index == length - 1){
                _circle[0].classList.add("circle-item-active")
            }

        }else if(dir == 'right'){
            if(index == length){
                _circle[length - 1].classList.add("circle-item-active")
            }else if(index <= length - 1){
                _circle[index - 1].classList.add("circle-item-active")
            }
        }
        
    }

    /**
     * 图片循环播放
     * @param {string} dir 滑动方向 'left'|'right'
     */
    round(dir){
        let animation = this.animation
        animation.setInterval = setInterval(() => {
            this.singleSliding(dir)
        },this.time)
    }
    
    /**
     * 单页滑动效果
     * @param {string} dir 滑动方向 'left'|'right'
     */
    singleSliding(dir){
        const state = dir || 'left'
        const width = this.width
        const _content = this._content
        const speed = this.speed
        const max_width = this.max_width

        let left = this._content.offsetLeft
        let animation = this.animation
        let num = 0
        
        function animate(){
            //循环滑动处理
            if(left <= -max_width && state == 'left'){
                _content.style.left = 0
                left = 0
            }else if(left >= 0 && state == 'right'){
                _content.style.left = -max_width
                left = -max_width
            }

            //滑动
            if (num <= width) {
                _content.style.left = left + (state == 'left' ? (-num) : num) + 'px'
                animation.timer = requestAnimationFrame(animate)
                num += speed
            }else{
                cancelAnimationFrame(animation.timer)
            }
        }
        animate()

        //是否有圆点
        if(this.circle){
            this.circleSlide(dir)
        }
    }

    initCarousel() {
        this.setBoxSize()
        
        //是否需要圆点
        if(this.circle){
            this.creatCircle()
        }

        //是否自动轮播
        if(this.isRound){
            this.round('left')
            this._box.addEventListener('mouseleave',()=>{
                this.round('left')
            })
        }
        
        //是否需要上一页下一页按钮
        if(this.arrowSlider){
            this.creatBtn()

            this._prev.addEventListener('click',()=>{
                this.singleSliding('right')
            })
            this._next.addEventListener('click',()=>{
                this.singleSliding('left')
            })
        }

        this._box.addEventListener('mouseenter',() => {
            clearInterval(this.animation.setInterval)
        })
    }
}