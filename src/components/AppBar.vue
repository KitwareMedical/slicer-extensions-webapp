<script lang="ts">
import Vue, { PropType } from 'vue';
import {
  OS, hasExtensionManagerModel,
} from '@/lib/api/extension.service';

export default Vue.extend({
  props: {
    defaultOs: {
      type: String as PropType<string>,
      required: true,
    },
    defaultQuery: {
      type: String as PropType<string>,
    },
    showQueryField: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },

  data() {
    return {
      os: this.defaultOs,
      query: this.defaultQuery,
    };
  },

  computed: {
    hasExtensionManagerModel(): boolean {
      return hasExtensionManagerModel();
    },
    operatingSystems(): string[] {
      return Object.values(OS);
    },
  },
});
</script>

<template>
  <v-app-bar
    v-if="!hasExtensionManagerModel"
    app
    >
    <v-app-bar-title>Slicer Extensions Manager</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-select
      v-model="os"
      @change="$emit('update:os', os);"
      hide-details
      solo
      :items="operatingSystems"
      >
    </v-select>
    <v-text-field
      v-if="showQueryField"
      v-model="query"
      @keyup="$emit('update:query', query);"
      hide-details
      light
      placeholder="Type text..."
      single-line
      solo
      text="yes"
      />
  </v-app-bar>
</template>
