/**
 * Created by humiao on 17/11/04.
 */
(function () {
  'use strict';
  angular
    .module('applicationModule')
    .controller('phoneRecordCtrl', phoneRecordCtrl);

  phoneRecordCtrl.$inject = ['$scope', '$window', '$timeout'];

  function phoneRecordCtrl($scope, $window, $timeout) {
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
    phoneRecordVM.doRefresh = doRefresh;  //下拉刷新，两秒后自动收起来

    function callPhone(record) {
      $window.location.href = "tel:" + record.phone_num;
    }

    function deleteRecord(index) {
      phoneRecordVM.data.splice(index, 1);
    }

    function doRefresh() {
      if (window.localStorage.phoneRecordData) {
        phoneRecordVM.data = JSON.parse(window.localStorage.phoneRecordData || '{}');
      }
      $scope.$broadcast('scroll.refreshComplete');
      /*$timeout(function () {
       $scope.$broadcast('scroll.refreshComplete');
       }, 2000);*/
    }

  }
})();
