<template>
  <div class="shop-cart">
    <div class="cart-left">
      <div class="icon-wrapper" :class="{'active': totalCount > 0}">
        <i class="icon-shopping_cart"></i>
        <span class="totalCount" v-if="totalCount > 0">{{totalCount}}</span>
      </div>
      <div class="priceNow" :class="{'active': totalCount > 0}">￥{{priceNow}}</div>
      <div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
    </div>
    <div class="cart-right" :class="{'active': priceNow >= seller.minPrice}">
      <span class="text">
        {{payDesc}}
      </span>
    </div>
    <div class="ball-cotainer">
      <transition v-for="ball in balls" name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter"
                  v-on:after-enter="afterEnter">
        <div class="ball" v-show="ball.show">
          <div class="inner"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import bus from '../emptyVue';

  export default {
    created () {
      bus.$on('drop', (e) => {
        let init = false;
        this.balls.forEach((ball) => {
          if (!ball.show && !init) {
            ball.show = true;
            ball.el = e.target;
            this.dropBalls.push(ball);
            init = true;
          }
        });
      });
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: []
      };
    },
    props: ['seller', 'foods'],
    computed: {
      priceNow () {
        let price = 0;
        this.foods.forEach((food) => {
          price += food.price * food.count;
        });
        return price;
      },
      totalCount () {
        let totalCount = 0;
        this.foods.forEach((food) => {
          totalCount += food.count;
        });
        return totalCount;
      },
      payDesc () {
        if (!this.priceNow) {
          return `${this.seller.minPrice}元起送`;
        } else if (this.priceNow > 0 && this.priceNow < this.seller.minPrice) {
          let minusPrice = this.seller.minPrice - this.priceNow;
          return `还差${minusPrice}元起送`;
        } else {
          return '去结算';
        }
      }
    },
    methods: {
      beforeEnter (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transfrom = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter (el, done) {
        /* eslint-disable no-unused-vars */
        let elHeight = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transfrom = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
        done();
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shop-cart
    display: flex
    position: fixed
    bottom: 0
    width: 100%
    height: 48px
    background: #141d27
    font-size: 0
    .cart-left
      display: inline-block
      vertical-align: top
      flex: 1
      .icon-wrapper
        display: inline-block
        position: relative
        top: -10px
        margin: 0 12px
        width: 56px
        height: 56px
        border-radius: 50%
        background: #141d27
        box-sizing: border-box
        &.active
          .icon-shopping_cart
            background: rgb(0, 160, 220)
            color: rgb(255, 255, 255)
        .icon-shopping_cart
          background: #2b343c
          display: inline-block
          margin: 6px
          box-sizing: border-box
          height: 44px
          width: 44px
          border-radius: 50%
          line-height: 44px
          text-align: center
          font-size: 24px
          color: #80858a
        .totalCount
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 16px
          line-height: 16px
          font-size: 9px
          color: rgb(255, 255, 255)
          font-weight: 700
          border-radius: 12px
          text-align: center
          background: rgb(240, 20, 20)
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .priceNow
        display: inline-block
        vertical-align: top
        margin-top: 12px
        line-height: 24px
        padding-right: 12px
        box-sizing: border-box
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        font-size: 16px
        font-weight: 700
        color: rgba(255, 255, 255, 0.4)
        &.active
          color: rgb(255, 255, 255)
      .desc
        display: inline-block
        vertical-align: top
        color: rgba(255, 255, 255, 0.4)
        line-height: 48px
        font-size: 12px
        margin-left: 12px
    .cart-right
      display: inline-block
      flex: 0 0 105px
      width: 105px
      font-size: 12px
      line-height: 48px
      font-weight: 700
      text-align: center
      color: rgba(255, 255, 255, 0.4)
      background: #2b333b
      &.active
        background: #00b43c
        color: #fff
    .ball-cotainer
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        &.drop-leave-active
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s
</style>
