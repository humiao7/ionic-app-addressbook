/**
 * Created by gusenlin on 16/4/24.
 */
(function () {
  'use strict';
  angular
    .module('loginModule')
    .controller('phoneRecordCtrl', phoneRecordCtrl);

  phoneRecordCtrl.$inject = ['$scope', '$ionicHistory', '$window', '$timeout'];

  function phoneRecordCtrl($scope, $ionicHistory, $window, $timeout) {
    var phoneRecordVM = this;
    phoneRecordVM.search = '';

    //页面数据
    phoneRecordVM.data = [{contact: '中国移动', status: '呼入5分15秒', time: '下午3:00', phone_num: 10086},
      {contact: '中国联通', status: '呼出2分15秒', time: '下午4:00', phone_num: 10001},
      {contact: '中国电信', status: '未接通', time: '下午4:45', phone_num: 10000},
      {contact: '中国移不动', status: '呼入5分15秒', time: '下午3:00', phone_num: 10086},
      {contact: '中国联不通', status: '呼出2分15秒', time: '下午4:00', phone_num: 10001},
      {contact: '中国电信', status: '未接通', time: '下午4:45', phone_num: 10000},
      {contact: '123456', status: '呼入36分15秒', time: '11月4日 晚上9:57', phone_num: 123456}];

    //拨打电话
    $scope.callPhone = function (record) {
      $window.location.href = "tel:" + record.phone_num;
    };

    //删除通话记录
    $scope.deleteRecord=function(index){
      phoneRecordVM.data.splice(index,1);
    }

    //下拉刷新，两秒后自动收起来
    $scope.doRefresh = function () {
      $timeout(function () {
        $scope.$broadcast('scroll.refreshComplete');
      }, 2000);
    };

  }
})();
