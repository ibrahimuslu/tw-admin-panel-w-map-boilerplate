import { Map } from 'ol'
import { Module } from 'vuex'
import { RootState, GPSState, User, UserDevice, Response } from '../../interfaces'
import DeviceService from '../../services/DeviceService';

export const device: Module<GPSState, RootState> = {
    namespaced: true,
    state: <GPSState>{
        features: [],
        map: new Map({}),
        popup: {}
    },
    
    actions: {
        async getList(): Promise<Response> {
            return DeviceService.getDeviceList().then(
                response => {
                  return Promise.resolve(response.data);
                },
                error => {
                  const message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                  return Promise.reject(message);
                }
            );
        },
    },
    getters: {
        getFeature: (state) => (name: string) => {
            return state.features.find(f =>  f.get('name') == name )
        },
        getMap: (state) => {
            return state.map
        },
        getPopup: (state) => {
            return state.popup
        }
    },
    mutations: {
        setFeatures(state, features) {
            state.features = features
        },
        setPopup(state, popup) {
            state.popup = popup
        }
    }
}