<script lang="ts">
import {
  computed, PropType, defineComponent, Ref, watch, toRefs, shallowRef,
} from '@vue/composition-api';
import { getCategories } from '@/lib/utils';
import {
  OS, Arch, Extension, hasExtensionManagerModel, listExtensions,
} from '@/lib/api/extension.service';

import Bus from '@/plugins/bus';
import AppBar from '@/components/AppBar.vue';
import ExtensionCard from '@/components/ExtensionCard.vue';
import CategoryList from '@/components/CategoryList.vue';

const AppId = process.env.VUE_APP_APP_ID as string;

export default defineComponent({
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
      type: String as PropType<Arch | undefined>,
      default: undefined,
    },
    legacy: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },

  components: {
    AppBar,
    CategoryList,
    ExtensionCard,
  },

  setup(props, { root }) {
    const route = root.$route;
    const router = root.$router;

    const selectedOs = computed({
      get(): string {
        return props.os;
      },
      set(newOs: string): void {
        const { query } = route;
        if (props.legacy) {
          router.push({ name: 'Catalog Legacy', query: { ...query, os: newOs } }).catch((error: Error) => {
            if (error.name !== 'NavigationDuplicated') {
              throw error;
            }
          });
          return;
        }
        const location = { name: 'Catalog', params: { os: newOs }, query };
        router.push(location).catch((error: Error) => {
          if (error.name !== 'NavigationDuplicated') {
            throw error;
          }
        });
      },
    });

    const query = computed({
      get(): string {
        // Explicitly use root.$route as it is a reactive variable
        return (props.legacy ? root.$route.query.search : root.$route.query.q || '') as string;
      },
      set(q: string): void {
        if (props.legacy) {
          router.push({ name: 'Catalog Legacy', query: { ...route.query, search: q } }).catch((error: Error) => {
            if (error.name !== 'NavigationDuplicated') {
              throw error;
            }
          });
          return;
        }
        router.replace({ name: 'Catalog', query: { q } }).catch((error: Error) => {
          if (error.name !== 'NavigationDuplicated') {
            throw error;
          }
        });
      },
    });

    const propsRefs = toRefs(props);
    const extensions = shallowRef([]) as Ref<Extension[]>;

    async function loadExtensions() {
      const params = {
        appId: AppId,
        revision: parseInt(props.revision, 10),
        os: props.os,
        arch: props.arch,
        query: query.value,
      };
      const { data } = await listExtensions(params);
      extensions.value = data;
    }

    loadExtensions();

    Bus.$on('extension-state-updated', () => loadExtensions());

    watch([
      propsRefs.revision,
      propsRefs.os,
      propsRefs.arch,
      query,
    ], loadExtensions);

    const categories = computed(() => ((
      [['All', extensions.value.length]] as [string, number][]).concat(getCategories(extensions.value))));

    const filteredExtensions = computed((): Extension[] => {
      const allExtensions = extensions.value;
      if (props.category.toLowerCase() !== 'all') {
        return allExtensions.filter((e) => e.meta.category === props.category);
      }
      return extensions.value;
    });

    const windowHasExtensionManagerModel = hasExtensionManagerModel();

    const valid = computed(() => {
      if (!(props.os in OS)) {
        return `Invalid OS.  Choose one of ${Object.keys(OS)}`;
      }
      if (props.arch !== undefined && !(props.arch in Arch)) {
        return `Invalid architecutre.  Choose one of ${Object.keys(Arch)}`;
      }
      return '';
    });

    return {
      query,
      extensions,
      categories,
      filteredExtensions,
      windowHasExtensionManagerModel,
      valid,
      selectedOs,
    };
  },
});
</script>

<template>
  <v-container
    fluid
    class="catalog"
  >
    <app-bar
      ref="appbar"
      show-query-field
      class="app-bar"
      :default-os="os"
      :default-query="query"
      @update:query="query = $event"
      @update:os="selectedOs = $event"
    />
    <v-row style="height: 100%">
      <v-col
        class="flex-grow-0"
        style="height: 100%"
      >
        <category-list
          class="category-list"
          :categories="categories"
          :legacy="legacy"
        />
      </v-col>
      <v-col style="height: 100%">
        <v-row class="overflow-scroll justify-begin">
          <extension-card
            v-for="extension in filteredExtensions"
            :key="extension._id"
            :legacy="legacy"
            v-bind="{ extension }"
            class="ma-3"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.catalog {
  height: 100vh;
  overflow: hidden;
}
.category-list {
  width: 250px;
}
</style>
