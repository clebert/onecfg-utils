import {generateContent} from '@onecfg/core';
import {defineJsonFile} from './define-json-file';
import {defineYamlFile} from './define-yaml-file';
import {mergeContent} from './merge-content';

const jsonContent =
  `
{
  "foo": {
    "bar": "a",
    "qux": "b"
  },
  "baz": [
    42,
    85
  ]
}
`.trim() + `\n`;

const yamlContent =
  `
foo:
  bar: a
  qux: b
baz:
  - 85
duplicates:
  - quux: z
  - quux: z
`.trim() + `\n`;

describe(`mergeContent()`, () => {
  test(`merge content of a JSON file`, () => {
    const jsonFile = defineJsonFile(`file.json`, {foo: {bar: `a`}, baz: [42]});
    const fileChange = mergeContent(jsonFile, {foo: {qux: `b`}, baz: [85]});

    expect(fileChange.predicate([])).toBe(true);
    expect(fileChange.predicate({})).toBe(true);
    expect(fileChange.predicate(``)).toBe(false);
    expect(fileChange.predicate(null)).toBe(false);
    expect(fileChange.predicate(undefined)).toBe(false);
    expect(generateContent(jsonFile, fileChange)).toEqual(jsonContent);
  });

  test(`merge content of a YAML file where arrays are replaced`, () => {
    const duplicate = {quux: `z`};

    const yamlFile = defineYamlFile(`file.yml`, {
      foo: {bar: `a`},
      baz: [42],
      duplicates: [duplicate, duplicate],
    });

    const fileChange = mergeContent(
      yamlFile,
      {foo: {qux: `b`}, baz: [85]},
      {replaceArrays: true},
    );

    expect(fileChange.predicate([])).toBe(true);
    expect(fileChange.predicate({})).toBe(true);
    expect(fileChange.predicate(``)).toBe(false);
    expect(fileChange.predicate(null)).toBe(false);
    expect(fileChange.predicate(undefined)).toBe(false);
    expect(generateContent(yamlFile, fileChange)).toEqual(yamlContent);
  });
});
