<script setup lang="ts">
import { ref } from "vue";
const isDropdown = ref(false);
</script>

<template>
  <nav
    class="flex sticky z-10 top-0 bg-[#14213d] h-auto px-10 py-4 w-full justify-center"
  >
    <div class="flex items-center w-full justify-between">
      <div class="pl-5 flex justify-center items-center">
        <img width="40" src="../../assets/logo-white.svg" alt="" />
        <h1 class="text-[18px]">
          <span class="text-[#fca311] ml-2 font-bold"> </span>
        </h1>
      </div>
      <ul class="hidden md:flex items-center space-x-4 pr-5 cursor-pointer">
        <router-link to="/">
          <li class="text-[#fca311] text-[16px] font-bold hover:font-medium">
            Beranda
          </li>
        </router-link>

        <router-link to="/terdaftar">
          <li class="text-[#fca311] text-[16px] font-bold hover:font-medium">
            Peserta
          </li>
        </router-link>
      </ul>
      <ul
        v-if="isDropdown"
        class="flex transition-all ease-linear bg-[#14213d] px-4 py-2 rounded-lg flex-col justify-start fixed right-3 md:hidden space-y-4 cursor-pointer top-16"
      >
        <router-link to="/">
          <li class="text-[#fca311] text-[16px] font-bold hover:font-medium">
            Beranda
          </li>
        </router-link>
        <router-link to="/terdaftar">
          <li class="text-[#fca311] text-[16px] font-bold hover:font-medium">
            Peserta
          </li>
        </router-link>
      </ul>
      <span
        @click="isDropdown = !isDropdown"
        class="border-2 flex items-center justify-center md:hidden border-[#fca311] rounded-md p-[2px] text-[#fca311]"
      >
        Menu
      </span>
    </div>
  </nav>
</template>
