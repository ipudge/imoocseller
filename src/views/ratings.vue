<template>
  <div class="rating-pages">
    <div class="rating-content">
      <div class="rating-header">
        <div class="rating-header-left">
          <h2 class="score">{{seller.score}}</h2>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="rating-header-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <div class="star-wrapper">
              <v-star :size="36" :score="seller.serviceScore"></v-star>
            </div>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评价</span>
            <div class="star-wrapper">
              <v-star :size="36" :score="seller.foodScore"></v-star>
            </div>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="dilivery-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="ratings-wrapper">
        <div class="select-control">
          <select-control @changeType="changeType" @toggleIsEmpty="toggleIsEmpty" :rules="rules" :ratings="ratings"
                          :isEmpty="isEmpty"></select-control>
        </div>
        <div class="user-rating-list">
          <ul>
            <li class="user-rating-item" v-for="rating in ratingsList">
              <div class="avatar">
                <img :src="rating.avatar" alt="头像" width="28" height="28"/>
              </div>
              <div class="comment">
                <h3 class="title"><span class="time">{{rating.rateTime | fmtDate}}</span>{{rating.username}}</h3>
                <div class="star-wrapper">
                  <v-star :size="24" :score="rating.score"></v-star>
                  <span class="dilivery-time">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <div class="text">{{rating.text}}</div>
                <div class="favor">
                  <i class="icon-thumb_down" v-if="rating.rateType === 1"></i>
                  <i class="icon-thumb_up" v-if="rating.rateType === 0"></i>
                  <span class="recommend" v-for="recommend in rating.recommend">{{recommend}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import selectControl from 'components/select-control.vue';
  import star from 'components/star';

  const NO_ERROR = 0;
  const allCode = 99;

  export default {
    data () {
      return {
        isEmpty: false,
        ratings: [],
        rules: {
          0: '满意',
          1: '不满意',
          99: '全部'
        },
        sellerRatingsScroll: '',
        activeRateType: allCode
      };
    },
    props: ['seller'],
    created () {
      this._fecthRatings();
    },
    components: {
      selectControl,
      'v-star': star
    },
    computed: {
      ratingsList () {
        let list = [];
        if (this.activeRateType === allCode) {
          list = this.ratings;
        } else {
          this.ratings.forEach((rating) => {
            if (rating.rateType === this.activeRateType) {
              list.push(rating);
            }
          });
        }
        if (this.isEmpty) {
          return list;
        } else {
          let ratingsList = [];
          list.forEach((item) => {
            if (item.text) {
              ratingsList.push(item);
            }
          });
          return ratingsList;
        }
      }
    },
    methods: {
      _fecthRatings () {
        this.$http.get('/api/ratings').then((response) => {
          let result = response.body;
          if (result.code === NO_ERROR) {
            this.ratings = result.data;
          }
        });
      },
      changeType (rateType) {
        this.activeRateType = rateType;
      },
      toggleIsEmpty () {
        this.isEmpty = !this.isEmpty;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"

  .rating-pages
    display: flex
    position: absolute
    top: 174px
    width: 100%
    background: #f3f5f7
    .rating-content
      width: 100%
      .rating-header
        display: flex
        margin-bottom: 16px
        padding: 18px 0
        width: 100%
        background: #fff
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .rating-header-left
          flex: 0 0 137px
          padding: 6px 0
          width: 137px
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          text-align: center
          .score
            margin-bottom: 6px
            line-height: 28px
            font-size: 24px
            color: #f90
          .title
            margin-bottom: 8px
            line-height: 12px
            font-size: 12px
            color: #07111b
          .rank
            line-height: 10px
            font-size: 10px
            color: #93999f
        .rating-header-right
          flex: 1
          padding: 6px 0 6px 24px
          .score-wrapper
            margin-bottom: 8px
            font-size: 0
            .title
              display: inline-block
              line-height: 18px
              vertical-align: top
              font-size: 12px
              color: #07111b
            .star-wrapper
              display: inline-block
              vertical-align: top
              margin: 0 12px
            .score
              display: inline-block
              line-height: 18px
              vertical-align: top
              font-size: 12px
              color: #f90
          .dilivery-wrapper
            font-size: 0
            .title
              line-height: 18px
              font-size: 12px
              color: #07111b
            .time
              margin-left: 12px
              font-size: 12px
              color: #93999f
      .ratings-wrapper
        background: #fff
        border-top: 1px solid rgba(7, 17, 27, 0.1)
        .select-control-wrapper
          padding-top: 6px
        .user-rating-item
          display: flex
          padding: 18px 0
          margin: 0 18px
          border-1px(rgba(7, 17, 27, 0.1))
          .avatar
            flex: 0 0 28px
            width: 28px
            img
              border-radius: 50%
          .comment
            box-sizing: border-box
            flex: 1
            margin-left: 12px
            .title
              font-size: 10px
              line-height: 12px
              .time
                float: right
                font-size: 10px
                font-weight: 200
                line-height: 12px
                color: rgb(147, 153, 159)
            .star-wrapper
              margin: 4px 0 6px
              .star
                display: inline-block
                vertical-align: top
              .dilivery-time
                display: inline-block
                vertical-align: top
                font-size: 10px
                font-weight: 200
                line-height: 12px
                color: rgb(147, 153, 159)
            .text
              font-size: 12px
              line-height: 18px
            .favor
              margin-top: 8px
              .icon-thumb_down
                display: inline-block
                vertical-align: top
                font-size: 12px
                line-height: 24px
                color: rgb(147, 153, 159)
              .icon-thumb_up
                display: inline-block
                vertical-align: top
                font-size: 12px
                line-height: 24px
                color: rgb(0, 160, 220)
              .recommend
                display: inline-block
                font-size: 9px
                line-height: 16px
                color: rgb(147, 153, 159)
                padding: 0 6px
                margin-left: 8px
                border: 1px solid rgba(7, 17, 27, 0.1)
                border-radius: 2px
</style>
