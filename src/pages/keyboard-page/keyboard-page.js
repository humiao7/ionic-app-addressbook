/**
 * Created by gusenlin on 16/4/24.
 */
(function () {
  'use strict';
  angular
    .module('loginModule')
    .controller('keyboardCtrl', keyboardCtrl);

  keyboardCtrl.$inject = [];

  function keyboardCtrl() {
    var keyboardVM = this;

    keyboardVM.pageData = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['*', '0', '#']];

    keyboardVM.callNumber = '';

    keyboardVM.clickButton = clickButton;
    function clickButton(num) {
      keyboardVM.callNumber = keyboardVM.callNumber + num;
    }

    keyboardVM.backSpace = backSpace;
    function backSpace() {
      keyboardVM.callNumber = keyboardVM.callNumber.substring(0, keyboardVM.callNumber.length-1);
    }

  }
})();
