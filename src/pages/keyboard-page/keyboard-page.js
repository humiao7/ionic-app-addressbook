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

  }
})();
