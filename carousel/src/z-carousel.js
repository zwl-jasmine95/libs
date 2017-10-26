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
     * speed {number} 轮播速度（px）
     * time {number} 停顿时间（ms）
     */
    constructor(obj) {
        this.width = obj.width || 500
        this.height = obj.height || 300
        this.speed = obj.speed || 8
        this.time = obj.time || 3000

        this._box = document.querySelector('#silder-box')
        this._content = document.querySelector('#silder-box .silder-content')
        this._li = document.querySelectorAll('#silder-box .silder-item')
        this.len = this._li.length
    }
    /**
     * 设置轮播区域宽高
     * 设置所有li标签的宽度
     */
    setBoxSize() {
        this._box.style.height = this.height + 'px'
        this._box.style.width = this.width + 'px'

        this._li.forEach(_i => {
            _i.style.width = this.width + 'px'
        })
    }

    /**
     * 根据li标签的数量动态生成相同数量的小圆点
     */
    creatCircle() {
        const _circle = document.createElement('div')

        _circle.setAttribute('class', 'silder-circle')

        for (let i = 0; i < this.len; i++) {
            let _item = document.createElement('div')
            i == 0 ? _item.setAttribute('class', 'circle-item circle-item-active')
                : _item.setAttribute('class', 'circle-item')
            _circle.appendChild(_item)
        }
        this._box.appendChild(_circle)
    }


    /**
     * 图片滑动
     * @param {string} direction 滑动方向
     *  'left':向左滑(默认),'right':向右滑 
     */
    round(direction) {
        const dir = direction || 'left'
        const max_width = this.len * this.width
        const width = this.width
        const _content = this._content
        const speed = this.speed;
        const time = this.time;

        let timer

        if (dir == 'left') {
            //克隆第一个li节点，实现无缝连接滑动
            const _first_li = this._li[0].cloneNode(true);
            this._content.appendChild(_first_li);

            let left = Math.abs(_content.offsetLeft)
            let num = 0;

            function animate() {
                if (num <= max_width) {
                    _content.style.left = - num + 'px';

                    if (num % width == 0) {
                        cancelAnimationFrame(timer)
                        setTimeout(() => {
                            timer = requestAnimationFrame(animate);
                        }, time)
                    } else {
                        timer = requestAnimationFrame(animate);
                    }
                    num += speed;
                } else {
                    _content.style.left = 0;
                    num = 0;
                    timer = requestAnimationFrame(animate);
                }
            }
            animate();
        }
    }

    initCarousel() {
        this.setBoxSize()
        this.creatCircle()
        this.round()
    }
}