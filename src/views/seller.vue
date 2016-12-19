<template>
  <div class="sellers-wrapper">
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
    <div class="sellers-notice" v-if='seller.bulletin||seller.supports'>
      <div class="sellers-bulletin border-1px" v-if='seller.bulletin'>
        <h2 class="name">公告与活动</h2>
        <div class="bulletin">
          <p class="text">{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="sellers-supports" v-if='seller.supports'>
        <ul>
          <li class="support-item border-1px" v-for="support in seller.supports">
            <span class="icon" :class="classList[support.type]"></span>
            <span class="text">{{support.description}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="sellers-pics" v-if="seller.pics">
      <h2 class="name">商家实景</h2>
      <div class="pic-wrapper">
        <ul>
          <li class="pic-item" v-for="img in seller.pics">
            <img :src="img" width="120" height="90" class="img">
          </li>
        </ul>
      </div>
    </div>
    <div class="sellers-infos" v-if="seller.infos">
      <h2 class="name border-1px">
        商家信息
      </h2>
      <ul>
        <li class="info-item border-1px" v-for="info in seller.infos">
          {{info}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star';

  export default {
    created () {
      this.classList = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
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
    width: 100%
    background: #f3f5f7
    overflow: hidden
    .sellers-header
      position: relative
      margin-bottom: 16px
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
            margin-bottom: 4px
            color: rgb(147, 153, 159)
          .desc
            display: block
            font-size: 10px
            vertical-align: bottom
            height: 24px
            color: rgb(7, 17, 27)
            .num
              line-height: 24px
              font-size: 24px
              font-style: normal
    .sellers-notice
      margin: 16px 0
      padding: 18px 18px 0 18px
      background: #fff
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .sellers-bulletin
        padding-bottom: 16px
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          display: block
          margin-bottom: 8px
          font-size: 14px
          line-height: 14px
          color: rgb(7, 17, 27)
        .bulletin
          padding: 0 12px
          .text
            font-size: 12px
            line-height: 24px
            color: rgb(240, 20, 20)
      .sellers-supports
        .support-item
          padding: 16px 12px
          font-size: 0
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
          .icon
            display: inline-block
            vertical-align: top
            width: 16px
            height: 16px
            margin-right: 6px
            background-size: 16px 16px
            &.decrease
              bg-image('../components/header/decrease_2')
            &.discount
              bg-image('../components/header/discount_2')
            &.special
              bg-image('../components/header/special_2')
            &.invoice
              bg-image('../components/header/invoice_2')
            &.guarantee
              bg-image('../components/header/guarantee_2')
          .text
            display: inline-block
            vertical-align: top
            font-size: 12px
            line-height: 16px
    .sellers-pics
      margin: 16px 0
      padding: 18px 0 18px 18px
      background: #fff
      .name
        display: block
        margin-bottom: 8px
        font-size: 14px
        line-height: 14px
        color: rgb(7, 17, 27)
      .pic-wrapper
        height: 90px
        overflow: hidden
        .pic-item
          display: inline-block
          margin-right: 6px
          &:last-child
            margin-right: 0
    .sellers-infos
      margin-top: 16px
      padding: 18px 18px 0 18px
      background: #fff
      .name
        display: block
        padding-bottom: 12px
        font-size: 14px
        line-height: 14px
        color: rgb(7, 17, 27)
        border-1px(rgba(7, 17, 27, 0.1))
      .info-item
        display: block
        padding: 16px 12px
        font-size: 12px
        color: rgb(7, 17, 27)
        line-height: 16px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
</style>
