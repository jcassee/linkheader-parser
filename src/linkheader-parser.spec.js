'use strict';

describe('linkHeaderParser', function () {

  it('parses a simple link', function () {
    expect(linkHeaderParser.parse('<http://example.com>; rel=example')).toEqual({
      example: {
        href: 'http://example.com'
      }
    });
  });

  it('parses a simple link with quoted relation', function () {
    expect(linkHeaderParser.parse('<http://example.com>; rel="example"')).toEqual({
      example: {
        href: 'http://example.com'
      }
    });
  });

  it('parses multiple links', function () {
    var header = '<http://example.com1>; rel="example1", <http://example.com2>; rel="example2"';
    expect(linkHeaderParser.parse(header)).toEqual({
      example1: {
        href: 'http://example.com1'
      },
      example2: {
        href: 'http://example.com2'
      }
    });
  });

  it('parses multiple links with the same relation type', function () {
    var header = '<http://example.com1>; rel="example", <http://example.com2>; rel="example"';
    expect(linkHeaderParser.parse(header)).toEqual({
      example: [{
        href: 'http://example.com1'
      }, {
        href: 'http://example.com2'
      }]
    });
  });

  it('parses a link with multiple relation types', function () {
    var header = '<http://example.com>; rel="example1 example2"';
    expect(linkHeaderParser.parse(header)).toEqual({
      example1: {
        href: 'http://example.com'
      },
      example2: {
        href: 'http://example.com'
      }
    });
  });

  it('parses a link with parameters', function () {
    var header = '<http://example.com>; rel="example"; title="Example title"; hreflang=en';
    expect(linkHeaderParser.parse(header)).toEqual({
      example: {
        href: 'http://example.com',
        title: 'Example title',
        hreflang: 'en'
      }
    });
  });

  it('parses a link with repeated parameters', function () {
    var header = '<http://example.com>; rel="example"; title="Example title"; hreflang=en; hreflang="de"';
    expect(linkHeaderParser.parse(header)).toEqual({
      example: {
        href: 'http://example.com',
        title: 'Example title',
        hreflang: ['en', 'de']
      }
    });
  });
});
