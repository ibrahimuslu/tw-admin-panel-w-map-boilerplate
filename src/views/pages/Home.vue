
<template>
  <!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          sky: colors.sky,
          teal: colors.teal,
          cyan: colors.cyan,
          rose: colors.rose,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
    ],
  }
  ```
-->
<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-100">
  <body class="h-full">
  ```
-->
<div class="min-h-full">
  <header class="pb-24 bg-gradient-to-r from-twm to-cyan-600">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="relative flex flex-wrap items-center justify-center lg:justify-between">
        <!-- Logo -->
        <div class="absolute left-0 py-5 flex-shrink-0 lg:static">
          <a href="#">
            <span class="sr-only">Workflow</span>
            <!-- https://tailwindui.com/img/logos/workflow-mark-cyan-200.svg -->
            
            <div class="flex flex-row mx-auto max-w-sm" >
                <img class="mx-auto h-12 w-auto pr-4" src="../../assets/logo.svg" alt="Workflow">
                <img class="mx-auto h-12 w-auto border-l pl-4 hidden lg:block" src="../../assets/logo.svg" alt="Workflow">
            </div>
          </a>
        </div>

        <!-- Right section on desktop -->
        <div class="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
          <button type="button" class="flex-shrink-0 p-1 text-cyan-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
            <span class="sr-only">View notifications</span>
            <!-- Heroicon name: outline/bell -->
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          <!-- Profile dropdown -->
          <div class="ml-4 relative flex-shrink-0">
            <div>
              <button @click="usermenu = !usermenu" type="button" class="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" src="../../assets/su-kemeri.png" alt="">
              </button>
            </div>

            <!--
              Dropdown menu, show/hide based on menu state.

              Entering: ""
                From: ""
                To: ""
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
            <div v-show="usermenu" class="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
              <!-- Active: "bg-gray-100", Not Active: "" -->
              <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Profil</a>

              <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Ayarlar</a>

              <a href="#" @click="handleLogout" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Çıkış</a>
            </div>
          </div>
        </div>

        <div class="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
          <div class="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
            <!-- Left nav -->
            <div class="hidden lg:block lg:col-span-2">
              <nav class="flex space-x-4">
                <a href="#" class="text-white text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10" aria-current="page">
                  Anasayfa
                </a>

                <a href="#" class="text-cyan-100 text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10">
                  Cihazlar
                </a>

                <a href="#" class="text-cyan-100 text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10">
                  Yerleşimler
                </a>

                <a href="#" class="text-cyan-100 text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10">
                  Kullanıcılar
                </a>

                <a href="#" class="text-cyan-100 text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10">
                  Aktiviteler
                </a>
              </nav>
            </div>
            <div class="px-12 lg:px-0">
              <!-- Search -->
              <div class="max-w-xs mx-auto w-full lg:max-w-md">
                <label for="search" class="sr-only">Arama</label>
                <div class="relative text-white focus-within:text-gray-600">
                  <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <!-- Heroicon name: solid/search -->
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input id="search" class="block w-full text-white bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 focus:text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm" placeholder="Arama" type="search" name="search">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Menu button -->
        <div @click="usermenu=true" class="absolute right-0 flex-shrink-0 lg:hidden">
          <!-- Mobile menu button -->
          <button type="button" class="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white" aria-expanded="false">
            <span class="sr-only">Ana menüyü aç</span>
            <!--
              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            -->
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!--
              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            -->
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on mobile menu state. -->
    <div v-show="usermenu" class="lg:hidden">
      <!--
        Mobile menu overlay, show/hide based on mobile menu state.

        Entering: "duration-150 ease-out"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "duration-150 ease-in"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="z-20 fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>

      <!--
        Mobile menu, show/hide based on mobile menu state.

        Entering: "duration-150 ease-out"
          From: "opacity-0 scale-95"
          To: "opacity-100 scale-100"
        Leaving: "duration-150 ease-in"
          From: "opacity-100 scale-100"
          To: "opacity-0 scale-95"
      -->
      <div class="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top">
        <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
          <div class="pt-3 pb-2">
            <div class="flex items-center justify-between px-4">
              <div>
                <img class="h-8 w-auto"   src="../../assets/logo.svg" alt="Workflow">
              </div>
              <div class="-mr-2">
                <button @click="usermenu=false" type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                  <span class="sr-only">Close menu</span>
                  <!-- Heroicon name: outline/x -->
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="mt-3 px-2 space-y-1">
              <a href="#" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">Anasayfa</a>

              <a href="#" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">Cihazlar</a>

              <a href="#" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">Yerleşimler</a>

              <a href="#" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">Kullanıcılar</a>

              <a href="#" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">Aktiviteler</a>
            </div>
          </div>
          <div class="pt-4 pb-2">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" src="../../assets/su-kemeri.png" alt="">
              </div>
              <div class="ml-3 min-w-0 flex-1">
                <div class="text-base font-medium text-gray-800 truncate">Kemerburgaz</div>
                <!-- <div class="text-sm font-medium text-gray-500 truncate">chelseahagon@example.com</div> -->
              </div>
              <button type="button" class="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                <span class="sr-only">View notifications</span>
                <!-- Heroicon name: outline/bell -->
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
            <div class="mt-3 px-2 space-y-1">
              <a href="#" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">Profil</a>

              <a href="#" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">Ayarlar</a>

              <a href="#" @click="handleLogout" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">Çıkış</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <main class="-mt-24 pb-8">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="sr-only">Profile</h1>
      <!-- Main 3 column grid -->
      <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
        <!-- Left column -->
        <div class="grid grid-cols-1 gap-4 lg:col-span-2">
          <!-- Welcome panel -->
          <section aria-labelledby="profile-overview-title">
            <div class="rounded-lg bg-white overflow-hidden shadow">
              <h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>
              <div class="bg-white p-6">
                <div class="sm:flex sm:items-center sm:justify-between">
                  <div class="sm:flex sm:space-x-5">
                    <!-- <div class="flex-shrink-0">
                      <img class="mx-auto h-20 w-20 rounded-full" src="su-kemeri.png" alt="">
                    </div> -->
                    <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                      <!-- <p class="text-sm font-medium text-gray-600">Welcome back,</p> -->
                      <p class="text-xl font-bold text-gray-900 sm:text-2xl">Cihazlar</p>

                      <GPS/>
                      <!-- <p class="text-sm font-medium text-gray-600">Human Resources Manager</p> -->
                    </div>
                  </div>
                  <!-- <div class="mt-5 flex justify-center sm:mt-0">
                    <a href="#" class="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      View profile
                    </a>
                  </div> -->
                </div>
              </div>
              <div class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                <div class="px-6 py-5 text-sm font-medium text-center">
                  <span class="text-gray-900">12 </span>
                  <span class="text-gray-600">devices working</span>
                </div>

                <div class="px-6 py-5 text-sm font-medium text-center">
                  <span class="text-gray-900">4 </span>
                  <span class="text-gray-600">devices offline</span>
                </div>

                <div class="px-6 py-5 text-sm font-medium text-center">
                  <span class="text-gray-900">2 </span>
                  <span class="text-gray-600">devices stale</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Actions panel -->
        </div>

        <!-- Right column -->
        <div class="grid grid-cols-1 gap-4">
          <!-- Announcements -->

          <!-- Recent Hires -->
          <section aria-labelledby="recent-hires-title">
            <div class="rounded-lg bg-white overflow-hidden shadow">
              <div class="p-6">
                <h2 class="text-base font-medium text-gray-900" id="recent-hires-title">Cihaz Listesi</h2>
                <div class="flow-root mt-9 overflow-scroll  border-b-2" style="height: 36rem">
                  <ul role="list" class="-my-5 divide-y divide-gray-200">
                    <li v-for="(device,index) in state.devices" :key="device.id" class="py-4">
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                          <svg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg' version='1.1' >
                            <circle cx="15" cy="15" r="15" fill="rgb(0,100,0)" stroke="red" stroke-width="0"/>
                            <text text-anchor="middle" x="50%" y="50%" dy=".28em" font-family="sans-serif" font-size="16px" fill="white">{{index}}</text>
                          </svg>                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 truncate">
                            {{device.name}}
                          </p>
                          <p class="text-sm text-gray-500 truncate">
                            {{device.serial}}
                          </p>
                        </div>
                        <div>
                          <a @click="selectFeature(device.name)" href="#" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                            View
                          </a>
                        </div>
                      </div>
                    </li>

                    
                  </ul>
                </div>
                <!-- <div class="mt-6">
                  <a href="#" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    View all
                  </a>
                </div> -->
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
  <footer v-show="usermenu">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
      <div class="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left"><span class="block sm:inline">&copy; 2021 Thingtells Ltd.</span> <span class="block sm:inline">All rights reserved.</span></div>
    </div>
  </footer>
</div>

</template>
<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router'

  import { computed, onBeforeMount, ref, ComputedRef, reactive, onMounted } from 'vue'
  import DeviceService from '../../services/DeviceService';
  import { UserDevice, Device, Responsed, Response } from '../../interfaces'
  import GPS from '../../components/GPS.vue';
  import { useStore } from 'vuex';
  import { Feature, Map } from 'ol';
  import Geometry from 'ol/geom/Geometry';
  import { transform } from 'ol/proj.js';
  import { AxiosResponse } from 'axios';

  const router = useRouter()
  const route = useRoute()

  const store = useStore()
  const usermenu = ref(false);
  const state = reactive({resp: <Response> {},devices: <Device[]> []});

  onMounted(async () =>{ 
    state.resp = <Response> await ( await DeviceService.getDeviceList() ).data
    if(Array.isArray(state.resp.data))
      state.devices = <Device[]> state.resp.data.map((d:UserDevice) => <Device> d.Device)
  })
  const selectFeature  = (name: string) => {
    const feature: Feature<Geometry> =  store.getters['device/getFeature'](name)
    const map: Map = store.getters['device/getMap']

    const popup = store.getters['device/getPopup']
    popup.content.innerHTML = '<code>' + feature.get('name') + '</code>'
    popup.overlay.setPosition(feature.getGeometry().flatCoordinates)
    const view = map.getView()
    view.setCenter(feature.getGeometry().flatCoordinates)
    view.setZoom(12)
  }
  const handleLogout = () => {
    store.dispatch("auth/logout").then( (data) => {
        router.push("/login");
    })
  }
</script>

<style scoped>
    .logo-img path  {
    fill: green
    }
</style>
 
// [{id: 5, serial: "SerialNumber5", name: "Device5", lat: 37.0357, lng: 27.4879}]


// const deviceList: Response = {
//     "success": true,
//     "data": [
//         {
//             "id": 6,
//             "isAdmin": true,
//             "isOwner": true,
//             "created": "2020-07-14T19:56:44.000Z",
//             "DeviceId": 5,
//             "UserId": 1,
//             "InviteId": null,
//             "Device": {
//                 "id": 5,
//                 "serial": "SerialNumber5",
//                 "name": "Device5",
//                 "lat": 37.0357,
//                 "lng": 27.4879,
//                 "status": "offline",
//                 "valves": "{\"1\":{\"name\":\"1. \",\"state\":\"on\",\"image\":\"1629525579504-Title.jpg\"},\"2\":{\"name\":\"2. \",\"state\":\"on\",\"image\":\"1620494206345-user.jpg\"},\"3\":{\"name\":\"3. \",\"state\":\"on\",\"image\":\"1620494048472-user.jpg\"},\"4\":{\"name\":\"4\",\"state\":\"on\",\"image\":\"1620493874311-user.jpg\"},\"5\":{\"name\":\"5. \",\"state\":\"on\",\"image\":\"1619160752523-user.jpg\"},\"6\":{\"name\":\"6.\",\"state\":\"off\"},\"7\":{\"name\":\"7.\",\"state\":\"off\"},\"8\":{\"name\":\"8.\",\"state\":\"off\",\"image\":\"1620762634367-user.jpg\"}}",
//                 "created": "2020-07-14T19:56:44.000Z"
//             }
//         }]