<template>
  <div class="select-control-wrapper">
    <div class="select-box border-1px">
      <span class="select-item all" @click="changeType(99)">{{rules[99]}}{{ratings.length}}</span>
      <span class="select-item good" @click="changeType(0)">{{rules[0]}}{{goodCount}}</span>
      <span class="select-item bad" @click="changeType(1)">{{rules[1]}}{{badCount}}</span>
    </div>
    <div class="operate-wrapper" @click="toggleIsEmpty">
      <i class="icon-check_circle" :class="{'active' :!isEmpty}"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const goodCode = 0;
  const badCode = 1;

  export default {
    props: {
      'rules': {
        type: Object,
        default: function () {
          return {};
        }
      },
      isEmpty: {
        type: Boolean,
        default: false
      },
      'ratings': {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    computed: {
      goodCount () {
        let list = [];
        this.ratings.forEach((rating) => {
          if (rating.rateType === goodCode) {
            list.push(rating);
          }
        });
        return list.length;
      },
      badCount () {
        let list = [];
        this.ratings.forEach((rating) => {
          if (rating.rateType === badCode) {
            list.push(rating);
          }
        });
        return list.length;
      }
    },
    methods: {
      changeType (type) {
        this.$emit('changeType', type);
      },
      toggleIsEmpty () {
        this.$emit('toggleIsEmpty');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"

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
</style>