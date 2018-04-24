<template>
<div class="sellerInfo-wrap">
  <div class="seller-service">
    <div>
      <p class="seller-name">
        {{this.sellerInfo.name}}
      </p>
      <p class="seller-start">
        <span :class="(index+1) <sellerInfoScore ?'seller-score-on':'seller-score-off'" v-for="(item ,index) in 5"></span>
      </p>
      <span>月售{{this.sellerInfo.sellCount}}单</span>
    </div>
    <div>
      <span class="icon-favorite"></span>
    </div>
    <ul>
      <li>
        起送价<br>
        <span>{{this.sellerInfo.minPrice}}</span><em>元</em>
      </li>
      <li>
        商家配送<br>
        <span>{{this.sellerInfo.deliveryPrice}}</span><em>元</em>
      </li>
      <li>
        平均配送时间<br>
        <span class="no-border">{{this.sellerInfo.deliveryTime}}</span><em>分钟</em>
      </li>
    </ul>
  </div>
  <div class="seller-bulletin">
    <span class="sellerInfo-common-title">公告与活动</span>
    <p>{{this.sellerInfo.bulletin}}</p>
    <ul class="discount-info-wrap">
      <li v-for="(item,index) in this.sellerInfo.supports"><span :class="'type'+item.type"></span><span>{{item.description}}</span></li>
    </ul>
  </div>
  <div class="seller-store">
    <span class="sellerInfo-common-title">商家实景</span>
    <div>
      <div class="inner-img-wrap">
        <img v-for="(item,index) in this.sellerInfo.pics" :src="item" alt="">
      </div>
    </div>
  </div>
  <div class="seller-info">
    <span class="sellerInfo-common-title">商家信息</span>
    <ul>
      <li v-for="(item,index) in this.sellerInfo.infos">
        {{item}}
      </li>
    </ul>
  </div>
</div>
</template>

<script>
    export default {
        name: "seller",
      data(){
          return{
            sellerInfo:{},
            sellerInfoScore:5
          }
      },
      created:function(){
        this.axios({
          method: 'get',
          url: 'data.json',
        }).then(res => {
          this.sellerInfo = res.data.seller;
        });
      },
      mounted:function () {

      },
    }
</script>

<style scoped lang="less">
  .sellerInfo-wrap{
    background-color: #f4f5f7;
    >div{
      padding: 0 37px;
      background-color: #fff;
      border-top: 2px solid #e7e8ea;
      border-bottom: 2px solid #e7e8ea;
      margin-bottom: 30px;
    }
    .sellerInfo-common-title{
      display: inline-block;
      padding:30px 0;
      font-size: 32px;
      font-weight: 500;
      color: #071019;
    }
    >div.seller-info{
      border-bottom: 0;
    }
  }
//  top商家信息
.seller-service{
  display: flex;
  flex-wrap: wrap;
  >div{
    padding: 37px 0;
    &:first-child{
      flex: 8;
      color: #52555a;
      font-size: 20px;
      span{
        display: inline-block;
        vertical-align: text-bottom;
      }
    }
    &:last-child{
      flex: 2;
    }
    .seller-start{
      display: inline-block;
      padding-top: 20px;
    }
  }
  ul{
    display: flex;
    align-items: center;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    li{
      width: 33.333%;
      padding: 36px 0 40px;
      color: #9b9c9e;
      font-size: 20px;
      text-align: center;
      span{
        position: relative;
        display: inline-block;
        font-size: 40px;
        color: #091018;
        padding-top: 15px;
        &:after{
          position: absolute;
          top: -25px;
          right: -100px;
          content: '';
          width: 1px;
          height: 140%;
          background-color: #e8e8e8;
        }
        &.no-border{
          &:after{
            width: 0;
          }
        }
      }
      em{
        color: #091018;
      }
    }
  }
  .seller-name{
    font-size: 32px;
    font-weight:500;
    color:#071019;
  }
  .seller-start{
    span{
      display: inline-block;
      width: 30px;
      height: 29px;
      margin-right: 18px;
      &:last-child{margin-right: 0;}
    }
    .seller-score-off{
      background-image: url("../../common/imgs/star36_off@2x.png");
    }
    .seller-score-on{
      background-image: url("../../common/imgs/star36_on@2x.png");
    }
  }
}
//  公告活动
.seller-bulletin{
  >p{
    padding:0 2% 40px 22px;
    font-size: 24px;
    color: #f7494a;
    line-height: 2;
    border-bottom: 1px solid #e8e8e8;
  }
  ul{
    [class*='type']{
      display: inline-block;
      width: 36px;
      height: 36px;
    }
    .type0{
      //减
      background-image: url("../../common/imgs/decrease_3@3x.png");
    }
    .type1{
      //折
      background-image: url("../../common/imgs/discount_3@3x.png");
    }
    .type2{
      //特
      background-image: url("../../common/imgs/special_3@3x.png");
    }
    .type3{
      //发票
      background-image: url("../../common/imgs/invoice_3@3x.png");
    }
    .type4{
      //保
      background-image: url("../../common/imgs/guarantee_3@3x.png");
    }
    li{
      padding: 35px 2% 35px 22px;
      font-size: 26px;
      color: #090c13;
      border-bottom: 1px solid #e8e8e8;
      &:last-child{
        border-bottom: 0;
      }
      span{
        display: inline-block;
        vertical-align: middle;
        &:last-child{
          padding-left: 10px;
        }
      }
    }
  }
}
//  商家实景
.seller-store{
  div{
    width: 100%;
    height: 180px;
    overflow-x: scroll;
    overflow-y: hidden;
    padding-bottom: 35px;
  }
  .inner-img-wrap{width: 980px;}
  img{
    float: left;
    width: 235px;
    height: 180px;
    padding-right: 10px;
  }
}
//  商家信息
.seller-info{
  li{
    padding: 35px 2% 35px 22px;
    font-size: 26px;
    color: #090c13;
    line-height: 1.5;
    border-bottom: 1px solid #e8e8e8;
    &:last-child{
      border-bottom: 0;
    }
    span{
      display: inline-block;
      vertical-align: middle;
      &:last-child{
        padding-left: 10px;
      }
    }
  }
}

</style>
