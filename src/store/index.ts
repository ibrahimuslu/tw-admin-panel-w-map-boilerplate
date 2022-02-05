import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '../interfaces'
import { auth } from './modules/auth.module'
import { device } from './modules/device.module'


const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0' // a simple property
  },
  modules: {
    auth,
    device
  }
}

export default new Vuex.Store<RootState>(store)