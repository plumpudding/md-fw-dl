
/*  Copyright 2016 PetaByteBoy

    This file is part of the Material Design Firmware Downloader.

    The Material Design Firmware Downloader is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    The Material Design Firmware Downloader is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with the Material Design Firmware Downloader.  If not, see <http://www.gnu.org/licenses/>. */

angular.module('firmwareDownload', ['ngMaterial'])
  .controller('DownloadCtrl', function($scope, $location, $interpolate, $filter, $http) {

    $http.get('config.json').then(function(res) {
      $scope.config = res.data;
      var config = res.data;
      document.title = config.name + ' Firmware'

      $scope.parse = function (string) {
        try {
          return JSON.parse(string);
        } catch (error) {}
      };

      $scope.splitString = function (string, nb) {
         return string.substring(0,nb);
      };

      $scope.interpolate = function (value) {
        try {
          if (typeof(value) != undefined) {
            return $interpolate(value)($scope);
          }
        } catch (error) {}
      };

      $scope.selectionChanged = function () {
        var newURL = window.location.protocol + '//' + window.location.host + '/' + window.location.pathname;

        var args = []
        if($scope.selectedRouter)
          args.push('router=' + $scope.parse($scope.selectedRouter).id)
        if($scope.selectedManufacturer)
          args.push('manufacturer=' + $scope.parse($scope.selectedManufacturer).id)
        if($scope.selectedSite)
          args.push('region=' + $scope.selectedSite)
        if($scope.selectedMode != 'factory')
          args.push('mode=' + $scope.selectedMode)
        newURL += '?' + args.join('&')

        History.pushState(null, null, newURL);
      }

      //select factory by default
      $scope.selectedMode = 'factory';

      //read selection from url parameters
      if($location.search().mode != null) { $scope.selectedMode = $location.search().mode; }
      if($location.search().region != null) { $scope.selectedSite = $location.search().region; }
      if($location.search().manufacturer != null) { $scope.selectedManufacturer = $filter('json')(config.manufacturers[$location.search().manufacturer]); }
      if($location.search().router != null) { $scope.selectedRouter = $filter('json')(config.routers[$location.search().router]); }
    }, function(err) {console.log(err)});
  })
  //make parameters work without #! in the url
  .config(function($locationProvider) {
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
  });
