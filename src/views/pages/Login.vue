
<template>
  <!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-50">
  <body class="h-full">
  ```
-->
<div class="min-h-full bg-twm flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <div class="flex flex-row mx-auto max-w-sm" >
        <img class="mx-auto h-12 w-auto border-r pr-16" src="../../assets/logo-twm.svg" alt="Workflow">
        <img class="mx-auto h-12 w-auto" src="../../assets/logo-twm-parkbahce.svg" alt="Workflow">
    </div>
    <h2 class="mt-6 text-center text-3xl font-extrabold text-twm-dark">
      TW Admin Panel w Map Boilerplate Login
    </h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6"  method="POST" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Eposta adresi veya Telefon numarası
          </label>
          <div class="mt-1">
            <input v-model="user.email"
              id="email" name="email" type="emailOrPhone" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-twm-light focus:border-twm-light sm:text-sm">
          </div>
        </div>

        <div v-show="isVerifySent">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Kod
          </label>
          <div class="mt-1" >
            <input v-model="user.password" 
              id="password" name="password" type="password" autocomplete="current-password" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-twm-light focus:border-twm-light sm:text-sm">
          </div>
        </div>

        <!-- <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-twm focus:ring-twm-light border-gray-300 rounded">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Beni hatırla
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-twm hover:text-twm-light">
              Şifremi unuttum?
            </a>
          </div>
        </div> -->

        <div>
          <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-twm-dark hover:bg-twm-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-twm-light">
                <svg v-if="loading" :class="loading?'animate-spin':'animate-none'" class="-ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Giriş
          </button>
        </div>
      </form>

    </div>
  </div>
<!-- Global notification live region, render this permanently at the end of the document -->
  <div aria-live="assertive" class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50">
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-300" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="notification" class="max-w-sm w-full bg-twm-light shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon v-if="!isError" class="h-6 w-6 text-twm" aria-hidden="true" />
                <ExclamationCircleIcon v-if="isError" class="h-6 w-6 text-red-500" aria-hidden="true" />

              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5 text-left">
                <p class="text-sm font-medium text-gray-900">
                  Kod gönderildi
                </p>
                <p class="mt-1 text-sm text-white drop-shadow-md ">
                  {{message}}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button @click="notification = false, isError = false" class="bg-twm-light rounded-md inline-flex text-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-twm">
                  <span class="sr-only">Close</span>
                  <XIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
  <!-- End of notification -->
</div>
</template>
<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router'
  import { useStore } from "vuex";
  import { computed, onBeforeMount, ComputedRef, ref, onMounted } from 'vue'
  import { User } from "../../interfaces";
  import { XIcon } from '@heroicons/vue/solid'
  import { CheckIcon,MailIcon,CheckCircleIcon,ExclamationCircleIcon } from '@heroicons/vue/outline'

  const store = useStore();
  const router = useRouter()
  const route = useRoute()
  const user: User = {
    username: "",
    password: "",
    email: ""
  }
  const loading = ref(false);
  const message = ref("");
  const notification = ref(false)
  const isError = ref(false)
  const isVerifySent = computed(() => store.getters['auth/isVerifySent'])
  const isLoggedIn = computed(() => store.getters['auth/isLoggedIn'])
  const userState = computed(() => store.getters["auth/getUser"])
  onBeforeMount(()=>{
    if (isLoggedIn.value) {
      router.push("/");
    }
  })
  const handleLogin = () => {
    loading.value = true
    console.log('h',isVerifySent.value,user)
    if (!isVerifySent.value || (user.email!=userState.value.email)) {
      store.dispatch("auth/login",user).then(
        (data) => {
          notification.value = true
          loading.value = false;
          message.value = "Lütfen adresinize gelen kodu eksiksiz doldurup onaylayınız."
        },
        (error) => {
          isError.value = true;
          loading.value = false;
          message.value = error;
        }
      );
    } else if (user.email && user.password && isVerifySent.value) {
      store.dispatch("auth/verify",user).then(
        (data) => {
          console.log(data)
          if(data.success){
            if(isLoggedIn.value)
              router.push("/");
          }else{
            isError.value = true;
            loading.value = false;
            message.value = data.error;
          }

        },
        (error) => {
          isError.value = true;
          loading.value = false;
          message.value = error;
        }
      );
    }

  }
</script>
