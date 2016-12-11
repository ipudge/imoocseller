<template>
  <div class="goods">
    <div class="kinds" ref="kinds">
      <ul>
        <li v-for="(item, index) in goods" class="kind-item" @click="selectKind(index, $event)"
            :class="{'active': index == activeIndex}">
          <span class="text"><em v-if="item.type>0" class="icon" :class="classList[item.type]"></em>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="list" ref="list">
      <ul>
        <li v-for="item in goods" class="kind-goods">
          <h2 class="title">{{item.name}}</h2>
          <ul>
            <li class="good-item border-1px" v-for="food in item.foods">
              <div class="icon">
                <img :src="food.icon" width="57" height="57"/>
              </div>
              <div class="detail">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc">{{food.description}}</p>
                <p class="extra"><span class="count">月售{{food.sellCount}}</span>份好评率{{food.rating}}%</p>
                <p class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice>0">￥{{food.oldPrice}}</span>
                </p>
              </div>
              <div class="cart-wrapper">
                <cart-control :food="food"></cart-control>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart :seller="seller" :selectedFoods="selectedFoods"></shop-cart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopCart from 'components/shop-cart';
  import cartControl from 'components/cart-control';
  import bus from '../emptyVue';

  const NO_ERROR = 0;

  export default {
    data () {
      return {
        goods: [],
        activeIndex: 0,
        heightList: [],
        posY: 0
      };
    },
    created () {
      this.fetchData();
      this.classList = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      bus.$on('cleanShopCart', () => {
        this.selectedFoods.forEach((food) => {
          food.count = 0;
        });
      });
    },
    computed: {
      activeIndex () {
        for (let i = 0, length = this.heightList.length; i < length; i++) {
          let heightNow = this.heightList[i];
          let heightNext = this.heightList[i + 1];
          if (!heightNext || (this.posY >= heightNow && this.posY < heightNext)) {
            return i;
          }
        }
        return 0;
      },
      selectedFoods () {
        let selectedFoods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count > 0) {
              selectedFoods.push(food);
            }
          });
        });
        return selectedFoods;
      }
    },
    components: {
      shopCart,
      cartControl
    },
    props: ['seller'],
    methods: {
      fetchData () {
        this.$http.get('/api/goods').then((response) => {
          let result = response.body;
          if (result.code === NO_ERROR) {
            this.goods = result.data;
            this.$nextTick(() => {
              this._initScroll();
              this._initHeightList();
            });
          }
        });
      },
      _initScroll () {
        let that = this;
        that.kindsScroll = new BScroll(that.$refs.kinds, {
          click: true
        });
        that.listScroll = new BScroll(that.$refs.list, {
          probeType: 3,
          click: true
        });
        that.listScroll.on('scroll', (pos) => {
          that.posY = Math.abs(Math.round(pos.y));
        });
      },
      selectKind (index, e) {
        if (!e._constructed) {
          return;
        }
        this.listScroll.scrollTo(0, -this.heightList[index], 500);
      },
      _initHeightList () {
        let heightList = [];
        let height = 0;
        let goodItems = document.querySelectorAll('.kind-goods');
        heightList.push(height);
        for (let i = 0, length = goodItems.length; i < length; i++) {
          height += goodItems[i].clientHeight;
          heightList.push(height);
        }
        this.heightList = heightList;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 48px
    width: 100%
    overflow: hidden
    .kinds
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .kind-item
        display: table
        width: 100%
        height: 56px
        &.active
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;
        .text
          display: table-cell
          vertical-align: middle
          padding: 0 12px
          font-size: 12px
          line-height: 14px
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display: inline-block
            vertical-align: top
            margin-right: 2px
            width: 12px
            height: 12px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('./goods/decrease_3')
            &.discount
              bg-image('./goods/discount_3')
            &.special
              bg-image('./goods/special_3')
            &.invoice
              bg-image('./goods/invoice_3')
            &.guarantee
              bg-image('./goods/guarantee_3')
    .list
      flex: 1
      .title
        background: #f3f5f7
        color: rgb(147, 153, 159)
        line-height: 26px
        font-size: 12px
        border-left: 2px solid #d9dde1
        text-indent: 14px
    .good-item
      display: flex
      position: relative
      margin: 18px
      padding-bottom: 18px
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        margin-bottom: 0
        padding-bottom: 18px
        border-none()
      .icon
        flex: 0 0 57px
        width: 57px
        margin-right: 10px
      .detail
        .name
          margin-top: 2px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .desc, .extra
          margin-top: 8px
          font-size: 10px
          line-height: 12px
          color: rgb(147, 153, 159)
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: #f01414
          .old
            text-decoration: line-through
            font-size: 10px
            color: #93999f
      .cart-wrapper
        position: absolute
        right: 0
        bottom: 12px
</style>
