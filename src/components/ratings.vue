<template>
  <div class="ratings-wrapper">
    <div class="select-box border-1px">
      <span class="select-item all" @click="changeType(99)">全部{{ratings.length}}</span>
      <span class="select-item good" @click="changeType(0)">{{rules[0]}}{{goodCount}}</span>
      <span class="select-item bad" @click="changeType(1)">{{rules[1]}}{{badCount}}</span>
    </div>
    <div class="operate-wrapper" @click="toggleIsEmpty">
      <i class="icon-check_circle" :class="{'active' :!isEmpty}"></i>
      <span class="text">只看有内容的评价</span>
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
  import bus from '../emptyVue';

  export default {
    created () {
      this.ratingsList = this.ratings;
    },
    data () {
      return {
        isEmpty: false,
        activeRateType: 99
      };
    },
    props: {
      'ratings': {
        type: Array,
        default: function () {
          return [];
        }
      },
      'rules': {
        type: Object,
        default: function () {
          return {};
        }
      },
      'event': String
    },
    computed: {
      ratingsList () {
        let list = [];
        if (this.activeRateType === 99) {
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
      },
      goodCount () {
        let list = [];
        this.ratings.forEach((rating) => {
          if (rating.rateType === 0) {
            list.push(rating);
          }
        });
        return list.length;
      },
      badCount () {
        return this.ratings.length - this.goodCount;
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
          bus.$emit(this.event);
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"

  .ratings-wrapper
    background: #fff
    .select-box
      padding: 12px 0 18px
      margin: 0 18px
      font-size: 0
      border-1px(rgba(7, 17, 27, 0.1))
      .select-item
        display: inline-block
        text-align: center
        font-size: 12px
        line-height: 16px
        padding: 8px 12px
        margin-right: 8px
        border-radius: 1px
        &.all
          color: #fff
          background: rgb(0, 160, 220)
        &.good
          color: rgb(77, 85, 93)
          background: rgba(0, 160, 220, 0.2)
        &.bad
          color: rgb(77, 85, 93)
          background: rgba(77, 85, 93, 0.2)

    .operate-wrapper
      padding: 12px 18px
      font-size: 0
      border-bottom: 1px solid rgba(7, 17, 27, 0.2)
      .icon-check_circle
        display: inline-block
        vertical-align: top
        font-size: 24px
        line-height: 24px
        color: rgb(147, 153, 159)
        margin-right: 4px
        &.active
          color: #00c850
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
        line-height: 24px
        color: rgb(147, 153, 159)
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
