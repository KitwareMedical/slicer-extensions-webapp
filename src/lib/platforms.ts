import { OS, Arch } from '@/lib/api/extension.service';

export interface Platform {
  key: string;
  text: string;
  os: OS;
  arch: Arch;
  icon: string;
}

export const platforms: Platform[] = [
  {
    key: 'linux',
    text: 'Linux',
    os: OS.linux,
    arch: Arch.amd64,
    icon: 'mdi-linux',
  },
  {
    key: 'macosx-amd64',
    text: 'macOS (Intel)',
    os: OS.macosx,
    arch: Arch.amd64,
    icon: 'mdi-apple',
  },
  {
    key: 'macosx-arm64',
    text: 'macOS (Apple Silicon)',
    os: OS.macosx,
    arch: Arch.arm64,
    icon: 'mdi-apple',
  },
  {
    key: 'win',
    text: 'Windows',
    os: OS.windows,
    arch: Arch.amd64,
    icon: 'mdi-microsoft-windows',
  },
];

// macOS packages are published for several architectures. When none is
// specified (e.g. links created before arm64 support), default to amd64.
export function defaultArch(os: string | undefined, arch: string | undefined): string | undefined {
  if (arch) {
    return arch;
  }
  return os === OS.macosx ? Arch.amd64 : undefined;
}

export function findPlatform(
  os: string | undefined, arch: string | undefined,
): Platform | undefined {
  return platforms.find((p) => p.os === os && p.arch === (arch || Arch.amd64));
}
