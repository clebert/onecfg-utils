import {generateContent} from '@onecfg/core';
import {defineTextFile} from './define-text-file';
import {replaceContent} from './replace-content';

describe(`replaceContent()`, () => {
  test(`replace content of a text file`, () => {
    const textFile = defineTextFile(`file.txt`, [`a`]);
    const fileChange = replaceContent(textFile, [`b`]);

    expect(fileChange.predicate([])).toBe(true);
    expect(fileChange.predicate([`a`])).toBe(true);
    expect(fileChange.predicate([0])).toBe(false);
    expect(fileChange.predicate({})).toBe(false);
    expect(fileChange.predicate(null)).toBe(false);
    expect(fileChange.predicate(undefined)).toBe(false);
    expect(generateContent(textFile, fileChange)).toBe(`b\n`);
  });
});
