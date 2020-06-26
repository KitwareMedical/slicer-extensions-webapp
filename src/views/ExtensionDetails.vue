<script lang="ts">
import Vue, { PropType } from 'vue';
import {
  Extension, getExtension, GetExtensionParams,
} from '@/lib/api/extension.service';

const AppId = process.env.VUE_APP_APP_ID as string;

export default Vue.extend({
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
  },

  data() {
    return {
      extension: null as Extension | null,
    };
  },

  computed: {
    requestParams(): GetExtensionParams {
      return {
        appId: AppId,
        name: this.name,
      };
    },
  },

  methods: {
    async updateExtension() {
      this.extension = await getExtension(this.requestParams);
    },
  },

  watch: {
    requestParams() {
      this.updateExtension();
    },
  },

  created() {
    this.updateExtension();
  },
});
</script>

<template>
<v-container>
  <v-row v-if="extension">
    <v-col cols="3">
      <img
        :src="extension.meta.icon_url"
        width="100%"
      >
      <v-btn
        depressed
        block
        color="success"
        class="my-3"
      >
        <v-icon class="pr-1"> mdi-download </v-icon>
        Download
      </v-btn>
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
        :to="extension.meta.homepage"
      >
        <v-icon class="pr-1"> mdi-home </v-icon>
        View Homepage
      </v-btn>
      <v-btn
        outlined
        class="my-3 mr-3"
        :to="extension.meta.repository_url"
      >
        <v-icon class="pr-1"> mdi-code-tags </v-icon>
        View Source Code
      </v-btn>
    </v-col>
  </v-row>
</v-container>
</template>
