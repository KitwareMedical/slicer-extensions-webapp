<script lang="ts">
import {
  defineComponent, PropType, ref, watch,
} from '@vue/composition-api';
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

export default defineComponent({
  name: 'ActionButton',

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

  setup(props) {
    const button = ref<ButtonOptions>(defaultButtonOptions);

    // Update button options based on extension state
    const updateButton = async () => {
      const state = await props.extension.installState;
      switch (state) {
        case InstallState.Installed:
          button.value = {
            icon: 'mdi-toy-brick-remove-outline',
            color: 'success',
            text: 'Uninstall',
          };
          break;
        case InstallState.ScheduledForUninstall:
          button.value = {
            icon: 'mdi-toy-brick-remove',
            color: 'error',
            text: 'Uninstall',
          };
          break;
        case InstallState.NotInstalled:
          button.value = {
            icon: 'mdi-download',
            color: 'primary',
            text: 'Install',
          };
          break;
        default:
          button.value = defaultButtonOptions;
      }
    };

    watch(
      () => props.extension,
      () => {
        updateButton();
      },
      { immediate: true },
    );

    const handleClick = async () => {
      const state = await props.extension.installState;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const manager = (window as any).extensions_manager_model;
      if (manager) {
        switch (state) {
          case InstallState.Installed:
            manager.scheduleExtensionForUninstall(props.extension.title);
            break;
          case InstallState.NotInstalled:
            // eslint-disable-next-line no-underscore-dangle
            manager.downloadAndInstallExtension(props.extension._id);
            break;
          case InstallState.ScheduledForUninstall:
            manager.cancelExtensionScheduledForUninstall(props.extension.title);
            break;
          default:
            throw new Error(`Unexpected state encountered: ${state}`);
        }
      } else {
        const link = document.createElement('a');
        // eslint-disable-next-line no-underscore-dangle
        link.href = `https://slicer-packages.kitware.com/api/v1/item/${props.extension._id}/download`;
        document.body.appendChild(link);
        link.click();
      }
    };

    return {
      button,
      handleClick,
    };
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
