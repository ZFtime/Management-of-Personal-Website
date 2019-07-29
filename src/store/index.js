import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        // 用户模式
        user
    //     //定位模块
    //     location,
    //     //用户模块
    //     user,
    //     //地址模块
    //     address,
    //     // 服务中心模块
    //     service,
    //     //购物模块
    //     shop,
    //     //食物模块
    //     food
    }
})