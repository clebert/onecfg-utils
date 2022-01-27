import type {FileDefinition} from '@onecfg/core';

export function defineJsonFile(
  path: string,
  content: object,
): FileDefinition<object> {
  return {path, content, predicate: isObject, serializer: toJson};
}

function isObject(content: unknown): content is object {
  return typeof content === `object` && content !== null;
}

function toJson(content: object): string {
  return `${JSON.stringify(content, undefined, 2)}\n`;
}
