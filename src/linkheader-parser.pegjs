/*
 * PEG.js grammar for parsing a HTTP response Link header.
 *
 * See RFC 5988: http://tools.ietf.org/html/rfc5988
 */

{
  function parse_links(links) {
    var result = {};
    links.forEach(function (link) {
      var params = link.params;
      var rels = params.rel;

      delete params.rel;
      params.href = link.href;

      if (!rels) return;                        // Ignore links without a relation
      if (Array.isArray(rels)) rels = rels[0];  // Use only first "rel" param
      rels = rels.split(' ');                   // Param may contain multiple values

      rels.forEach(function (rel) {
        addValue(result, rel, params);
      });
    });
    return result;
  }

  function parse_params(params) {
    var result = {};
    params.forEach(function (param) {
      addValue(result, param[0], param[1]);
    });
    return result;
  }

  function addValue(object, key, value) {
    if (key in object) {
      if (!Array.isArray(object[key])) object[key] = [object[key]];
      object[key].push(value);
    } else {
      object[key] = value;
    }
  }
}

start
= head:link tail:next_link* { return parse_links([head].concat(tail)); }

next_link
= _ ',' _ link:link { return link; }

link
= href:href params:param_part* { return {href: href, params: parse_params(params)}; }

href
= '<' uri:[^>]* '>' { return uri.join(''); }

param_part
= _ ';' _ param:param { return param; }

param
= key:param_key value:param_value? { return [key, value]; }

param_key
= key:[A-Za-z0-9!#$&.^_`|~+-]+ { return key.join(''); }

param_value
= _ '=' _ string:string { return string; }

string
= ptoken / quoted_string

ptoken
= string:[A-Za-z0-9!#$%&'()*./:<>=?@^_`{}|~+-]+ { return string.join(''); }

quoted_string
= '"' string:([^"\\] / qchar )* '"' { return string.join(''); }

qchar
= '\\' char:. { return char; }

_ = [ \t\r\n]*
