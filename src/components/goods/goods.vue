<template>
  <div class="goods-wrap">
    <ul class="left-menu-wrap">
      <li v-for="(item,index) in goodslist">
        {{item.name}}
      </li>
    </ul>
    <div class="item-goods-wrap">
      <div v-for="(item ,index) in goodslist">
          <p class="good-name">{{item.name}}</p>
          <ul class="item-good-info">
            <li v-for="(single,i) in item.foods">
              <a :href="'http://localhost:8080/#/detailGood?first='+index+'&second='+i">
                <img :src="single.image" alt="">
                <div>
                  <p class="single-name">{{single.name}}</p>
                  <p :class="single.description?'single-normal':''">{{single.description}}</p>
                  <p class="single-normal">月售{{single.sellCount}}份 好评率{{single.rating}}%</p>
                  <p class="price-wrap"><em class="price-rmb">¥</em><span class="single-price">{{single.price}}</span> <span class="single-old-price">{{single.oldPrice?single.oldPrice:''}}</span> <span class="icon-add_circle"></span></p>
                </div>
              </a>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "goods",
    data(){
      return{
        goodslist:[],
      }
    },
    created: function () {
      this.axios({
        method: 'get',
        url: 'data.json',
      }).then(res => {
        this.goodslist = res.data.goods;
      });
    },

  }
</script>

<style scoped lang="less">
  .goods-wrap{
    display: flex;
    height: 100%;
    background-color: #f4f5f7;
    .left-menu-wrap{
      flex: 0.9;
      position: fixed;
      width: 19%;
      li{
        position: relative;
        margin: 0 0 0 25px;
        padding:42px 0 32px;
        font-size: 24px;
        &::after{
          position: absolute;
          content: '';
          width: 90%;
          height: 1px;
          left: -5px;
          bottom: 0;
          background-color: #cbcbcb;
        }
      }
    }
    .item-goods-wrap{
      flex: 4;
      height: 100%;
      padding-left: 19%;
      overflow: scroll;
      .good-name{
        font-size: 24px;
        color: #b5bac0;
        padding: 12px 0 12px 28px;
        border-left: 2px solid #d9dce1;
      }
      .item-good-info{
        img{
          width: 120px;
          height: 110px;
        }
        li{
          display: flex;
          padding: 32px 0 32px 28px;
          background-color: #fff;
          border-bottom: 1px solid #d9dce1;
          a{
            width: 100%;
            display: flex;
          }
          div{
            padding-left: 20px;
          }
          .single-name{
            font-size: 30px;
            font-weight: 900;
            color: #51565a;
          }
          .single-normal{
            font-size: 22px;
            color: #95999c;
            padding-top: 15px;
          }
          .price-wrap{
            padding-top: 15px;
          }
          .price-rmb{
            font-size: 20px;
            color: #f21117;
            vertical-align: text-top;
          }
          .single-price{
            color: #f21117;
            font-size: 30px;
          }
          .single-old-price{
            color: #969ba1;
            font-size: 22px;
            text-decoration: line-through;
          }
        }
      }
    }

  }

</style>
