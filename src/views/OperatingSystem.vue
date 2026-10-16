<script lang="ts">
import {
  defineComponent, PropType, ref, onActivated, onMounted,
} from '@vue/composition-api';
import { getLatestPackageRevision } from '@/lib/api/extension.service';
import { Platform, platforms } from '@/lib/platforms';

const AppId = process.env.VUE_APP_APP_ID as string;

export default defineComponent({
  name: 'OperatingSystemView',

  props: {
    category: {
      type: String as PropType<string>,
      required: true,
    },
  },

  setup(props) {
    const revisionByPlatform = ref<Record<string, string | null>>({});

    const setRevisionByPlatform = async () => {
      const revisions = await Promise.all(platforms.map(
        (p) => getLatestPackageRevision({ appId: AppId, os: p.os, arch: p.arch }),
      ));
      revisionByPlatform.value = Object.fromEntries(
        platforms.map((p, i) => [p.key, revisions[i]]),
      );
    };

    onMounted(() => {
      setRevisionByPlatform();
    });
    onActivated(() => {
      setRevisionByPlatform();
    });

    const platformRoute = (platform: Platform) => {
      const revision = revisionByPlatform.value[platform.key];
      return revision
        ? {
          name: 'Catalog',
          params: {
            category: props.category, revision, os: platform.os, arch: platform.arch,
          },
        }
        : undefined;
    };

    return {
      platforms,
      revisionByPlatform,
      setRevisionByPlatform,
      platformRoute,
    };
  },
});
</script>

<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col
        v-for="platform in platforms"
        :key="platform.key"
      >
        <div class="text-center">
          <v-btn
            class="ma-2"
            :loading="revisionByPlatform[platform.key] == undefined"
            :disabled="revisionByPlatform[platform.key] == undefined"
            color="success"
            :to="platformRoute(platform)"
          >
            {{ platform.text }}
            <template v-slot:loader>
              <span>Loading...</span>
            </template>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
