<script lang="ts">
import Vue, { PropType } from 'vue';

import { getLatestPackageRevision, OS } from '@/lib/api/extension.service';

const AppId = process.env.VUE_APP_APP_ID as string;

interface OperatingSystemToRevisionMapping {
  linux: string | null;
  macosx: string | null;
  win: string | null;
}

export default Vue.extend({
  props: {
    category: {
      type: String as PropType<string>,
      required: true,
    },
  },

  data() {
    return {
      revisionByOperatingSystems: {
        linux: null,
        macosx: null,
        win: null,
      } as OperatingSystemToRevisionMapping,
    };
  },

  methods: {
    async setRevisionByOperatingSystems() {
      this.revisionByOperatingSystems = {
        linux: await getLatestPackageRevision({ appId: AppId, os: OS.linux, arch: undefined }),
        macosx: await getLatestPackageRevision({ appId: AppId, os: OS.macosx, arch: undefined }),
        win: await getLatestPackageRevision({ appId: AppId, os: OS.windows, arch: undefined }),
      };
    },
  },

  activated() {
    this.setRevisionByOperatingSystems();
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
            :to="{ name: 'Catalog', params: {
              category: category,
              revision: revisionByOperatingSystems.linux,
              os: 'linux',
            }}"
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
            :to="{ name: 'Catalog', params: {
              category: category,
              revision: revisionByOperatingSystems.macosx,
              os: 'macosx',
            }}"
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
            :to="{ name: 'Catalog', params: {
              category: category,
              revision: revisionByOperatingSystems.win,
              os: 'win',
            }}"
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
