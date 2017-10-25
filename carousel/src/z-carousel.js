function zCarousel(obj){
    const silder = {
        width : obj.width || '500px',
        height : obj.height || '300px'
    }

    /**
     * 设置轮播区域宽高
     * 设置所有li标签的宽度
     */
    function setBoxSize(){
        const _box = document.querySelector('.silder-box');
        const _li = document.querySelectorAll('.silder-box .silder-item');
        
        _box.style.height = silder.height;
        _box.style.width = silder.width;

        _li.forEach(_i=>{
            _i.style.width = silder.width;
        });
    }

    /**
     * 根据li标签的数量动态生成相同数量的小圆点
     */
    function creatCircle(){
        const _box = document.querySelector('.silder-box');
        const len = document.querySelectorAll('.silder-item').length;
        const _circle = document.createElement('div');
        
        _circle.setAttribute('class','silder-circle');
        
        for(let i=0;i<len;i++){
            let _item = document.createElement('div');
            i == 0 ? _item.setAttribute('class','circle-item circle-item-active')
                : _item.setAttribute('class','circle-item');
            _circle.appendChild(_item); 
        }
        _box.appendChild(_circle); 
    }

    /**
     * 图片滑动
     * @param {string} direction 滑动方向
     *  'left':向左滑(默认),'right':向右滑 
     */
    function round(direction){
        const dir = direction || 'left';

    }

    function initCarousel(){
        setBoxSize();
        creatCircle();
    }

    initCarousel();

}