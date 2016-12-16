<template>
  <div class="sellers-wrapper" ref="sellersWrapper">
    <div class="sellers-header">
      <div class="sellers-info">
        <h2 class="name">{{seller.name}}</h2>
        <div class="sellers-ratings">
          <div class="star-wrapper">
            <v-star :size="36" :score="seller.score"></v-star>
          </div>
          <div class="rating-count">({{seller.ratingCount}})</div>
          <div class="sell-count">月售{{seller.sellCount}}单</div>
        </div>
      </div>
      <div class="favor-wrapper" @click="toggleFavor">
        <i class="icon-favorite" :class="{'active': isFavor}"></i>
        <span class="text">{{collectionDesc}}</span>
      </div>
      <div class="Shipping-info">
        <div class="Shipping-item">
          <span class="title">起送价</span>
          <span class="desc">
            <em class="num">{{seller.minPrice}}</em>元
          </span>
        </div>
        <div class="Shipping-item">
          <span class="title">商家配送</span>
          <span class="desc">
            <em class="num">{{seller.deliveryPrice}}</em>元
          </span>
        </div>
        <div class="Shipping-item">
          <span class="title">平均送达</span>
          <span class="desc">
            <em class="num">{{seller.deliveryTime}}</em>分钟
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star';

  export default {
    data () {
      return {
        isFavor: false
      };
    },
    props: ['seller'],
    computed: {
      collectionDesc () {
        return this.isFavor ? '已收藏' : '收藏';
      }
    },
    methods: {
      toggleFavor () {
        this.isFavor = !this.isFavor;
      }
    },
    components: {
      'v-star': star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"

  .sellers-wrapper
    position: absolute
    top: 174px
    bottom: 48px
    width: 100%
    background: #f3f5f7
    overflow: hidden
    .sellers-header
      position: relative
      padding: 18px
      background: #fff
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .sellers-info
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          display: block
          margin-bottom: 8px
          font-size: 14px
          line-height: 14px
          color: rgb(7, 17, 27)
        .sellers-ratings
          font-size: 0
          .star-wrapper
            display: inline-block
            vertical-align: top
          .rating-count
            display: inline-block
            vertical-align: top
            font-size: 10px
            color: rgb(77, 85, 93)
            line-height: 18px
            margin-left: 8px
          .sell-count
            display: inline-block
            vertical-align: top
            font-size: 10px
            color: rgb(77, 85, 93)
            line-height: 18px
            margin-left: 12px
      .favor-wrapper
        position: absolute
        right: 18px
        top: 18px
        width: 50px
        text-align: center
        .icon-favorite
          display: block
          margin: 0 auto 4px
          font-size: 24px
          line-height: 24px
          color: #d4d6d9
          &.active
            color: rgb(240, 20, 20)
        .text
          font-size: 10px
          line-height: 10px
          color: rgb(77, 85, 93)

      .Shipping-info
        display: flex
        padding-top: 18px
        .Shipping-item
          flex: 1
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          text-align: center
          &:last-child
            border-right: none
          .title
            display: block
            font-size: 10px
            line-height: 10px
            color: rgb(147, 153, 159)
</style>
