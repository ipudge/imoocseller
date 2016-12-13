<template>
  <div class="cart-control">
    <transition name="move">
      <div class="decrease" v-show="food.count > 0" @click="decreaseCount($event)">
        <i class="icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="num" v-show="food.count > 0">
      {{food.count}}
    </div>
    <div class="add" @click="addCount($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import bus from '../emptyVue';

  export default {
    methods: {
      addCount (e) {
        if (!e._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count++;
          this.$set(this.food, 'count', this.food.count);
        } else {
          this.$set(this.food, 'count', 1);
        }
        console.log(this.food.count);
        bus.$emit('drop', e);
      },
      decreaseCount (e) {
        if (!e._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
          this.$set(this.food, 'count', this.food.count);
        } else {
          this.$set(this.food, 'count', 0);
        }
        console.log(this.food.count);
      }
    },
    props: ['food']
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cart-control
    font-size: 0
    .add
      display: inline-block
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
      padding: 6px
      width: 36px
      height: 36px
      box-sizing: border-box
    .decrease
      display: inline-block
      padding: 6px
      box-sizing: border-box
      transition: all 0.4s linear
      .icon-remove_circle_outline
        display:inline-block
        font-size: 24px
        line-height: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
      &.move-enter-active
        opacity: 1
        transform: translate3d(0, 0, 0)
        .icon-remove_circle_outline
          transform: rotate(0)
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .icon-remove_circle_outline
          transform: rotate(180deg)
    .num
      display: inline-block
      vertical-align: top
      box-sizing: border-box
      width: 12px
      line-height: 36px
      height: 36px
      font-size: 10px
      color: rgb(147, 153, 159)
</style>
