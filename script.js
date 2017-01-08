'use strict';

var renderAll = function() {
  var submitButton = document.querySelector('#submit');
  var previousQueries = document.querySelector('ul');
  var resultBox = document.querySelector('#result');
  var resultText = document.querySelector('.result-text');
  var ajax = new Ajax();
  var listPrevious = [];

  // function runDecode() {
  //   ajax.decodeText(function(res){
  //     var response = res;
  //     newEntry(response.text);
  //   });
  // };

  function newEntry(e) {
    var li = document.createElement('li');
    li.innerHTML = e;
    previousQueries.appendChild(li);
  };

  return {
    init: function() {
      submitButton.addEventListener('click', function() {
        var shift = document.querySelector('#shift');
        var text = document.querySelector('#text');

        var input = {"shift": shift.value, "text": text.value};
        ajax.postText(input, function() {
          newEntry(input.text);
        });

        ajax.getResult(function(res){
          resultText.innerHTML = res.text;
          resultBox.className = "show";
        });

        // runDecode();
      });

      ajax.getAllDecoded(function(res){
        listPrevious = res.all;
        listPrevious.forEach(function(e) {
          newEntry(e);
        });
      });
    }
  };
}();
