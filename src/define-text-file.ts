import type {FileDefinition} from '@onecfg/core';

export function defineTextFile(
  path: string,
  content: readonly string[],
): FileDefinition<readonly string[]> {
  return {path, content, predicate: isStringArray, serializer: toText};
}

function isStringArray(content: unknown): content is string[] {
  return Array.isArray(content) && content.every(isString);
}

function isString(content: unknown): content is string {
  return typeof content === `string`;
}

function toText(content: readonly string[]): string {
  return `${content.join(`\n`).trim()}\n`;
}
