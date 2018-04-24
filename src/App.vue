<template>
  <div id="app">
    <div class="wy-header">
      <div class="nav-top">
        <div class="seller-wrap-inner">
          <div class="brand-img-wrap">
            <img @click="intruduction_close" :src="this.seller.avatar" alt="">
          </div>
          <div class="seller-info-wrap">
            <p><span class="icon-brand" ></span><span class="brand-name">{{this.seller.name}}</span></p>
            <p><span>{{this.seller.description}}/{{this.seller.deliveryTime}}分钟送达</span></p>
            <p>
              <span class="icon-discount"></span>
              <span>{{this.seller.supports?this.seller.supports[0].description:''}},{{this.seller.supports?this.seller.supports[1].description:''}}</span>
              <span >{{this.seller.supports?this.seller.supports.length:''}}个</span>
            </p>
          </div>
        </div>
        <div class="brand-bulletin-wrap">
          <span class="icon-bulletin"></span>
          <p class="brand-bulletin">{{this.seller.bulletin}}</p>
          <a class="brand-bulletin-more" href="#"> > </a>
        </div>
      </div>
      <div class="nav-wrap">
        <router-link class="nav-bar" to='/goods'><span>商品</span></router-link>
        <router-link class="nav-bar" to='/ratings'><span>评价</span></router-link>
        <router-link class="nav-bar" to='/seller'><span>商家</span></router-link>
      </div>
    </div>
    <div class="content-wrap">
      <router-view></router-view>
    </div>
    <!--商家介绍-->
    <div v-if="introduction" class="introdution-seller-wrap">
      <div>
        <p class="seller-name">{{this.seller.name}}</p>
        <p class="seller-score-wrap">
          <span :class="(index+1) <this.sellerScore ?'seller-score-on':'seller-score-off'" v-for="(item ,index) in 5"></span>
        </p>
      </div>
      <div>
       <p class="introdution-title">
         <span></span>
         <span>优惠信息</span>
         <span></span>
       </p>
        <ul class="discount-info-wrap">
          <li v-for="(item,index) in this.seller.supports"><span :class="'type'+item.type"></span><span>{{item.description}}</span></li>
        </ul>
      </div>
      <div>
        <p class="introdution-title">
          <span></span>
          <span>商家公告</span>
          <span></span>
        </p>
        <p class="introduction-concrete">
          {{this.seller.bulletin}}
        </p>
      </div>
      <span @click="intruduction_close" class="introdution-close">&times;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      nav_active:false,
      seller:{},
      introduction:false,
      sellerScore:5
    }
  },
  methods:{
    intruduction_close:function(){
      this.introduction = !this.introduction;
    }
  },
  created:function () {
    this.axios({
      method: 'get',
      url: 'data.json',
    }).then(res => {
      this.seller = res.data.seller;
      this.sellerScore = this.seller.serviceScore
    });
  },
  mounted: function () {

  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import "assets/css/reset.css";
/*@import "common/css/font.css";*/
html,body{height: 100%;}
a{text-decoration: none;}
@cl-primary: #d43c33;
[class^="icon-"], [class*=" icon-"]{
  display: inline-block;
  vertical-align: middle;
  background-size: 100% 100%;
}
.icon-brand{
  width: 60px;
  height: 36px;
  background-image: url(./common/imgs/brand@2x.png);
}
.icon-discount{
  width: 26px;
  height: 24px;
  background-image: url(./common/imgs/decrease_1@2x.png);
}
.icon-bulletin{
  width: 45px;
  height: 24px;
  background-image: url(./common/imgs/bulletin@2x.png);
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fcfcfd;
}
.router-link-active{
  span{
    color: @cl-primary;
    border-bottom: 2px solid @cl-primary;
  }
}
//header
.wy-header{
  position: absolute;
  height: 328px;
  width: 100%;
  background-color: #fff;
}
.nav-top{
  display: flex;
  flex-wrap: wrap;
  background-color: rgba(0,0,0,0.2);
  .seller-wrap-inner{
    display: flex;
    padding: 50px 25px 20px 50px;
  }
  .brand-img-wrap{
    img{
      width: 130px;
      height: 127px;
      border-radius: 6px;
    }
  }
  .seller-info-wrap{
    padding-left: 27px;
    color: #fff;
    p{
      font-size: 24px;
      padding-bottom: 15px;
      span{
        display: inline-block;
        vertical-align: middle;
      }
      .brand-name{
        padding-left: 5px;
      }
      &:first-child{
        font-size: 30px;
        font-weight: 900;
      }
      &:last-child{
        font-size: 20px;
        padding-bottom: 0;
      }
    }
  }
  .brand-bulletin-wrap{
    width: 100%;
    padding: 0 25px;
    box-sizing: border-box;
    background-color: rgba(0,0,0,0.6);
    font-size: 20px;
    .brand-bulletin{
      display: inline-block;
      width: 89%;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      color: #fff;
      padding: 18px 0;
      vertical-align: middle;
    }
    .brand-bulletin-more{
      color: #fff;
    }
  }
}

.nav-wrap{
  position: relative;
  display: flex;
  &:before{
    position: absolute;
    left: 0;
    bottom: -1px;
    content: '';
    width: 200%;
    border-bottom: 1px solid #f1eded;
    transform-origin: 0 0;
    transform: scale(0.5,0.5);
    box-sizing: border-box;
  }
  .nav-bar{
    flex: 1;
    text-align: center;
    color: #4d4d4d;
    span{
      display: inline-block;
      padding: 18px 5px;
      line-height: normal;
      font-size: 24px;
    }
  }
}
.content-wrap{
  padding-top: 328px;
  height: 100%;
  box-sizing: border-box;
  background-color: #fcfcfd;
}
  /*商家介绍*/
  .introdution-seller-wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 124px 80px 0 80px;
    background-color: rgba(41, 54, 66, 0.9);
    color: #fff;
    box-sizing: border-box;
    .seller-name{
      text-align: center;
      font-size: 28px;
      font-weight: 900;
    }
    .seller-score-wrap{
      padding: 35px 0;
      text-align: center;
      span{
        display: inline-block;
        width: 30px;
        height: 29px;
        margin-right: 50px;
        &:last-child{margin-right: 0;}
      }
      .seller-score-off{
        background-image: url("./common/imgs/star36_off@2x.png");
      }
      .seller-score-on{
        background-image: url("./common/imgs/star36_on@2x.png");
      }
    }
    .introdution-title{
      display: flex;
      padding-bottom: 58px;
      align-items: center;
      text-align: center;
      span{
        display: inline-block;
        font-size: 26px;
        font-weight: 900;
        flex: 1.2;
        &:first-child,&:last-child{
          flex: 2;
          height: 1px;
          background-color: rgba(255,255,255,0.6);
        }
      }
    }
    .discount-info-wrap{
      [class*='type']{
        display: inline-block;
        width: 32px;
        height: 32px;
      }
      li{
        padding-bottom: 25px;
        font-size: 24px;
        &:last-child{
          padding-bottom: 50px;
        }
        span{
          display: inline-block;
          vertical-align: middle;
          &:last-child{
            padding-left: 10px;
          }
        }
      }
      .type0{
        //减
        background-image: url("./common/imgs/decrease_2@2x.png");
      }
      .type1{
        //折
        background-image: url("./common/imgs/discount_2@2x.png");
      }
      .type2{
        //特
        background-image: url("./common/imgs/special_2@2x.png");
      }
      .type3{
        //发票
        background-image: url("./common/imgs/invoice_2@2x.png");
      }
      .type4{
        //保
        background-image: url("./common/imgs/guarantee_2@2x.png");
      }
    }
    .introduction-concrete{
      font-size: 24px;
      color: rgba(255,255,255,0.8);
      line-height: 2;
    }
    .introdution-close{
      position: fixed;
      bottom: 10%;
      width: 100%;
      left: 0;
      color: #887d7d;
      font-size: 80px;
      text-align: center;
    }
  }
</style>
