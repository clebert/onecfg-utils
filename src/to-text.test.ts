import {toText} from './to-text';

describe(`toText()`, () => {
  test(`generates text`, () => {
    expect(toText([`foo`, `bar`, `baz`])).toBe(`foo\nbar\nbaz\n`);
  });
});
