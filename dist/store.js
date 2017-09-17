'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var resourceList = ['Post', 'Comment', 'Author'];

var Store = function () {
  function Store(resources) {
    var _this = this;

    _classCallCheck(this, Store);

    this.resourceNames = [];
    resources.map(function (resource) {
      _this[resource] = [];
      _this.resourceNames.push(resource);
    });
  }

  _createClass(Store, [{
    key: 'list',
    value: function list(resource) {
      return this[resource];
    }
  }, {
    key: 'get',
    value: function get(resource, obj) {
      return this[resource].find(function (item) {
        return item.rid === obj.rid;
      });
    }
  }, {
    key: 'add',
    value: function add(resource, obj) {
      obj.rid = Math.random().toString(36).substr(2, 16);
      this[resource].push(obj);
      return obj;
    }
  }, {
    key: 'update',
    value: function update(resource, obj) {
      var item = this.get(resource, obj);
      Object.keys(obj).map(function (attribute) {
        item[attribute] = obj[attribute];
      });
      return item;
    }
  }, {
    key: 'remove',
    value: function remove(resource, obj) {
      var list = this[resource];
      var indexList = list.map(function (item) {
        return item.rid;
      });
      var index = indexList.indexOf(obj.rid);
      list.splice(index, 1);
    }
  }, {
    key: 'resources',
    value: function resources() {
      var _this2 = this;

      return this.resourceNames.map(function (name) {
        resourceObj = {};
        resourceObj[name] = _this2[name];
        return resourceObj;
      });
    }
  }]);

  return Store;
}();
