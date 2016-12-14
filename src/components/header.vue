<template>
  <div class="header">
    <div class="seller">
      <div class="logo">
        <img :src="seller.avatar" width="64" height="64" alt="seller.name">
      </div>
      <div class="info">
        <div class="brand"><span class="icon"></span><span class="title">{{seller.name}}</span></div>
        <div class="delivery"><span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span></div>
        <div class="privilege" v-if="seller.supports"><span class="icon"
                                                            :class="classList[seller.supports[0].type]"></span><span
          class="desc">{{seller.supports[0].description}}</span></div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin" @click="showDetail">
      <span class="icon"></span><span class="text">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" alt="seller.name">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-content clearfix">
          <div class="detail-main">
            <h1>{{seller.name}}</h1>
            <div class="star-wrapper">
              <v-star :size="48" :score="seller.score"></v-star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if='seller.supports' class="support">
              <li class="support-item" v-for="support in seller.supports">
                <span class="icon" :class="classList[support.type]"></span>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家信息</div>
              <div class="line"></div>
            </div>
            <div class="bulletin-wrapper">
              <p class="text">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star';

  export default {
    data () {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      },
      closeDetail () {
        this.detailShow = false;
      }
    },
    props: ['seller'],
    created () {
      this.classList = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      'v-star': star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"

  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    .seller
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .logo
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .info
        display: inline-block
        margin-left: 16px
        .icon
          display: inline-block
          background-repeat: no-repeat
          vertical-align: top
        .brand
          margin: 2px 0 8px 0
          .icon
            width: 30px
            height: 18px
            bg-image('./header/brand')
            background-size: 30px 18px
          .title
            margin-left: 6px
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .delivery
          margin-bottom: 10px
          font-size: 12px
        .privilege
          .icon
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            &.decrease
              bg-image('./header/decrease_1')
            &.discount
              bg-image('./header/discount_1')
            &.special
              bg-image('./header/special_1')
            &.invoice
              bg-image('./header/invoice_1')
            &.guarantee
              bg-image('./header/guarantee_1')
          .desc
            font-size: 10px
            line-height: 12px
      .support-count
        position: absolute
        line-height: 24px
        padding: 0 8px
        right: 12px
        bottom: 18px
        height: 24px
        border-radius: 7px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
    .bulletin
      position: relative
      height: 28px
      line-height: 28px
      background: rgba(7, 17, 27, 0.2)
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      .icon
        display: inline-block
        vertical-align: top
        margin-top: 8px
        margin-right: 4px
        width: 22px
        height: 12px
        bg-image('./header/bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .text
        vertical-align: top
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        top: 8px
        right: 12px
        font-size: 10px
    .background
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7, 17, 27, 0.8)
      transition: opacity .5s
      backdrop-filter: blur(10px)
      &.fade-enter, &.fade-leave-active
        opacity: 0
      .detail-content
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          h1
            font-size: 16px
            line-height: 16px
            font-weight: 700
            text-align: center
          .star-wrapper
            margin-top: 16px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px auto
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding: 0 12px
              font-size: 14px
              line-height: 14px
              font-weight: 700
          .support
            width: 80%
            margin: 0 auto
            .support-item
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                vertical-align: top
                width: 16px
                height: 16px
                margin-right: 6px
                background-size: 16px 16px
                &.decrease
                  bg-image('./header/decrease_2')
                &.discount
                  bg-image('./header/discount_2')
                &.special
                  bg-image('./header/special_2')
                &.invoice
                  bg-image('./header/invoice_2')
                &.guarantee
                  bg-image('./header/guarantee_2')
              .text
                display: inline-block
                vertical-align: top
                font-size: 12px
                line-height: 16px
          .bulletin-wrapper
            width: 80%
            margin: 0 auto
            padding: 0 12px
            .text
              font-size: 12px
              line-height: 24px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        .icon-close
          font-size: 32px
</style>
