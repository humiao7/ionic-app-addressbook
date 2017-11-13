/**
 * Created by humiao on 17/11/04.
 */
(function () {
  'use strict';
  angular
    .module('contactModule')
    .controller('contactsCtrl', contactsCtrl);

  contactsCtrl.$inject = [];

  function contactsCtrl() {
    var contactsVM = this;
    // 对象----------
    contactsVM.search = ''; // 搜索参数
    // 页面数据
    contactsVM.pageData = [{name: '张三', phone_num: '1234566789'},
      {name: '李四', phone_num: '987654321'},
      {name: '中国移动', phone_num: '10086'},
      {name: '中国联通', phone_num: '10010'},
      {name: '中国电信', phone_num: '10000'}]
  }
})();
