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
          <transition name="router"
                      mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
  .router-enter-active {
    animation: enter 0.6s;
  }
  .router-leave-active {
    animation: leave 0.3s;
  }
  .router-leave-to {
    position: fixed;
  }

  @keyframes enter {
    from{ transform: translateX(100%); }
    to{ transform: translateX(0); }
  }

  @keyframes leave {
    from{ transform: translateX(0); }
    to{ transform: translateX(-100%); }
  }
</style>
