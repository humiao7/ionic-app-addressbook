/**
 * Created by gusenlin on 2017/1/22.
 */
(function () {
  'use strict';
  angular
    .module('messageModule')
    .controller('tabCtrl', tabCtrl);

  tabCtrl.$inject = [
    '$scope',
    '$stateParams',
    '$state',
    '$http',
    '$ionicHistory',
    '$timeout'];

  function tabCtrl($scope,
                   $stateParams,
                   $state,
                   $http,
                   $ionicHistory,
                   $timeout) {
    var vm = this;

    $timeout(function () {
      window.localStorage.needGuid = "true"
      window.localStorage.userToken = ""
    }, 2000)

    vm.tabArray = [
      {
        "isActive": true,
        "name": "键盘拨号",
        "onIcon": "hms-tab-keyboard-on",
        "offIcon": "hms-tab-keyboard-off"
      },
      {
        "isActive": false,
        "name": "通话记录",
        "onIcon": "hms-tab-phonerecord-on",
        "offIcon": "hms-tab-phonerecord-off"
      },
      {
        "isActive": false,
        "name": "通讯录",
        "onIcon": "hms-tab-contacts-on",
        "offIcon": "hms-tab-contacts-off"
      }
    ];

    vm.clickTab = clickTab;

    function clickTab(tab) {
      angular.forEach(vm.tabArray, function (data) {
        data.isActive = false;
      });

      tab.isActive = true;
    }
  }
})();
