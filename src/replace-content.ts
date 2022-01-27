import type {FileChange, FileDeclaration} from '@onecfg/core';

export function replaceContent<TContent>(
  fileDeclaration: FileDeclaration<TContent>,
  content: TContent,
): FileChange<TContent> {
  return {...fileDeclaration, replacer: () => content};
}
