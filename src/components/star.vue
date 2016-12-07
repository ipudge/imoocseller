<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="starClass in starClassList" :class="starClass"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const STAR_LENGTH = 5;

  const STAR_ON = 'on';
  const STAR_HALF = 'half';
  const STAR_OFF = 'off';

  export default {
    props: ['size', 'score'],
    computed: {
      starType () {
        return 'star' + this.size;
      },
      starClassList () {
        let result = [];
        let fomatScore = Math.floor(this.score * 2) / 2;
        let isInteger = fomatScore % 1 !== 0;
        let scoreLength = Math.floor(fomatScore);

        for (let i = 0; i < scoreLength; i++) {
          result.push(STAR_ON);
        }

        if (isInteger) {
          result.push(STAR_HALF);
        }

        while (result.length < STAR_LENGTH) {
          result.push(STAR_OFF);
        }

        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"

  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
      &:last-child
        margin-right: 0

  .star24
    .star-item
      margin-right: 3px
      width: 10px
      height: 10px
      background-size: 10px 10px
      &.on
        bg-image('./star/star24_on')
      &.half
        bg-image('./star/star24_half')
      &.off
        bg-image('./star/star24_off')

  .star36
    .star-item
      margin-right: 6px
      width: 15px
      height: 15px
      background-size: 15px 15px
      &.on
        bg-image('./star/star36_on')
      &.half
        bg-image('./star/star36_half')
      &.off
        bg-image('./star/star36_off')

  .star48
    .star-item
      margin-right: 22px
      width: 20px
      height: 20px
      background-size: 20px 20px
      &.on
        bg-image('./star/star48_on')
      &.half
        bg-image('./star/star48_half')
      &.off
        bg-image('./star/star48_off')
</style>
