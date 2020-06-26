<template>
  <v-app>
    <v-main>
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-main>
  </v-app>
</template>

<style>
.overflow-scroll {
  height: 100%;
  overflow-y: auto;
}
</style>
