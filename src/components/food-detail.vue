<template>
  <div class="food-detail" v-show="detailShow">
    <div class="header">
      <div class="background">
        <img :src="food.image">
      </div>
      <div class="back">
        <i></i>
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
        <div class="cartControl-wrapper">
          <cart-control :food="item"></cart-control>
        </div>
        <div class="addItem">加入购物车</div>
      </div>
      <div class="content">
        <h2>商品介绍</h2>
        <div class="text">{{food.info}}</div>
      </div>
      <div class="ratings-wrapper">
        <h2>商品评价</h2>
        <v-ratings :ratings="food.ratings" :rules="rules"></v-ratings>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ratings from './ratings'

  export default {
    props: ['food'],
    data () {
      return {
        rules: {
          0: '推荐',
          1: '吐槽'
        }
      };
    },
    components: {
      'v-ratings': ratings
    }
  }
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
    transform: translate3d(0, 0, 0)
    &.slideInRight-enter, &.slideInRight-leave-active
      transform: translate3d(100%, 0, 0)
    .header
      width : 100%
      background : #fff
</style>
