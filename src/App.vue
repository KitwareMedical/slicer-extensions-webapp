<script lang="ts">
import Vue from 'vue';
import {
  hasExtensionManagerModel,
} from '@/lib/api/extension.service';

export default Vue.extend({
  computed: {
    hasExtensionManagerModel(): boolean {
      return hasExtensionManagerModel();
    },
  },
});

</script>

<template>
  <v-app>
    <v-main>
      <notifications position="top right"/>
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-main>
    <v-footer app v-if="!hasExtensionManagerModel">
      <v-col
        class="text-center"
        cols="12"
      >
        This site is maintained by <a href="https://kitware.com">@Kitware</a> on behalf of the 3D Slicer community.
      </v-col>
    </v-footer>
  </v-app>
</template>

<style>
.overflow-scroll {
  height: 100%;
  overflow-y: auto;
}
</style>
