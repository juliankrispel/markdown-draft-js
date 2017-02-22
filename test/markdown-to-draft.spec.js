import { markdownToDraft, draftToMarkdown } from '../src/index';
import { ContentBlock, convertToRaw, convertFromHTML, ContentState } from 'draft-js';

describe('markdownToDraft', function () {
  it('renders links correctly', function () {
    var markdown = 'This is a test of [a link](https://google.com)\n\n\n\nAnd [perhaps](https://facebook.github.io/draft-js/) we should test once more.';
    var conversionResult = markdownToDraft(markdown);
    expect(conversionResult.blocks[0].text).toEqual('This is a test of a link');
    expect(conversionResult.blocks[0].type).toEqual('unstyled');
    expect(conversionResult.blocks[0].inlineStyleRanges).toEqual([]);
    expect(conversionResult.blocks[0].entityRanges[0].offset).toEqual(18);
    expect(conversionResult.blocks[0].entityRanges[0].length).toEqual(6);
    var blockOneKey = conversionResult.blocks[0].entityRanges[0].key;
    expect(conversionResult.entityMap[blockOneKey].type).toEqual('LINK');
    expect(conversionResult.entityMap[blockOneKey].data.url).toEqual('https://google.com');

    expect(conversionResult.blocks[1].text).toEqual('And perhaps we should test once more.');
    expect(conversionResult.blocks[1].type).toEqual('unstyled');
    expect(conversionResult.blocks[1].inlineStyleRanges).toEqual([]);
    expect(conversionResult.blocks[1].entityRanges[0].offset).toEqual(4);
    expect(conversionResult.blocks[1].entityRanges[0].length).toEqual(7);
    var blockTwoKey = conversionResult.blocks[1].entityRanges[0].key;
    expect(conversionResult.entityMap[blockTwoKey].type).toEqual('LINK');
    expect(conversionResult.entityMap[blockTwoKey].data.url).toEqual('https://facebook.github.io/draft-js/');
  });

  it('renders "the kitchen sink" correctly', function () {
    var markdown = '# Hello!\n\nMy name is **Rose** :) \nToday, I\'m here to talk to you about how great markdown is!\n\n## First, here\'s a few bullet points:\n\n- One\n- Two\n- Three\n\n```\nA codeblock\n```\n\nAnd then... `some monospace text`?\nOr... _italics?_';
    var conversionResult = markdownToDraft(markdown);
    expect(conversionResult.blocks[0].text).toEqual('Hello!');
    expect(conversionResult.blocks[0].type).toEqual('header-one');
    expect(conversionResult.blocks[0].inlineStyleRanges).toEqual([]);
    expect(conversionResult.blocks[0].entityRanges).toEqual([]);

    expect(conversionResult.blocks[1].text).toEqual('My name is Rose :)\nToday, I\'m here to talk to you about how great markdown is!');
    expect(conversionResult.blocks[1].type).toEqual('unstyled');
    expect(conversionResult.blocks[1].inlineStyleRanges[0].offset).toEqual(11);
    expect(conversionResult.blocks[1].inlineStyleRanges[0].length).toEqual(4);
    expect(conversionResult.blocks[1].inlineStyleRanges[0].style).toEqual('BOLD');

    expect(conversionResult.blocks[2].text).toEqual('First, here\'s a few bullet points:');
    expect(conversionResult.blocks[2].type).toEqual('header-two');
    expect(conversionResult.blocks[2].inlineStyleRanges).toEqual([]);
    expect(conversionResult.blocks[2].entityRanges).toEqual([]);

    expect(conversionResult.blocks[3].text).toEqual('One');
    expect(conversionResult.blocks[3].type).toEqual('unordered-list-item');
    expect(conversionResult.blocks[3].inlineStyleRanges).toEqual([]);
    expect(conversionResult.blocks[3].entityRanges).toEqual([]);

    expect(conversionResult.blocks[4].text).toEqual('Two');
    expect(conversionResult.blocks[4].type).toEqual('unordered-list-item');
    expect(conversionResult.blocks[4].inlineStyleRanges).toEqual([]);
    expect(conversionResult.blocks[4].entityRanges).toEqual([]);

    expect(conversionResult.blocks[5].text).toEqual('Three');
    expect(conversionResult.blocks[5].type).toEqual('unordered-list-item');
    expect(conversionResult.blocks[5].inlineStyleRanges).toEqual([]);
    expect(conversionResult.blocks[5].entityRanges).toEqual([]);

    expect(conversionResult.blocks[6].text).toEqual('A codeblock\n');
    expect(conversionResult.blocks[6].type).toEqual('code-block');
    expect(conversionResult.blocks[6].inlineStyleRanges).toEqual([]);
    expect(conversionResult.blocks[6].entityRanges).toEqual([]);

    expect(conversionResult.blocks[7].text).toEqual('And then... some monospace text?\nOr... italics?');
    expect(conversionResult.blocks[7].type).toEqual('unstyled');
    expect(conversionResult.blocks[7].inlineStyleRanges[0].offset).toEqual(12);
    expect(conversionResult.blocks[7].inlineStyleRanges[0].length).toEqual(19);
    expect(conversionResult.blocks[7].inlineStyleRanges[0].style).toEqual('CODE');
    expect(conversionResult.blocks[7].inlineStyleRanges[1].offset).toEqual(39);
    expect(conversionResult.blocks[7].inlineStyleRanges[1].length).toEqual(8);
    expect(conversionResult.blocks[7].inlineStyleRanges[1].style).toEqual('ITALIC');
    expect(conversionResult.blocks[7].entityRanges).toEqual([]);
  });
});