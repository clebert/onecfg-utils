import type {
  FileChange,
  FileChangeOptions,
  FileDeclaration,
} from '@onecfg/core';

export function replaceContent<TContent>(
  fileDeclaration: FileDeclaration<TContent>,
  content: TContent,
  options: FileChangeOptions = {},
): FileChange<TContent> {
  return {...fileDeclaration, options, replacer: () => content};
}
