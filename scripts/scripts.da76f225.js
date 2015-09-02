"use strict";angular.module("minionatorNgApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/:class/:type",{templateUrl:"views/type.html",controller:"TypeCtrl",controllerAs:"type"}).when("/:class/:type/:instance",{templateUrl:"views/instance.html",controller:"InstanceCtrl",controllerAs:"instance"}).otherwise({redirectTo:"/"})}]),angular.module("minionatorNgApp").controller("MainCtrl",["$scope","SlaveHealth",function(a,b){b.summary({},function(b){a.summary=b})}]),angular.module("minionatorNgApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("minionatorNgApp").factory("SlaveHealth",["$resource",function(a){var b="https://secure.pub.build.mozilla.org/builddata/reports/slave_health/json";return a(b,{classtype:"@_classtype"},{headers:{Accept:"application/json"},classtype:{url:b+"/:classtype.json",isArray:!1},query:{url:b+"/all_slaves.json",isArray:!1},summary:{url:b+"/slave_state_rollup.json",isArray:!1}})}]),angular.module("minionatorNgApp").controller("TypeCtrl",["$scope","$routeParams","SlaveHealth",function(a,b,c){a["class"]=b["class"],a.slavetype=b.type,c.classtype({classtype:b["class"]+"-"+b.type},function(b){a.data=b})}]),angular.module("minionatorNgApp").controller("InstanceCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("minionatorNgApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/instance.html","<p>This is the instance view.</p>"),a.put("views/main.html",'<div class="row"> <div ng-repeat="(class, stats) in summary" ng-show="class !== \'metadata\'" class="col-md-4"> <h2>{{class}}</h2> <ul class="list-unstyled"> <li ng-repeat="(type, counts) in stats"> <div class="panel panel-default"> <div class="panel-heading"> <a class="panel-title" ng-href="#/{{class}}/{{type}}"> <i class="fa" ng-class="{\n'+"                'fa-windows': (type.indexOf('-2008-') > 0 || type.indexOf('-w') > 0 || type.indexOf('-xp') > 0),\n                'fa-linux': (type.indexOf('-linux') > 0),\n                'fa-apple': (type.indexOf('-lion-') > 0 || type.indexOf('-snow-') > 0 || type.indexOf('-yosemite-') > 0),\n                'fa-android': (type.indexOf('-emulator') > 0 || type === 'panda')}\"></i> <strong>{{type}}</strong> </a> <button type=\"button\" class=\"btn btn-xs btn-default pull-right\" ng-click=\"counts.show = !counts.show\"> <i class=\"fa\" ng-class=\"{'fa-expand': !counts.show, 'fa-compress': counts.show}\"></i> </button> <span ng-repeat=\"(name, count) in counts track by $index\" title=\"{{name}}\" ng-show=\"count && (name !== 'show')\" style=\"margin-right: 4px\" class=\"label pull-right\" ng-class=\"{\n              'label-success': (name === 'working'),\n              'label-warning': (name === 'idle'),\n              'label-info': (name === 'disabled'),\n              'label-danger': (name === 'broken'),\n              'label-default': (['broken', 'disabled', 'working'].indexOf() < 0)}\"> <i class=\"fa\" ng-class=\"{\n                'fa-eraser': (name === 'decommissioned'),\n                'fa-cogs': (name === 'working'),\n                'fa-chain-broken': (name === 'not_in_slavealloc'),\n                'fa-wrench': (name === 'staging'),\n                'fa-stop': (name === 'disabled'),\n                'fa-clock-o': (name === 'idle'),\n                'fa-frown-o': (name === 'broken')}\"></i> <span class=\"\">{{count}}</span> </span> </div> <div class=\"panel-body\" ng-show=\"counts.show\"> Panel content </div> <!--\n          <div class=\"panel-footer\" ng-show=\"counts.show\">\n          </div>\n          --> </div> </li> </ul> </div> </div> <div class=\"row text-right\"> <p> <i class=\"fa fa-camera\"></i> {{summary.metadata.generated | date:'yyyy-MM-dd HH:mm:ss Z'}} snapshot &nbsp; </p> </div>"),a.put("views/type.html",'<div class=""> <h1> {{class}} / <i class="fa" ng-class="{\n'+"      'fa-windows': (slavetype.indexOf('-2008-') > 0 || slavetype.indexOf('-w') > 0 || slavetype.indexOf('-xp') > 0),\n      'fa-linux': (slavetype.indexOf('-linux') > 0),\n      'fa-apple': (slavetype.indexOf('-lion-') > 0 || slavetype.indexOf('-snow-') > 0 || slavetype.indexOf('-yosemite-') > 0),\n      'fa-android': (slavetype.indexOf('-emulator') > 0 || slavetype === 'panda')}\"></i> {{slavetype}} </h1> <div ng-repeat=\"state in ['working', 'idle', 'broken', 'disabled', 'staging', 'decommissioned', 'not_in_slavealloc']\" class=\"clearfix\"> <h2> <i class=\"fa\" ng-class=\"{\n        'fa-eraser': (state === 'decommissioned'),\n        'fa-cogs': (state === 'working'),\n        'fa-chain-broken': (state === 'not_in_slavealloc'),\n        'fa-wrench': (state === 'staging'),\n        'fa-stop': (state === 'disabled'),\n        'fa-clock-o': (state === 'idle'),\n        'fa-frown-o': (state === 'broken')}\"></i> {{state}} </h2> <div ng-repeat=\"(hostname, stats) in data\" ng-show=\"stats.slave_state === state\" class=\"col-md-3\"> <div class=\"panel\" ng-class=\"{\n        'panel-default': (state === 'decommissioned'),\n        'panel-success': (state === 'working'),\n        'panel-default': (state === 'not_in_slavealloc'),\n        'panel-default': (state === 'staging'),\n        'panel-info': (state === 'disabled'),\n        'panel-warning': (state === 'idle'),\n        'panel-danger': (state === 'broken')}\"> <div class=\"panel-heading\"> <a class=\"panel-title\" ng-href=\"#/{{class}}/{{slavetype}}/{{hostname}}\"> <strong>{{hostname}}</strong> </a> <button type=\"button\" class=\"btn btn-xs btn-default pull-right\" ng-click=\"stats.show = !stats.show\"> <i class=\"fa\" ng-class=\"{'fa-expand': !stats.show, 'fa-compress': stats.show}\"></i> </button> <!--\n          <span ng-repeat=\"(name, count) in counts track by $index\" title=\"{{name}}\" ng-show=\"count && (name !== 'show')\" style=\"margin-right: 4px;\" class=\"label pull-right\" ng-class=\"{\n            'label-success': (name === 'working'),\n            'label-warning': (name === 'disabled'),\n            'label-danger': (name === 'broken'),\n            'label-default': (['broken', 'disabled', 'working'].indexOf() < 0)}\">\n            \n            <span class=\"\">{{count}}</span>\n          </span>\n        --> </div> <div class=\"panel-body\" ng-show=\"stats.show\"> <div ng-show=\"stats.elapsed_on_job\"> elapsed: {{stats.elapsed_on_job}} </div> <div ng-show=\"stats.elapsed_since_job\"> time since last job: {{stats.elapsed_since_job}} </div> <div ng-show=\"stats.starttime\"> start time: {{stats.starttime}} </div> <div ng-show=\"stats.master.indexOf('http://None') < 0\" ng-bind-html=\"stats.master\"> </div> <div ng-show=\"stats.notes\"> {{stats.notes}} </div> </div> <!--\n        <div class=\"panel-footer\" ng-show=\"counts.show\">\n        </div>\n        --> </div> </div> </div> </div> <!--\n<pre>{{data | json}}</pre>\n-->")}]);