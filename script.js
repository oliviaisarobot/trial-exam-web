'use strict';

var renderAll = function() {
  var submitButton = document.querySelector('#submit');
  var previousQueries = document.querySelector('ul');
  var resultBox = document.querySelector('#result');
  var resultText = document.querySelector('.result-text');
  var ajax = new Ajax();
  var listPrevious = [];

  function newEntry(e) {
    var li = document.createElement('li');
    li.innerHTML = e;
    previousQueries.appendChild(li);
  };

  function validateTextInput(input) {
    var allowed = /[a-zA-Z]/;
    if (input === "") {
      alert("The text input field can't be empty!");
    } else if (allowed.test(input)) {
      return true;
    } else {
      alert("Only letters and spaces are allowed in the text field!")
    }
  };

  function validateShiftInput(input) {
    var allowed = /[0-9]/;
    if (input === "") {
      alert("Shift value can't be empty!");
    } else if (Math.abs(input) < 0 || Math.abs(input) > "25") {
      alert("Shift is out of bound!");
    } else if (allowed.test(input)) {
      return true;
    } else {
      alert("Only number are allowed in the shift field!")
    }
  }

  function loadResult() {
    var shift = document.querySelector('#shift');
    var text = document.querySelector('#text');

    if (validateTextInput(text.value) && validateShiftInput(shift.value)) {
      resultBox.className = "show";
      resultText.innerHTML = "LOADING";
      var input = {"shift": shift.value, "text": text.value};

      ajax.postText(input, function() {
        newEntry(input.text);
      });

      ajax.getResult(function(res){
        resultText.innerHTML = res.text;
      });
    }
  };

  return {
    init: function() {
      submitButton.addEventListener('click', loadResult);

      window.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) {
          loadResult();
        }
      })

      ajax.getAllDecoded(function(res){
        listPrevious = res.all;
        listPrevious.forEach(function(e) {
          newEntry(e);
        });
      });
    }
  };
}();
