<script lang="ts">
import Vue from 'vue';
import {
  hasExtensionManagerModel,
} from '@/lib/api/extension.service';

const BuildDate = process.env.VUE_APP_BUILD_DATE as string;
const GitHash = process.env.VUE_APP_GIT_HASH as string;

export default Vue.extend({
  computed: {
    hasExtensionManagerModel(): boolean {
      return hasExtensionManagerModel();
    },
    buildDate(): string {
      return BuildDate;
    },
    gitRevison(): string {
      return GitHash.slice(0, 7);
    },
    gitRevisionUrl(): string {
      return `https://github.com/KitwareMedical/slicer-extensions-webapp/commit/${GitHash}`;
    },
  },
});

</script>

<template>
  <v-app>
    <v-main>
      <notifications position="top right"/>
      <keep-alive>
        <router-view ref="view"/>
      </keep-alive>
    </v-main>
    <v-footer app v-if="!hasExtensionManagerModel">
      <v-col
        class="text-center"
        cols="12"
      >
        This site is maintained by <a href="https://kitware.com">@Kitware</a> on behalf of the 3D Slicer community.
        <br>Last update {{ buildDate }}. Revision <a :href="gitRevisionUrl">{{ gitRevison }}</a>
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
