<script lang="ts">
import Vue, { PropType } from 'vue';
import {
  OS, hasExtensionManagerModel,
} from '@/lib/api/extension.service';

interface VueSelectItem {
  text: string;
  value: OS;
  icon: string;
}

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
    showOperatingSystemSelector: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    legacy: {
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

  activated() {
    this.os = this.defaultOs;
  },

  computed: {
    hasExtensionManagerModel(): boolean {
      return hasExtensionManagerModel();
    },
    operatingSystems(): VueSelectItem[] {
      return [
        {
          text: 'Linux',
          value: OS.linux,
          icon: 'mdi-linux',
        },
        {
          text: 'macOS',
          value: OS.macosx,
          icon: 'mdi-apple',
        },
        {
          text: 'Windows',
          value: OS.windows,
          icon: 'mdi-microsoft-windows',
        },
      ];
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
    <v-text-field
      v-if="showQueryField"
      v-model="query"
      @input="$emit('update:query', $event);"
      class="shrink mx-4"
      hide-details
      light
      placeholder="Type text..."
      prepend-inner-icon="mdi-magnify"
      single-line
      solo
      text="yes"
      />
    <v-spacer></v-spacer>
    <v-select
      v-if="showOperatingSystemSelector"
      v-model="os"
      @change="$emit('update:os', $event);"
      class="shrink mx-4"
      hide-details
      solo
      :items="operatingSystems"
    >
      <template v-slot:selection="data">
        <v-list-item-icon><v-icon>{{ data.item.icon }}</v-icon></v-list-item-icon>
        <v-list-item-title>{{ data.item.text }}</v-list-item-title>
      </template>
      <template v-slot:item="data">
        <v-list-item-icon><v-icon>{{ data.item.icon }}</v-icon></v-list-item-icon>
        <v-list-item-title>{{ data.item.text }}</v-list-item-title>
      </template>
    </v-select>
  </v-app-bar>
</template>
