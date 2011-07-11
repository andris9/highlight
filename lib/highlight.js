/* node-highlight is based on highlight.js (see vendor/highlight.js)       */
/* usage: html = require("highlight").Highlight(code_string);              */
/* NB! You also need to include a CSS file from vendor/highlight.js/styles */

// load syntax highlighter
var hljs = require("./vendor/highlight.js/highlight").hljs;

// load langs
require("./vendor/highlight.js/languages/xml")(hljs);
require("./vendor/highlight.js/languages/1c")(hljs);
require("./vendor/highlight.js/languages/apache")(hljs);
require("./vendor/highlight.js/languages/avrasm")(hljs);
require("./vendor/highlight.js/languages/axapta")(hljs);
require("./vendor/highlight.js/languages/bash")(hljs);
require("./vendor/highlight.js/languages/cmake")(hljs);
require("./vendor/highlight.js/languages/cpp")(hljs);
require("./vendor/highlight.js/languages/cs")(hljs);
require("./vendor/highlight.js/languages/css")(hljs);
require("./vendor/highlight.js/languages/delphi")(hljs);
require("./vendor/highlight.js/languages/diff")(hljs);
require("./vendor/highlight.js/languages/django")(hljs);
require("./vendor/highlight.js/languages/dos")(hljs);
require("./vendor/highlight.js/languages/erlang-repl")(hljs);
require("./vendor/highlight.js/languages/erlang")(hljs);
require("./vendor/highlight.js/languages/go")(hljs);
require("./vendor/highlight.js/languages/haskell")(hljs);
require("./vendor/highlight.js/languages/ini")(hljs);
require("./vendor/highlight.js/languages/java")(hljs);
require("./vendor/highlight.js/languages/javascript")(hljs);
require("./vendor/highlight.js/languages/lisp")(hljs);
require("./vendor/highlight.js/languages/lua")(hljs);
require("./vendor/highlight.js/languages/mel")(hljs);
require("./vendor/highlight.js/languages/nginx")(hljs);
require("./vendor/highlight.js/languages/objectivec")(hljs);
require("./vendor/highlight.js/languages/parser3")(hljs);
require("./vendor/highlight.js/languages/perl")(hljs);
require("./vendor/highlight.js/languages/php")(hljs);
require("./vendor/highlight.js/languages/profile")(hljs);
require("./vendor/highlight.js/languages/python")(hljs);
require("./vendor/highlight.js/languages/renderman")(hljs);
require("./vendor/highlight.js/languages/ruby")(hljs);
require("./vendor/highlight.js/languages/scala")(hljs);
require("./vendor/highlight.js/languages/smalltalk")(hljs);
require("./vendor/highlight.js/languages/sql")(hljs);
require("./vendor/highlight.js/languages/tex")(hljs);
require("./vendor/highlight.js/languages/vala")(hljs);
require("./vendor/highlight.js/languages/vbscript")(hljs);
require("./vendor/highlight.js/languages/vhdl")(hljs);



/**
 * highlight(text, tabReplace, useCodeBlocks) -> HTML
 * - text (String): text to be highlighted
 * - tabReplace (String): defaults to 4 spaces if none, replaces \t chars
 * - useCodeBlocks (Boolean): If TRUE use only text between <code> and </code>
 *
 * Highlights program code inside a string by setting appropriate CSS class
 * elements.
 **/
this.Highlight = function(text, tabReplace, useCodeBlocks){
    tabReplace = tabReplace || '    ';
    if(!!useCodeBlocks){
        // JS regexpes have some multiline issues, so we temporarily remove them
        return text.replace(/\n/g,'\uffff').replace(/<code>(.*?)<\/code>/gm, function(original, source){
            return '<code>'+hljs.highlightText(source.replace(/\uffff/g,"\n"), tabReplace)+'</code>';
        }).replace(/&amp;(\w+;)/g,'&$1').replace(/\uffff/g,"\n");
    }else
        return hljs.highlightText(text, tabReplace);
}