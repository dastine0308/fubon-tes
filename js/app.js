var app = new Vue({
  el: '#app',
  data() {
    return {
      // scroll
      backFlag: false,
      // 螢幕寬
      screenWidth: document.body.clientWidth,
      // 螢幕高
      screenHeight: document.body.clientHeight,
      // is web
      isWeb: false,
    };
  },
  methods: {
    // 判斷尺寸 (web or mobile)
    renderResize() {
      let that = this;
      // 大於 768px (md-width) 視為網頁版
      if (this.screenWidth > 768) {
        that.isWeb = true;
      } else {
        that.isWeb = false;
      }
    },
    // 計算距離頂部的高度
    showBtn() {
      let that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      // 當高度大於 200 顯示回頂部，小於 200 則隱藏（默認隱藏）
      if (that.scrollTop > 200) {
        let that = this;
        that.backFlag = true;
      } else {
        that.backFlag = false;
      }
    },
    // 點擊返回頂部方法，計時器是為了過渡順滑
    backTop() {
      let that = this;
      let timer = setInterval(() => {
        let speed = Math.floor(-that.scrollTop / 10);
        //scrollTop獲取元素的滾動條的垂直位置，Math.floor() 向下取整
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + speed;
        //document.documentElement.scrollTop 獲取當前頁面的滾動條縱坐標位置
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 20);
    },
  },
  watch: {
    screenWidth(val) {
      let that = this;
      that.renderResize();
    },
  },
  mounted() {
    let that = this;
    // 判斷尺寸 (web or mobile)
    that.renderResize();
    //resize
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
    // scroll
    window.addEventListener('scroll', this.showBtn); //scroll 滾動事件
  },
  destroyed() {
    // 銷毀監聽事件,當我們離開這個頁面的時候，便會調用這個函數
    window.removeEventListener('scroll', this.showBtn);
  },
});
