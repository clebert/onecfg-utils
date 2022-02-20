import type {
  FileChange,
  FileChangeOptions,
  FileDeclaration,
} from '@onecfg/core';
import deepmerge from 'deepmerge';

export interface MergeContentOptions extends FileChangeOptions {
  readonly replaceArrays?: boolean;
}

export function mergeContent<TContent extends object>(
  fileDeclaration: FileDeclaration<TContent>,
  content: TContent,
  options: MergeContentOptions = {},
): FileChange<TContent> {
  const {path, predicate} = fileDeclaration;
  const {replaceArrays, ...fileChangeOptions} = options;

  return {
    path,
    predicate,
    options: fileChangeOptions,
    replacer: (previousContent) =>
      deepmerge(previousContent, content, {
        arrayMerge: (target, source) =>
          replaceArrays ? source : [...target, ...source],
      }),
  };
}
