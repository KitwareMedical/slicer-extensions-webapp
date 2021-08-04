<script lang="ts">
import Vue, { PropType } from 'vue';
import {
  Extension, getExtension, OS, Arch,
} from '@/lib/api/extension.service';

import AppBar from '@/components/AppBar.vue';
import ActionButton from '@/components/ActionButton.vue';

const AppId = process.env.VUE_APP_APP_ID as string;

export default Vue.extend({
  props: {
    baseName: {
      type: String as PropType<string>,
      required: true,
    },
    revision: {
      type: String as PropType<string>,
      required: true,
    },
    os: {
      type: String as PropType<OS>,
      required: true,
    },
    arch: {
      type: String as PropType<Arch|undefined>,
      default: undefined,
    },
  },

  components: {
    ActionButton,
    AppBar,
  },

  asyncComputed: {
    extension: {
      async get(): Promise<Extension | null> {
        const params = {
          appId: AppId,
          baseName: this.baseName,
          revision: parseInt(this.revision, 10),
          os: this.os,
          arch: this.arch,
        };
        return getExtension(params);
      },
      default: null,
    },
  },

  computed: {
    selectedOs: {
      get(): string {
        return this.$route.params.os;
      },
      set(os: string): void {
        this.$router.push({ name: 'Extension Details', params: { os } });
      },
    },
  },
});
</script>

<template>
<v-container>
  <app-bar
    class="app-bar"
    :default-os="os"
    :os.sync="selectedOs"
  />
  <v-row v-if="extension">
    <v-col cols="3">
      <img
        :src="extension.meta.icon_url"
        width="100%"
      >
      <action-button
        :extension="extension"
        class="my-3"
      />
    </v-col>
    <v-divider vertical class="mx-5"/>
    <v-col cols="8">
      <div class="text-h3 mb-3"> {{ extension.title }} </div>
      <div class="text-h6 mb-2"> {{ extension.meta.category }} </div>
      <div class="text-subtitle-1 mb-2">
        Created on {{ new Date(extension.created).toDateString() }}
      </div>
      <div class="text-subtitle-1"> {{ extension.meta.description }} </div>
      <v-btn
        outlined
        class="my-3 mr-3"
        :href="extension.meta.homepage"
      >
        <v-icon class="pr-1"> mdi-home </v-icon>
        View Homepage
      </v-btn>
      <v-btn
        outlined
        class="my-3 mr-3"
        :href="extension.meta.repository_url"
      >
        <v-icon class="pr-1"> mdi-code-tags </v-icon>
        View Source Code
      </v-btn>
    </v-col>
  </v-row>
</v-container>
</template>
