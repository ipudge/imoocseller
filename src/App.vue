<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{ path: '/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ path: '/ratings'}">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ path: '/seller'}">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from './components/header.vue';

  const NO_ERROR = 0;
  export default {
    data () {
      return {
        seller: {}
      };
    },
    components: {
      'v-header': Header
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        let result = response.body;
        if (result.code === NO_ERROR) {
          this.seller = result.data;
        }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
