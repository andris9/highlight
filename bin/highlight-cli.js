#!/usr/bin/env node
(function () {
  "use strict";

  var fs = require('fs')
    , highlight = require('highlight').Highlight
    //, highlight = require('../lib/highlight').Highlight
    , filename = process.argv[2]
    ;

  function printUsage() {
    console.warn("Usages:");
    console.warn("highlight site/docs/index.html > highlighted.html");
    console.warn("cat site/docs/index.html | highlight > highlighted.html");
  }

  function handleInput(err, text) {
    var hlBlock
      ;

    if (err) {
      printUsage();
      return;
    }

    // todo test if error is file read or 
    // convert only inside <code/> with two spaces
    hlBlock = highlight(text, '  ', true);
    console.log(hlBlock);
  }

  readInput(handleInput, filename);

  //
  // this could (and probably should) be its own module
  //
  function readInput(cb, filename) {

    function readFile() {
      fs.readFile(filename, 'utf8', function (err, text) {
        if (err) {
          console.error("[ERROR] couldn't read from '" + filename + "':");
          console.error(e.message);
          return;
        }

        cb(err, text);
      });
    }

    function readStdin() {
      var text
        , timeoutToken
        , stdin = process.stdin
        ;
      
      stdin.resume();

      // how to tell piping vs waiting for user input?
      timeoutToken = setTimeout(function () {
        cb(new Error('no stdin data'));
        stdin.pause();
      }, 1000);

      stdin.on('data', function (chunk) {
        clearTimeout(timeoutToken);
        text += chunk;
      });
      
      stdin.on('end', function () {
        cb(null, text);
      });
    }

    if (filename) {
      readFile();
    }
    else {
      readStdin();
    }

  }

}());
