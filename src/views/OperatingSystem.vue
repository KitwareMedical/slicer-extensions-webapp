<script lang="ts">
import {
  defineComponent, PropType, ref, onActivated, onMounted, computed,
} from '@vue/composition-api';
import { getLatestPackageRevision, OS } from '@/lib/api/extension.service';

const AppId = process.env.VUE_APP_APP_ID as string;

interface OperatingSystemToRevisionMapping {
  linux: string | null;
  macosx: string | null;
  win: string | null;
}

export default defineComponent({
  name: 'OperatingSystemView',

  props: {
    category: {
      type: String as PropType<string>,
      required: true,
    },
  },

  setup(props) {
    const revisionByOperatingSystems = ref<OperatingSystemToRevisionMapping>({
      linux: null,
      macosx: null,
      win: null,
    });

    const setRevisionByOperatingSystems = async () => {
      revisionByOperatingSystems.value = {
        linux: await getLatestPackageRevision({ appId: AppId, os: OS.linux, arch: undefined }),
        macosx: await getLatestPackageRevision({ appId: AppId, os: OS.macosx, arch: undefined }),
        win: await getLatestPackageRevision({ appId: AppId, os: OS.windows, arch: undefined }),
      };
    };

    onMounted(() => {
      setRevisionByOperatingSystems();
    });
    onActivated(() => {
      setRevisionByOperatingSystems();
    });

    return {
      revisionByOperatingSystems,
      setRevisionByOperatingSystems,
      linuxRoute: computed(() => (revisionByOperatingSystems.value.linux
        ? { name: 'Catalog', params: { category: props.category, revision: revisionByOperatingSystems.value.linux, os: 'linux' } }
        : undefined)),
      macosxRoute: computed(() => (revisionByOperatingSystems.value.macosx
        ? { name: 'Catalog', params: { category: props.category, revision: revisionByOperatingSystems.value.macosx, os: 'macosx' } }
        : undefined)),
      winRoute: computed(() => (revisionByOperatingSystems.value.win
        ? { name: 'Catalog', params: { category: props.category, revision: revisionByOperatingSystems.value.win, os: 'win' } }
        : undefined)),
    };
  },
});
</script>

<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col>
        <div class="text-center">
          <v-btn
            class="ma-2"
            :loading="revisionByOperatingSystems.linux == undefined"
            :disabled="revisionByOperatingSystems.linux == undefined"
            color="success"
            :to="linuxRoute"
          >
            Linux
            <template v-slot:loader>
              <span>Loading...</span>
            </template>
          </v-btn>
        </div>
      </v-col>
      <v-col>
        <div class="text-center">
          <v-btn
            class="ma-2"
            :loading="revisionByOperatingSystems.macosx == undefined"
            :disabled="revisionByOperatingSystems.macosx == undefined"
            color="success"
            :to="macosxRoute"
          >
            macOS
            <template v-slot:loader>
              <span>Loading...</span>
            </template>
          </v-btn>
        </div>
      </v-col>
      <v-col>
        <div class="text-center">
          <v-btn
            class="ma-2"
            :loading="revisionByOperatingSystems.win == undefined"
            :disabled="revisionByOperatingSystems.win == undefined"
            color="success"
            :to="winRoute"
          >
            Windows
            <template v-slot:loader>
              <span>Loading...</span>
            </template>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
