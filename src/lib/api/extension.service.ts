import axios from './base';

export enum OS {
  macosx = 'macosx',
  linux = 'linux,'
}

export enum Arch {
  i386 = 'i386',
  amd64 = 'amd64',
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
}

export interface ListExtensionsParams {
  appId: string;
  revision: number;
  os: OS;
  arch: Arch | undefined;
}

function addExtensionDetails(e: RestExtension): Extension {
  return {
    ...e,
    title: e.name.split('_')[1],
  };
}

function listExtensions({
  appId, revision, os, arch = undefined,
}: ListExtensionsParams) {
  return axios.get<RestExtension[]>(`app/${appId}/extension`, {
    params: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      app_revision: revision,
      os,
      arch,
      sort: 'created',
      sortdir: -1,
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
  listExtensions,
};
