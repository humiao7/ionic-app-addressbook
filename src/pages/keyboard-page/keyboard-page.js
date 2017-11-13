/**
 * Created by humiao on 17/11/04.
 */
(function () {
  'use strict';
  angular
    .module('applicationModule')
    .controller('keyboardCtrl', keyboardCtrl);

  keyboardCtrl.$inject = ['$window', '$interval', '$ionicPopup'];

  function keyboardCtrl($window, $interval, $ionicPopup) {
    var keyboardVM = this;
    // 对象----------
    keyboardVM.pageData = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['*', '0', '#']];
    keyboardVM.callNumber = '';

    // 方法----------
    keyboardVM.backSpace = backSpace; //退格
    keyboardVM.clickButton = clickButton; //拨号键点击
    keyboardVM.callPhoneNumber = callPhoneNumber; //拨打电话

    function clickButton(num) {
      keyboardVM.callNumber = keyboardVM.callNumber + num;
    }

    function backSpace() {
      keyboardVM.callNumber = keyboardVM.callNumber.substring(0, keyboardVM.callNumber.length - 1);
    }

    function callPhoneNumber(phone_number) {
      $window.location.href = "tel:" + phone_number;
      // 统计通话时长
      var times = 0;
      keyboardVM.timer = '00:00:00';
      keyboardVM.onCalling = $interval(function () {
        times++;
        keyboardVM.timer = (parseInt(times / 3600) < 10 ? '0' + parseInt(times / 3600) : parseInt(times / 3600)) + ':' + (parseInt((times % 3600) / 60) < 10 ? '0' + parseInt((times % 3600) / 60) : parseInt((times % 3600) / 60)) + ':' + ((times % 3600) % 60 < 10 ? '0' + (times % 3600) % 60 : (times % 3600) % 60);
      }, 1000);// 表示每一秒执行一次
      var alertPopup = $ionicPopup.alert({
        title: '通话中',
        template: phone_number,
        okText: '挂断'
      });

      //结束通话
      alertPopup.then(function (res) {
        $interval.cancel(keyboardVM.onCalling);
        console.log('通话时间：' + keyboardVM.timer);
        var str_hours = parseInt(times / 3600) == 0 ? '' : (parseInt(times / 3600) + '时');
        var str_minis = parseInt((times % 3600) / 60) == 0 ? '' : (parseInt((times % 3600) / 60) + '分');
        var str_second = (times % 3600) % 60 == 0 ? '' : ((times % 3600) % 60 + '秒');
        var date_now = new Date();

        if (window.localStorage.phoneRecordData) {
          var temp = JSON.parse(window.localStorage.phoneRecordData || '{}');
        }
        temp.push({
          contact: phone_number,
          status: '呼出' + str_hours + str_minis + str_second,
          time: date_now.getFullYear() + '-' + (date_now.getMonth() + 1) + '-' + date_now.getDate(),
          phone_num: phone_number
        });
        window.localStorage.phoneRecordData = JSON.stringify(temp);
      });
    }
  }
})();
