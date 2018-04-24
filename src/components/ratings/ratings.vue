<template>
  <div class="rating-wrap">
    <div class="rating-top">
      <div class="rating-Topleft">
        <p>{{this.ratingSeller.serviceScore}}</p>
        <p>综合评分</p>
        <p>高于周边商家{{this.ratingSeller.rankRate}}％</p>
      </div>
      <div class="rating-Topright">
        <div>
          <em>商品评价</em>
          <p class="seller-start">
            <span :class="(index+1) <foodScore ?'seller-score-on':'seller-score-off'" v-for="(item ,index) in 5"></span>
          </p>
          <em>{{this.ratingSeller.foodScore}}</em>
        </div>
        <div>
          <em>服务态度</em>
          <p class="seller-start">
            <span :class="(index+1) <serviceScore ?'seller-score-on':'seller-score-off'" v-for="(item ,index) in 5"></span>
          </p>
          <em>{{this.ratingSeller.serviceScore}}</em>
        </div>
        <div class="rating-Topright-last">
          <em>送达时间</em><p></p>
          <em>{{this.ratingSeller.deliveryTime}}分钟</em>
        </div>
      </div>
    </div>
    <div class="rating-section">
      <div class="rating-rank">
        <span>全部</span>
        <span>满意</span>
        <span>不满意</span>
      </div>
      <ul>
        <li v-for="(item,index) in ratingInfo">
          <div class="userPic-wrap">
            <img :src="item.avatar" alt="">
          </div>
          <div class="user-rating-wrap">
            <p class="user-name">{{item.username}}</p><!--用户名-->
            <p>
              <span class="seller-start">
                <span :class="(index+1) <= item.score ?'seller-score-on-small':'seller-score-off-small'" v-for="(start ,index) in 5"></span>
              </span><!--等级评价-->
              <em class="user-deliveryTime">{{item.deliveryTime}}分钟送达</em><!--送达时间-->
            </p>
            <p class="user-ratingInfo" :class="!item.text?'p-b-0':''">{{item.text}}</p><!--评论信息-->
            <p class="user-recommend" :class="item.recommend<1?'p-b-0':''">
              <span v-for="(recommend,i) in item.recommend">
                {{recommend}}
              </span>
            </p>
          </div>
          <span class="user-rateTime">{{formatter(item.rateTime)}}</span><!--评价时间-->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ratings",
    data() {
      return {
        ratingInfo:'',
        ratingSeller:'',
        serviceScore:'',//服务评价
        foodScore:'',//商品评价
      }
    },
    methods: {
      formatter:function (str) {
        const str_data = new Date(str);
        return (str_data.getFullYear())+'-'+(str_data.getMonth()+1)+'-'+(str_data.getDate())+' '+(str_data.getHours())+':'+(str_data.getMinutes())+':'+str_data.getSeconds();
      }
    },
    filters:{

    },
    created: function () {
      this.axios({
        method: 'get',
        url: 'data.json',
      }).then(res => {
        this.ratingInfo = res.data.ratings;
        this.ratingSeller = res.data.seller;
        this.serviceScore = this.ratingSeller.serviceScore;
        this.foodScore = this.ratingSeller.foodScore;
      });
    }
  }
</script>

<style scoped lang="less">
  .p-b-0{padding-bottom: 0!important;}
  .rating-wrap{
    background-color: #f4f5f7;
  }
  .rating-top{
    display: flex;
    padding: 35px 0;
    align-items: center;
    margin-bottom: 30px;
    background-color: #fff;
    border-bottom: 2px solid #e7e8ea;
    .rating-Topleft{
      position: relative;
      flex: 4;
      text-align: center;
      &:after{
        position: absolute;
        right: 10px;
        top: 10px;
        content: '';
        width: 1px;
        height: 90%;
        background-color: #ebecec;
      }
      p{
        &:first-child{
          font-size: 46px;
          color: #fe9900;
          font-weight: 700;
        }
        &:nth-child(2){
          padding: 22px 0;
          font-size: 24px;
          color: #060d13;
          font-weight: 500;
        }
        &:last-child{
          font-size: 20px;
          color: #98a1a8;
        }
      }
    }
    .rating-Topright{
      flex: 6;
      padding-left: 50px;
      font-size: 24px;
      color: #060d13;
      div{
        padding-bottom: 20px;
        &:last-child{
          padding-bottom:0;
        }
      }
      p{
        display: inline-block;
        padding-left: 25px;
        vertical-align: middle;
      }
      em{
        vertical-align: middle;
        &:last-child{
          padding-left: 25px;
          font-size: 26px;
          font-weight: 700;
          color: #fe9900;
        }
      }
      .rating-Topright-last{
        em{
          &:last-child{
            padding-left: 0;
            color: #98a1a8;
          }
        }
      }
    }
  }
  .rating-section{
    border-top: 2px solid #e7e8ea;
    background-color: #fff;
    .rating-rank{
      padding: 35px 50px 35px 40px;
      border-bottom: 1px solid #e8e8e8;
      span{
        position: relative;
        display: inline-block;
        width: 120px;
        height: 64px;
        margin-right: 17px;
        line-height: 64px;
        font-size: 26px;
        text-align: center;
        font-weight: 500;
        &:first-child{
          color: #fff;
          background-color: #00a0dc;
        }
        &:nth-child(2){
          color: #4c535d;
          background-color: #cceaf4;
        }
        &:last-child{
          width: 150px;
          color: #4c535d;
          background-color: #eaebed;
        }
      }
    }
    ul{
      margin: 0 35px;
      li{
        position: relative;
        display: flex;
        padding: 35px 0;
        border-bottom: 1px solid #e8e8e8;
      }
      img{
        width: 55px;
        height: 55px;
        border-radius: 50%;
      }
      .user-rating-wrap{
        >p{
          padding-bottom: 13px;
        }
      }
      .userPic-wrap{
        width: 13%;
      }
      .user-name{
        font-size: 24px;
      }
      .user-deliveryTime{
        font-size: 20px;
        color: #98999d;
      }
      .user-ratingInfo{
        font-size: 24px;
        line-height: 1.5;
        color:#040e17
      }
      .user-recommend{
        span{
          display: inline-block;
          width: 125px;
          height: 30px;
          margin-right: 18px;
          line-height: 30px;
          font-size: 18px;
          color: #93989c;
          border:1px solid #e8e8e8;
          text-align: center;
        }
      }
      .user-rateTime{
        position: absolute;
        right: 30px;
        top: 30px;
        font-size: 22px;
        color: #9b9fa2;
      }
    }
  }
  //评价
  .seller-start{
    span{
      display: inline-block;
      width: 30px;
      height: 29px;
      margin-right: 11px;
      &:last-child{margin-right: 0;}
    }
    .seller-score-off{
      background-image: url("../../common/imgs/star36_off@2x.png");
    }
    .seller-score-on{
      background-image: url("../../common/imgs/star36_on@2x.png");
    }
    .seller-score-off-small,.seller-score-on-small{
      width: 20px;
      height: 19px;
      margin-right: 5px;
    }
    .seller-score-off-small{
      background-image: url("../../common/imgs/star24_off@2x.png");
    }
    .seller-score-on-small{
      background-image: url("../../common/imgs/star24_on@2x.png");
    }
  }
</style>
