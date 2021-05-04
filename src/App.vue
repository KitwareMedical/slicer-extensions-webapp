<template>
  <v-app>
    <v-main>
      <notifications position="top right"/>
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
