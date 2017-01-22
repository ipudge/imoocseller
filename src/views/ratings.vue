<template>
  <div class="rating-pages" ref="ratingPages">
    <div>
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
            <span class="time">{{seller.deliveryTime}}</span>
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

            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import selectControl from 'components/select-control.vue';
  import BScroll from 'better-scroll';
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
            this._initScroll();
          }
        });
      },
      changeType (rateType) {
        this.activeRateType = rateType;
      },
      toggleIsEmpty () {
        this.isEmpty = !this.isEmpty;
      },
      _initScroll () {
        this.$nextTick(() => {
          this.sellerRatingsScroll = new BScroll(this.$refs.ratingPages, {
            click: true
          });
        });
      }
    },
    watch: {
      ratings: {
        handler () {
          this.$nextTick(() => {
            this.sellerRatingsScroll.refresh();
          });
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .rating-pages
    display: flex
    position: absolute
    top: 174px
    bottom: 0
    width: 100%
    overflow: hidden
    background: #f3f5f7
    .rating-header
      display: flex
      margin-bottom: 16px 0
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
</style>
