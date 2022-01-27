import type {FileChange, FileDeclaration} from '@onecfg/core';
import deepmerge from 'deepmerge';

export interface MergeContentOptions {
  readonly replaceArrays?: boolean;
}

export function mergeContent<TContent extends object>(
  fileDeclaration: FileDeclaration<TContent>,
  content: TContent,
  options?: MergeContentOptions,
): FileChange<TContent> {
  return {
    ...fileDeclaration,
    replacer: (previousContent) =>
      deepmerge(previousContent, content, {
        arrayMerge: (target, source) =>
          options?.replaceArrays ? source : [...target, ...source],
      }),
  };
}
