/**
 * Created by gusenlin on 16/4/24.
 */
(function () {
  'use strict';
  angular
    .module('loginModule')
    .controller('contactsCtrl', contactsCtrl);

  contactsCtrl.$inject = [];

  function contactsCtrl() {
    var contactsVM = this;
    contactsVM.search = '';

    contactsVM.pageData = [{name: '张三', phone_num: '1234566789'},
      {name: '李四', phone_num: '987654321'},
      {name: '中国移动', phone_num: '10086'},
      {name: '中国联通', phone_num: '10010'},
      {name: '中国电信', phone_num: '10000'}]
  }
})();
