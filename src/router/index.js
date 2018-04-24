import Vue from 'vue'
import Router from 'vue-router'
import wyHot from '@/components/hot/hot'
import wySearch from '@/components/search/search'
import wyRecommend from '@/components/recommend/recommend'
//elm
import seller from '@/components/seller/seller'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import detailGood from '@/components/detailGood/detailGood'
Vue.use(Router)

export default new Router({
  routes: [
    /*{
      path:'/',
      component:wyRecommend
    },{
      path: '/wyHot',
      name: 'wyHot',
      component: wyHot
    },{
      path: '/wySearch',
      name: 'wySearch',
      component: wySearch
    },{
      path: '/wyRecommend',
      name: 'wyRecommend',
      component: wyRecommend
    }*/
    {
      path:'/',
      component:goods
    },{
      path:'/goods',
      component:goods
    },{
      path:'/ratings',
      component:ratings
    },{
      path:'/seller',
      component:seller
    },{
      path:'/detailGood',
      component:detailGood
    }
  ]
})
