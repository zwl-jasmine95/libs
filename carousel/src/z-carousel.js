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
class zCarousel{
    constructor(obj){
        this.width = obj.width || 500
        this.height = obj.height || 300

        this._box = document.querySelector('#silder-box')
        this._content = document.querySelector('#silder-box .silder-content')
        this._li = document.querySelectorAll('#silder-box .silder-item')
        this.len = this._li.length;
    }
    /**
     * 设置轮播区域宽高
     * 设置所有li标签的宽度
     */
    setBoxSize(){
        this._box.style.height = this.height + 'px';
        this._box.style.width = this.width + 'px';

        this._li.forEach(_i=>{
            _i.style.width = this.width + 'px';
        });
    }

    /**
     * 根据li标签的数量动态生成相同数量的小圆点
     */
    creatCircle(){
        const _circle = document.createElement('div');
        
        _circle.setAttribute('class','silder-circle');
        
        for(let i=0;i<this.len;i++){
            let _item = document.createElement('div');
            i == 0 ? _item.setAttribute('class','circle-item circle-item-active')
                : _item.setAttribute('class','circle-item');
            _circle.appendChild(_item); 
        }
        this._box.appendChild(_circle); 
    }


    /**
     * 图片滑动
     * @param {string} direction 滑动方向
     *  'left':向左滑(默认),'right':向右滑 
     */
    round(direction){
        const dir = direction || 'left';
        const max_width = (this.len - 1) * this.width;
        if(dir == 'left'){
            let left = Math.abs(this._content.offsetLeft);
            if(left < max_width){
                this._content.style.left = -left - this.width + 'px';
            }else{
                this._content.style.left = 0;
            }
        }

    }

    carousel(){
        setInterval(()=>{
            this.round()
        },1000)
    }



    initCarousel(){
        this.setBoxSize();
        this.creatCircle();
        this.carousel();
    }

}