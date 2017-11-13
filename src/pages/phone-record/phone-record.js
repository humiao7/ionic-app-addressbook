/**
 * Created by humiao on 17/11/04.
 */
(function () {
  'use strict';
  angular
    .module('applicationModule')
    .controller('phoneRecordCtrl', phoneRecordCtrl);

  phoneRecordCtrl.$inject = ['$scope', '$window', '$interval', '$ionicPopup'];

  function phoneRecordCtrl($scope, $window, $interval, $ionicPopup) {
    var phoneRecordVM = this;
    // 对象----------
    phoneRecordVM.search = ''; // 搜索参数
    //从缓存中读取页面数据,如果没有初始数据则给定初始数据
    if (window.localStorage.phoneRecordData) {
      phoneRecordVM.data = JSON.parse(window.localStorage.phoneRecordData || '{}');
    }
    else {
      window.localStorage.phoneRecordData = JSON.stringify(
        [{contact: '中国移动', status: '呼入5分15秒', time: '下午3:00', phone_num: 10086},
          {contact: '中国联通', status: '呼出2分15秒', time: '下午4:00', phone_num: 10001},
          {contact: '中国电信', status: '未接通', time: '下午4:45', phone_num: 10000}]);
    }

    // 方法-----------
    phoneRecordVM.callPhone = callPhone;   // 拨打电话
    phoneRecordVM.deleteRecord = deleteRecord;   // 删除通话记录
    phoneRecordVM.doRefresh = doRefresh;  //下拉刷新

    function callPhone(record) {
      $window.location.href = "tel:" + record.phone_num;
      // 统计通话时长
      var times = 0;
      var timer = '00:00:00';
      var onCalling = $interval(function () {
        times++;
        timer = (parseInt(times / 3600) < 10 ? '0' + parseInt(times / 3600) : parseInt(times / 3600)) + ':' + (parseInt((times % 3600) / 60) < 10 ? '0' + parseInt((times % 3600) / 60) : parseInt((times % 3600) / 60)) + ':' + ((times % 3600) % 60 < 10 ? '0' + (times % 3600) % 60 : (times % 3600) % 60);
      }, 1000);// 表示每一秒执行一次
      var alertPopup = $ionicPopup.alert({
        title: '通话中',
        template: record.phone_num,
        okText: '挂断'
      });

      //结束通话
      alertPopup.then(function (res) {
        $interval.cancel(onCalling);
        console.log('通话时间：' + timer);
        var str_hours = parseInt(times / 3600) == 0 ? '' : (parseInt(times / 3600) + '时');
        var str_minis = parseInt((times % 3600) / 60) == 0 ? '' : (parseInt((times % 3600) / 60) + '分');
        var str_second = (times % 3600) % 60 == 0 ? '' : ((times % 3600) % 60 + '秒');
        var date_now = new Date();

        if (window.localStorage.phoneRecordData) {
          var temp = JSON.parse(window.localStorage.phoneRecordData || '{}');
        }
        temp.push({
          contact: record.contact,
          status: '呼出' + str_hours + str_minis + str_second,
          time: date_now.getFullYear() + '-' + (date_now.getMonth() + 1) + '-' + date_now.getDate(),
          phone_num: record.phone_num
        });
        window.localStorage.phoneRecordData = JSON.stringify(temp);
      });
    }

    function deleteRecord(index) {
      phoneRecordVM.data.splice(index, 1);
      window.localStorage.phoneRecordData = JSON.stringify(phoneRecordVM.data);
    }

    function doRefresh() {
      if (window.localStorage.phoneRecordData) {
        phoneRecordVM.data = JSON.parse(window.localStorage.phoneRecordData || '{}');
      }
      $scope.$broadcast('scroll.refreshComplete');
    }

  }
})();
