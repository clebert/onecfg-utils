import type {FileDefinition} from '@onecfg/core';
import {dump} from 'js-yaml';

export function defineYamlFile(
  path: string,
  content: object,
): FileDefinition<object> {
  return {path, content, predicate: isObject, serializer: toYaml};
}

function isObject(content: unknown): content is object {
  return typeof content === `object` && content !== null;
}

function toYaml(content: object): string {
  return dump(content, {noRefs: true});
}
