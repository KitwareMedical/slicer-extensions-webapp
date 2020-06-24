import axios from './base';

export enum OS {
  macosx = 'macosx',
  linux = 'linux,'
}

export enum Arch {
  i386 = 'i386',
  amd64 = 'amd64',
}

export interface Extension {
  _id: string;
  created: string;
  creatorId: string;
  description: string;
  lowerName: string;
  name: string;
  title: string;
  size: number;
  updated: string;
  meta: {
    app_id: string;
    app_revision: string;
    arch: Arch;
    baseName: string;
    codebase: string;
    description: string;
    os: OS;
    packagetype: string;
    repository_type: string;
    repository_url: string;
    revision: string;
  };
}

export interface ListExtensionsParams {
  appId: string;
  revision: number;
  os: OS;
  arch: Arch | undefined;
}

function listExtensions({
  appId, revision, os, arch = undefined,
}: ListExtensionsParams) {
  return axios.get<Extension[]>(`app/${appId}/extension`, {
    params: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      app_revision: revision,
      os,
      arch,
      sort: 'created',
      sortdir: -1,
    },
  }).then(({ data }) => ({
    data: data.map((extension) => ({
      ...extension,
      title: extension.name.split('_')[1],
    })),
  }));
}

function getExtension({
  appId, id,
}: {
  appId: string;
  id: string;
}) {
  return axios.get<Extension>(`app/${appId}/extension`, {
    params: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      extension_id: id,
    },
  });
}

export {
  getExtension,
  listExtensions,
};
