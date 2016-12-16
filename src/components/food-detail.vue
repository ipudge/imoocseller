<template>
  <transition name="slideInRight">
    <div class="food-detail" v-show="detailShow" ref="foodDetail">
      <div>
        <div class="detail-header">
          <div class="background">
            <img :src="food.image" width="100%" height="375">
          </div>
          <div class="back" @click="hideFoodDetail">
            <i class="icon-arrow_lift"></i>
          </div>
          <div class="detail">
            <div class="name">{{food.name}}</div>
            <div class="text">
              <span class="num">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="new">￥{{food.price}}</span>
              <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartControl-wrapper" v-show="food.count != undefined && food.count > 0 ">
              <cart-control :food="food"></cart-control>
            </div>
            <div class="addItem" v-show="food.count == 0|| food.count ===undefined" @click="addFood">加入购物车</div>
          </div>
        </div>
        <div class="content" v-if="food.info">
          <h2 class="title">商品介绍</h2>
          <div class="text"><p class="info">{{food.info}}</p></div>
        </div>
        <div class="ratings-wrapper">
          <h2 class="title">商品评价</h2>
          <v-ratings :ratings="food.ratings" :rules="rules" :event="scrollRefresh"></v-ratings>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import ratings from './ratings';
  import BScroll from 'better-scroll';
  import cartControl from 'components/cart-control';
  import bus from '../emptyVue';

  export default {
    created () {
      bus.$on(this.scrollRefresh, () => {
        this.$nextTick(() => {
          this.foodDetailScroll.refresh();
        });
      });
    },
    props: ['food', 'detailShow'],
    data () {
      return {
        rules: {
          0: '推荐',
          1: '吐槽'
        },
        scrollRefresh: 'refreshFoodDetail'
      };
    },
    components: {
      'v-ratings': ratings,
      cartControl
    },
    methods: {
      hideFoodDetail () {
        bus.$emit('closeFoodDetail');
      },
      addFood () {
        this.$set(this.food, 'count', 1);
      }
    },
    watch: {
      detailShow: {
        handler () {
          if (this.foodDetailScroll) {
            this.$nextTick(() => {
              this.foodDetailScroll.refresh();
            });
          } else {
            this.$nextTick(() => {
              this.foodDetailScroll = new BScroll(this.$refs.foodDetail, {
                click: true
              });
            });
          }
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food-detail
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 48px
    z-index: 10
    background: #f3f5f7
    transition: all 0.5s
    &.slideInRight-enter-active
      transform: translate3d(0, 0, 0)
    &.slideInRight-enter, &.slideInRight-leave-active
      transform: translate3d(100%, 0, 0)
    .detail-header
      width: 100%
      background: #fff
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      position: relative
      .background
        height: 375px
        width: 100%
      .back
        position: absolute
        left: 10px
        top: 15px
        .icon-arrow_lift
          display: inline-block
          padding: 6px
          font-size: 18px
          color: #fff
          line-height: 24px

      .detail
        box-sizing: border-box
        padding: 18px
        width: 100%
        .name
          font-size: 14px
          line-height: 14px
          color: rgb(7, 17, 27)
          font-weight: 700
        .text
          font-size: 0
          margin: 8px 0 18px 0
          color: rgb(147, 153, 159)
          .num, .rating
            display: inline-block
            font-size: 10px
            line-height: 10px
          .rating
            margin-left: 12px
        .price
          font-size: 0
          .new
            display: inline-block
            font-size: 14px
            line-height: 24px
            font-weight: 700
            color: rgb(240, 20, 20)
          .old
            display: inline-block
            text-decoration: line-through;
            font-size: 10px
            color: rgb(147, 153, 159)
            font-weight: 700
            line-height: 24px
            margin-left: 12px
      .cartControl-wrapper
        position: absolute
        bottom: 18px
        right: 18px
      .addItem
        position: absolute
        bottom: 23px
        right: 23px
        box-sizing: border-box
        width: 74px
        height: 24px
        line-height: 24px
        font-size: 10px
        color: #fff
        text-align: center
        border-radius: 12px
        background: rgb(0, 160, 220)
    .content
      box-sizing: border-box
      margin: 18px 0
      padding: 18px
      background: #fff
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      .title
        font-size: 14px
        line-height: 14px
        color: rgb(7, 17, 27)
      .text
        margin: 6px
        .info
          font-size: 12px
          line-height: 24px
          color: rgb(77, 85, 93)
    .ratings-wrapper
      box-sizing: border-box
      margin-top: 18px
      background: #fff
      .title
        padding: 18px 18px 6px 18px
        font-size: 14px
        line-height: 14px
        color: rgb(7, 17, 27)
</style>
