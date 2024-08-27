import { createStore } from 'vuex'
import { getAPI } from './axios-api';


export default createStore({
  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,

  },

  getters: {
    loggedIn(state){
      return state.accessToken != null
    }
  },

  mutations: {
    updateStorage(state, {access, refresh}){
      state.accessToken = access;
      state.refreshToken = refresh;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh)
    },


    destroyToken(state) {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },

  },
  actions: {
    userLogin(context, usercredentials){
      return new Promise((resolve, reject) =>{
        getAPI.post('/api/token/', {
          email: usercredentials.email,
          password : usercredentials.password
        }).then(response => {
 
          context.commit('updateStorage', {access: response.data.access, refresh: response.data.refresh});
          resolve();
        }).catch( err => {
          reject(err);
        })
      })
    },

    userLogout(context){
      if(context.getters.loggedIn){
        context.commit('destroyToken')
      }
    }

  },
  modules: {
  }
})
