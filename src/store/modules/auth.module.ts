import { Module } from 'vuex'
import AuthService from '../../services/AuthService';
import { RootState, State, User } from '../../interfaces'

export const auth: Module<State, RootState> = {
    namespaced: true,
    state: <State>{
        status: { verifySent: false, loggedIn: false},
        user: {}
    },
    getters: {
        isLoggedIn(state): boolean {
            const { status } = state
            return status.loggedIn
        },
        isVerifySent(state): boolean{
            const { status } = state
            return status.verifySent
        },
        getUser(state): User {
          return state.user
        }
    },
    actions: {
        async verify({ commit }, user: User): Promise<any> {
            return AuthService.verify(user.email, user.password).then(
                data => {
                  console.log('verify',user,data)
                  if(data.success)
                    commit('loginSuccess', user);
                  return Promise.resolve(data);
                },
                error => {

                  console.log('verify',user,error)
                  commit('loginFailure');
                  const message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                  return Promise.reject(message);
                }
              );
        },

        async login({ commit }, user: User): Promise<any> {
            return AuthService.login(user.email).then(
                data => {
                  console.log('login',user,data)
                  return commit('verifySuccess', user);
                },
                error => {
                  commit('verifyFailure');
                  const message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                  return Promise.reject(message);
                }
              );
        },
        async register({ commit }, data: User): Promise<any> {
            return AuthService.register(data.username, data.email, data.password).then(
                response => {
                  commit('registerSuccess');
                  return Promise.resolve(response.data);
                },
                error => {
                  commit('registerFailure');
                  const message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                  return Promise.reject(message);
                }
            );
        },
        async logout({ commit }): Promise<any> {
            return AuthService.logout().then(
              response => {
                commit('logoutSuccess');

                localStorage.removeItem('user');
                return Promise.resolve(response.data);
              },
              error => {
                commit('logoutFailure');
                const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
                return Promise.reject(message);
              }
            );
        }

    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true
            state.user = user
        },
        loginFailure(state) {
            state.status.loggedIn = false
            state.user = {username:'',password:'',email:''}
        },
        verifySuccess(state, user) {
            state.status.verifySent = true
            state.user = user
        },
        verifyFailure(state) {
            state.status.verifySent = false
        },
        logoutSuccess(state) {
            state.status.loggedIn = false
            state.status.verifySent = false
            state.user = {username:'',password:'',email:''}
        },
        logoutFailure(state) {
          state.status.loggedIn = false
        },
        registerSuccess(state) {
            state.status.loggedIn = false
        },
        registerFailure(state) {
            state.status.loggedIn = false
        },
    }
}