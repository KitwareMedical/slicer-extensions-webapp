/**
 * Augment Window with `extensions_mode_manager` which is injected
 * by the Slicer app browser and only present within the slicer context.
 */

type ModeManagerCallback = (value: boolean) => void;

/**
 * Global state checks and mutations are documented at
 * https://github.com/KitwareMedical/slicer-extensions-webapp/issues/6
 */
interface ModeManager {
  isExtensionScheduledForUninstall(extensionName: string, callback: ModeManagerCallback): void;
  isExtensionInstalled(extensionName: string, callback: ModeManagerCallback): void;
  downloadAndInstallExtension(extensionId: string): void;
  scheduleExtensionForUninstall(extensionName: string): void;
  cancelExtensionScheduledForUninstall(extensionName: string): void;
}

interface Window {
  extensions_manager_model: ModeManager | undefined;
}
