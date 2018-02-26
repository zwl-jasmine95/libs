# JavaScript Components
Common components based on JS

## Carousel
> **params**：
- //——播放属性
- width {number} 轮播区域宽度（px）<默认500>
- height {number} 轮播区域高度（px）<默认300>
- speed {string} 轮播速度(slow|normal|fast) <默认normal>
- time {number} 停顿时间（ms）<默认3000>
- //——其他配置
- isRound {boolen} 是否自动轮播 <默认true>
- arrowSlider {boolen} 是否能够手动切换滑块 <默认true>
- circle {boolen} 是否包含滑动小圆点 <默认true>
- circleBtn {boolen} 点击原点是否能切换滑块 <默认true>

> **START**

```html
<link rel="stylesheet" href="./src/z-carousel.css">
<script src="./src/z-carousel.js"></script>
```

> **config**

```js
let obj = {
    width:600,
    height:400,
    speed:'fast',
    time:2000,
    isRound:true
}
let carousel = new zCarousel(obj)
carousel.initCarousel()
```

[demo](https://zwl-jasmine95.github.io/libs/carousel/demo.html)

---

## Dialog

