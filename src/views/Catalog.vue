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
    const selectedOs = computed({
      get(): string {
        return props.os;
      },
      set(os: string): void {
        const { query } = root.$route;
        if (props.legacy) {
          root.$router.push({ name: 'Catalog Legacy', query: { ...query, os } }).catch((error: Error) => {
            if (error.name !== 'NavigationDuplicated') {
              throw error;
            }
          });
          return;
        }
        const location = { name: 'Catalog', params: { os }, query };
        root.$router.push(location).catch((error: Error) => {
          if (error.name !== 'NavigationDuplicated') {
            throw error;
          }
        });
      },
    });
    const query = computed({
      get(): string {
        return (props.legacy ? root.$route.query.search : root.$route.query.q || '') as string;
      },
      set(q: string): void {
        if (props.legacy) {
          root.$router.push({ name: 'Catalog Legacy', query: { ...root.$route.query, search: q } }).catch((error: Error) => {
            if (error.name !== 'NavigationDuplicated') {
              throw error;
            }
          });
          return;
        }
        root.$router.replace({ name: 'Catalog', query: { q } }).catch((error: Error) => {
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

    watch([propsRefs.revision, propsRefs.os, propsRefs.arch, query], loadExtensions);

    const categories = computed(() => ((
      [['All', extensions.value.length]] as [string, number][]).concat(getCategories(extensions.value))));

    const filteredExtensions = computed(() => {
      if (props.category.toLowerCase() !== 'all') {
        return extensions.value.filter((e) => e.meta.category === props.category);
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
    <v-alert
      outlined
      prominent
      text
      type="warning"
    >
      <h2>We&rsquo;ll be back very soon! Scheduled maintenance happening
      on March 28th, 2024.</h2>
      <h4>
      Sorry for the inconvenience, but we are performing some maintenance at the moment.
      If you have questions or would like to learn more, see <a href="https://discourse.slicer.org/t/maintenance-of-download-slicer-org-slicer-kitware-com-and-slicer-packages-kitware-com-planned-for-march-28th-2024-3-30pm-to-5-00pm-et/35155">here</a>, otherwise we anticipate the maintenance to last for approximately 1.5 hours, from 3:30 PM to 5:00 PM ET on March 28th, 2024.
      </h4>
    </v-alert>
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
