/**
 * Created by gusenlin on 16/4/24.
 */
(function () {
  'use strict';
  angular
    .module('loginModule')
    .controller('keyboardCtrl', keyboardCtrl);

  keyboardCtrl.$inject = ['$window', '$interval'];

  function keyboardCtrl($window, $interval) {
    var keyboardVM = this;
    keyboardVM.pageData = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['*', '0', '#']];
    keyboardVM.callNumber = '';
    keyboardVM.onCalling = false;

    // 方法
    keyboardVM.backSpace = backSpace; //退格
    keyboardVM.clickButton = clickButton; //拨号键点击
    keyboardVM.callPhoneNumber = callPhoneNumber; //拨打电话

    keyboardVM.breakPhone = breakPhone; //挂掉电话

    function clickButton(num) {
      keyboardVM.callNumber = keyboardVM.callNumber + num;
    }

    function backSpace() {
      keyboardVM.callNumber = keyboardVM.callNumber.substring(0, keyboardVM.callNumber.length - 1);
    }

    function callPhoneNumber(phone_number) {
      $window.location.href = "tel:" + phone_number;
      var times = 0;
      keyboardVM.onCalling = true;
      keyboardVM.timer = '00:00:00';
      var test = $interval(function () {
        times++;
        keyboardVM.timer = (parseInt(times / 3600) < 10 ? '0' + parseInt(times / 3600) : parseInt(times / 3600)) + ':' + (parseInt((times % 3600) / 60) < 10 ? '0' + parseInt((times % 3600) / 60) : parseInt((times % 3600) / 60)) + ':' + ((times % 3600) % 60 < 10 ? '0' + (times % 3600) % 60 : (times % 3600) % 60);
      }, 1000);// 表示每一秒执行一次，执行三次
    }

    function breakPhone() {
      console.log('挂断电话');
      $interval.cancel('test');
    }

  }
})();
