'use strict';

var caesar = {
  cipher: function(shift, text) {
    var plain = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split('');
    var input = text.toLowerCase().split('');
    var rule = parseInt(shift);
    var decoded = '';

    input.forEach(function(e) {
      if (e === ' ') {
        decoded += ' ';
      } else {
        var index = plain.indexOf(e) + rule;
        if (index > 25) {
          index = index % 26;
        } else if (index < 0) {
          index = 26 + index;
        };
        var letter = plain[index];
        decoded += letter;
      }
    });

    return decoded;
  }
};

module.exports = caesar

// caesar.cipher("3", "qeb nrfzh yoltk clu grjmp lsbo qeb ixwv ald");
// console.log(caesar.cipher("3", "qeb nrfzh yoltk clu grjmp lsbo qeb ixwv ald"));
// caesar.cipher("-3", "the quick brown fox jumps over the lazy dog");
