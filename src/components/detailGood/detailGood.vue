<template>
    <div class="detailInfo-wrap">
      <div class="good-info-wrap">
        <img :src="this.detailInfo.image" alt="">
        <div class="p-tlr-35">
          <p class="good-name">{{this.detailInfo.name}}</p><!--商品名称-->
          <p class="good-rating">
            <span>月售{{this.detailInfo.sellCount}}份</span>
            <span>好评率{{this.detailInfo.rating}}%</span>
          </p>
          <p class="good-price">
            <span>{{this.detailInfo.price}}</span><!--现价-->
            <span :class="!this.detailInfo.oldPrice?'noOldPrice':''">{{this.detailInfo.oldPrice}}</span><!--折价前-->
          </p>
          <span class="good-addToCart">加入购物车</span>
        </div>
      </div>
      <div class="good-text-wrap p-tlr-35">
        <span>商品介绍</span>
        <p>{{this.detailInfo.info}}</p>
      </div><!--商品介绍-->
      <div class="good-rating-wrap">
        <span>商品评价</span>
        <p class="good-rank-wrap">
          <span>全部</span>
          <span>推荐</span>
          <span>吐槽</span>
        </p>
        <ul class="p-tlr-35">
          <li v-for="(item,index) in this.detailInfo.ratings">
            <p class="user-wrap">
              <span>{{formatter(item.rateTime)}}</span>
              <span>
                <em>{{item.username}}</em>
                <img :src="item.avatar" alt="">
              </span>
            </p>
            <p class="user-rating">{{item.text}}</p>
          </li>
        </ul>
      </div><!--商品评价-->
    </div>
</template>

<script>

    export default {
        name: "detail-good",
      data(){
          return{
            detailInfo : '',
            isOldPrice:'true'
          }
      },
      methods:{
        formatter:function (str) {
          const str_data = new Date(str);
          return (str_data.getFullYear())+'-'+(str_data.getMonth()+1)+'-'+(str_data.getDate())+' '+(str_data.getHours())+':'+(str_data.getMinutes())+':'+str_data.getSeconds();
        },
        getUrlParam:function (name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
          var r = window.location.search.substr(1).match(reg);  //匹配目标参数
          if (r != null) return unescape(r[2]);
          return null; //返回参数值
        }
      },
      created:function () {
        this.axios({
          method: 'get',
          url: 'data.json',
        }).then(res => {
          let cur_search = this.$route.query;
          this.detailInfo = res.data.goods[cur_search.first].foods[cur_search.second];
        });
      }
    }
</script>
<style scoped lang="less">
  .p-tlr-35{
    padding: 35px 35px 0 35px;
  }
.detailInfo-wrap{
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #f4f5f7;
  >div{
    background-color: #fff;
    margin-bottom: 30px;
    border-top: 2px solid #e8e8e8;
    border-bottom: 2px solid #e8e8e8;
    &:last-child{
      margin-bottom: 0;
    }
  }
  .good-info-wrap{
    position: relative;
    .good-name{
      font-size: 32px;
      color:#030d16;
      font-weight: 900;
    }
    .good-rating{
      padding: 16px 0 40px;
      font-size: 22px;
      color: #979ca0;
    }
    .good-price{
      padding-bottom: 45px;
      span{
        &:first-child{
          font-size: 36px;
          font-weight: 900;
          color: #f30c14;
          &:before{
            font-size: 24px;
            content: '¥';
            font-weight: 500;
          }
        }
        &:last-child{
          font-size: 24px;
          color: #919598;
          font-weight: 900;
          text-decoration: line-through;
          &:before{
            content: '¥';
          }
        }
        &.noOldPrice{
          &:before{
            content: '';
          }
        }
      }
    }
    .good-addToCart{
      position: absolute;
      right: 35px;
      bottom: 40px;
      width: 147px;
      height: 48px;
      line-height: 48px;
      font-size: 20px;
      font-weight: 700;
      border-radius: 48px;
      background-color: #00a3e2;
      color: #fff;
      text-align: center;
    }
  }
  .good-text-wrap{
    span{
      display: inline-block;
      padding-bottom: 25px;
      font-size: 32px;
      color: #0c151c;
    }
    p{
      padding-bottom: 40px;
      font-size: 22px;
      line-height: 1.5;
    }
  }
  .good-rating-wrap{
    >span{
      display: inline-block;
      padding: 35px 35px 25px 35px;
      font-size: 32px;
      color: #0c151c;
    }
    .good-rank-wrap{
      margin: 0 25px;
      border-bottom: 1px solid #e8e8e8;
      span{
        display: inline-block;
        width: 121px;
        height: 62px;
        margin:0  25px 40px 0;
        line-height: 62px;
        font-size: 24px;
        font-weight: 500;
        text-align: center;
        &:first-child{
          background-color: #00a0dc;
          color: #fff;
        }
        &:nth-child(2){
          background-color: #ccecf7;
          color: #4c555a;
        }
        &:last-child{
          background-color: #eaebed;
          color: #6a7177;
        }
      }
    }
    ul{padding-top: 0;}
    li{
      padding: 35px 0;
      border-bottom: 1px solid #e8e8e8;
      .user-wrap{
        display: flex;
        span{
          flex: 1;
          font-size: 24px;
          vertical-align: middle;
          &:first-child{
            text-align: left;
          }
          &:last-child{
            em{
              vertical-align: middle;
              &:first-child{
                padding-right: 10px;
              }
            }
            text-align: right;
          }
        }
      }
      .user-rating{
        padding-top: 22px;
        font-size: 28px;
        color: #061220;
      }
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }
}
</style>
