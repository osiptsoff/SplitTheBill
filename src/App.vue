<script setup>
</script>
<!--style="text-align: center"-->
<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title class="text-center text-yellow-darken-3">
        <h1> Делим счёт </h1>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
        <router-view v-slot="{ Component }">
          <transition>
            <component :is="Component"></component>
          </transition>
        </router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
