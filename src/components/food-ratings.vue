<template>
  <div class="ratings-wrapper">
    <div class="select-control">
      <select-control @changeType="changeType" @toggleIsEmpty="toggleIsEmpty" :rules="rules" :ratings="ratings" :isEmpty="isEmpty"></select-control>
    </div>
    <div class="rating-list">
      <ul>
        <li v-for="rating in ratingsList" class="rating-item">
          <div class="time">{{rating.rateTime | fmtDate}}</div>
          <div class="user">
            <span class="name">{{rating.username}}</span>
            <img :src="rating.avater" width="12" height="12" class="avater">
          </div>
          <div class="text">
            <p class="comment">
              <i class="icon-thumb_down" v-if="rating.rateType === 1"></i>
              <i class="icon-thumb_up" v-if="rating.rateType === 0"></i>
              {{rating.text}}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import selectControl from './select-control.vue';

  const allCode = 99;

  export default {
    data () {
      return {
        isEmpty: false,
        activeRateType: allCode,
        rules: {
          0: '推荐',
          1: '吐槽',
          99: '全部'
        }
      };
    },
    components: {
      selectControl
    },
    props: {
      'ratings': {
        type: Array,
        default: function () {
          return [];
        }
      }
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
      changeType (rateType) {
        this.activeRateType = rateType;
      },
      toggleIsEmpty () {
        this.isEmpty = !this.isEmpty;
      }
    },
    watch: {
      ratingsList: {
        handler () {
          this.$emit('refreshFoodDetail');
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"

  .ratings-wrapper
    background: #fff
    .rating-list
      padding: 0 18px
      .rating-item
        position: relative
        padding: 16px 0
        border-1px(rgba(7, 17, 27, 0.1))
        &.last-child
          border-none()
        .time
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 12px
        .user
          position: absolute
          right: 18px
          top: 16px
          font-size: 0
          .name
            display: inline-block
            vertical-align: top
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 12px
            margin-right: 6px
          .avater
            display: inline-block
            vertical-align: top
            border-radius: 50%
        .text
          margin-top: 6px
          .icon-thumb_down
            font-size: 12px
            line-height: 24px
            color: rgb(147, 153, 159)
          .icon-thumb_up
            font-size: 12px
            line-height: 24px
            color: rgb(0, 160, 220)
          .comment
            text-indent: 4px
            color: rgb(7, 17, 27)
            font-size: 12px
            line-height: 16px
</style>
