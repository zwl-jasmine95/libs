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
     * width {number} 轮播区域宽度（px）
     * height {number} 轮播区域高度（px）
     * speed {string} 轮播速度 slow|normal|fast
     * time {number} 停顿时间（ms）
     */
    constructor(obj) {
        const s = {
            'slow':0.01,
            'normal':0.025,
            'fast':0.05
        }

        this.width = obj.width || 500
        this.height = obj.height || 300
        this.speed = s[(obj.speed || 'normal')] * this.width
        this.time = obj.time || 3000

        this._box = document.querySelector('#slider-box')
        this._content = document.querySelector('#slider-box .slider-content')
        this._li = document.querySelectorAll('#slider-box .slider-item')
        this._prev = document.querySelector('#slider-box .slider-prev')
        this._next = document.querySelector('#slider-box .slider-next')

        this.len = this._li.length
        this.max_width = this.len * this.width

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
        
        const _first_li = this._li[0].cloneNode(true)
        this._content.appendChild(_first_li)
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
    }

    initCarousel() {
        this.setBoxSize()
        this.creatCircle()
        this.round('left')
        this._box.addEventListener('mouseover',()=>{
            // window.cancelAnimationFrame(this.animation.timer)
            // console.log(document.querySelectorAll('.slider-btn')[0].style)
        })
        this._box.addEventListener('mouseenter',() => {
            clearInterval(this.animation.setInterval)
        })
        this._box.addEventListener('mouseleave',()=>{
            this.round('left')
        })
        this._prev.addEventListener('click',()=>{
            this.singleSliding('right')
        })
        this._next.addEventListener('click',()=>{
            this.singleSliding('left')
        })
    }
}