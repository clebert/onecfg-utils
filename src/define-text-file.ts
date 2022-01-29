import type {FileDefinition} from '@onecfg/core';
import {isStringArray} from './is-string-array';
import {toText} from './to-text';

export function defineTextFile(
  path: string,
  content: readonly string[],
): FileDefinition<readonly string[]> {
  return {path, content, predicate: isStringArray, serializer: toText};
}
