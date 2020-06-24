<script lang="ts">
import Vue, { PropType } from 'vue';
import {
  OS, Arch, Extension, listExtensions, ListExtensionsParams,
} from '@/lib/api/extension.service';

import ExtensionCard from '@/components/ExtensionCard.vue';
import CategoryList from '@/components/CategoryList.vue';

const SlicerAppId = process.env.VUE_APP_SLICER_APP_ID as string;

export default Vue.extend({
  props: {
    category: {
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
    CategoryList,
    ExtensionCard,
  },

  data() {
    return {
      extensions: [] as Extension[],
    };
  },

  computed: {
    listParams(): ListExtensionsParams {
      return {
        appId: SlicerAppId,
        revision: parseInt(this.revision, 10),
        os: this.os,
        arch: this.arch,
      };
    },
    valid(): string {
      if (!(this.os in OS)) {
        return `Invalid OS.  Choose one of ${Object.keys(OS)}`;
      }
      if (this.arch !== undefined && !(this.arch in Arch)) {
        return `Invalid architecutre.  Choose one of ${Object.keys(Arch)}`;
      }
      return '';
    },
  },

  methods: {
    async updateExtensions() {
      const { data } = await listExtensions(this.listParams);
      this.extensions = data;
    },
  },

  watch: {
    listParams() {
      this.updateExtensions();
    },
  },

  created() {
    this.updateExtensions();
  },
});
</script>

<template>
<v-row>
  <v-col class="flex-grow-0">
    <category-list style="width: 250px;" />
  </v-col>
  <v-col>
    <v-row>
      <extension-card
        v-for="extension in extensions"
        :key="extension._id"
        v-bind="extension"
        class="ma-2"
      />
    </v-row>
  </v-col>
</v-row>
</template>
