<script lang="ts">
import {
  computed, defineComponent,
} from '@vue/composition-api';
import {
  hasExtensionManagerModel,
} from '@/lib/api/extension.service';

const BuildDate = process.env.VUE_APP_BUILD_DATE as string;
const GitHash = process.env.VUE_APP_GIT_HASH as string;

export default defineComponent({
  name: 'App',

  setup() {
    const hasExtensionManagerModelComputed = computed(() => hasExtensionManagerModel());
    const buildDate = computed(() => BuildDate);
    const gitRevision = computed(() => GitHash.slice(0, 7));
    const gitRevisionUrl = computed(() => `https://github.com/KitwareMedical/slicer-extensions-webapp/commit/${GitHash}`);

    return {
      hasExtensionManagerModel: hasExtensionManagerModelComputed,
      buildDate,
      gitRevision,
      gitRevisionUrl,
    };
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
        <br>This website was last deployed on {{ buildDate }}.
        Revision <a :href="gitRevisionUrl">{{ gitRevision }}</a>
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
