import axios from './base';

export enum OS {
  macosx = 'macosx',
  linux = 'linux',
  windows = 'win',
}

export enum Arch {
  i386 = 'i386',
  amd64 = 'amd64',
}

export enum InstallState {
  NotInstalled = 1,
  Installed,
  ScheduledForUninstall,
  NotApplicable,
}

interface RestExtension {
  _id: string;
  created: string;
  creatorId: string;
  description: string;
  lowerName: string;
  name: string;
  size: number;
  updated: string;
  meta: {
    app_id: string;
    app_revision: string;
    arch: Arch;
    baseName: string;
    category: string;
    codebase: string;
    description: string;
    homepage: string;
    icon_url: string;
    os: OS;
    packagetype: string;
    repository_type: string;
    repository_url: string;
    revision: string;
    screenshots: string;
  };
}

export interface Extension extends RestExtension {
  title: string;
  installState: Promise<InstallState>;
}

export interface ListExtensionsParams {
  appId: string;
  revision: number;
  os: OS;
  arch: Arch | undefined;
  query: string | (string | null)[] | null;
}

function hasExtensionManagerModel(): boolean {
  return window.extensions_manager_model !== undefined;
}

function getInstallState(e: RestExtension): Promise<InstallState> {
  const manager = window.extensions_manager_model;
  if (manager) {
    return Promise.all([
      new Promise<boolean>((r) => manager.isExtensionScheduledForUninstall(e.meta.baseName, r)),
      new Promise<boolean>((r) => manager.isExtensionInstalled(e.meta.baseName, r)),
    ]).then(([scheduled, installed]) => {
      if (scheduled) {
        return InstallState.ScheduledForUninstall;
      }
      if (installed) {
        return InstallState.Installed;
      }
      return InstallState.NotInstalled;
    });
  }
  return Promise.resolve(InstallState.NotApplicable);
}

function addExtensionDetails(e: RestExtension): Extension {
  return {
    ...e,
    title: e.meta.baseName,
    installState: getInstallState(e),
  };
}

function listExtensions({
  appId, revision, os, arch = undefined, query = null,
}: ListExtensionsParams) {
  return axios.get<RestExtension[]>(`app/${appId}/extension`, {
    params: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      app_revision: revision,
      os,
      arch,
      q: query,
      limit: 0,
      sort: 'meta.baseName',
      sortdir: 1,
    },
  }).then(({ data }) => ({
    data: data.map((extension) => addExtensionDetails(extension)),
  }));
}

export interface GetExtensionParams {
  appId: string;
  id?: string;
  baseName?: string;
  revision: number;
  os: OS;
  arch: Arch | undefined;
}

function getExtension({
  appId, id, baseName, revision, os, arch,
}: GetExtensionParams) {
  return axios.get<RestExtension[]>(`app/${appId}/extension`, {
    params: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      extension_id: id,
      baseName,
      os,
      arch,
      revision,
    },
  }).then(({ data }) => {
    if (data.length) {
      return addExtensionDetails(data[0]);
    }
    return null;
  });
}

export {
  getExtension,
  hasExtensionManagerModel,
  listExtensions,
};
