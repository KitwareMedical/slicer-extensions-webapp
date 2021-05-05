<script lang="ts">
import Vue, { PropType } from 'vue';
import { Extension, InstallState } from '@/lib/api/extension.service';

interface ButtonOptions {
  icon: string;
  color: string;
  text: string;
}

const defaultButtonOptions: ButtonOptions = {
  icon: 'mdi-download',
  color: 'success',
  text: 'Download',
};

export default Vue.extend({
  props: {
    extension: {
      type: Object as PropType<Extension>,
      required: true,
    },
    outlined: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },

  methods: {
    async handleClick() {
      const state = await this.extension.installState;
      const manager = window.extensions_manager_model;
      if (manager) {
        switch (state) {
          case InstallState.Installed:
            manager.scheduleExtensionForUninstall(this.extension.title);
            break;
          case InstallState.NotInstalled:
            // eslint-disable-next-line no-underscore-dangle
            manager.downloadAndInstallExtension(this.extension._id);
            break;
          case InstallState.ScheduledForUninstall:
            manager.cancelExtensionScheduledForUninstall(this.extension.title);
            break;
          default:
            throw new Error(`Unexpected state encountered: ${state}`);
        }
      } else {
        // TODO: download the extension
      }
    },
  },

  asyncComputed: {
    button: {
      get(): Promise<ButtonOptions> {
        return this.extension.installState.then((state) => {
          switch (state) {
            case InstallState.Installed:
              return {
                icon: 'mdi-toy-brick-remove-outline',
                color: 'success',
                text: 'Uninstall',
              };
            case InstallState.ScheduledForUninstall:
              return {
                icon: 'mdi-toy-brick-remove',
                color: 'error',
                text: 'Uninstall',
              };
            case InstallState.NotInstalled:
              return {
                icon: 'mdi-download',
                color: 'primary',
                text: 'Install',
              };
            default:
              return defaultButtonOptions;
          }
        });
      },
      default: defaultButtonOptions,
    },
  },
});
</script>

<template>
  <v-btn
    block
    depressed
    :outlined="outlined"
    :color="button.color"
    @click="handleClick"
  >
    <v-icon class="pr-1"> {{ button.icon }} </v-icon>
    {{ button.text }}
  </v-btn>
</template>
