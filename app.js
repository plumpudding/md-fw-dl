
/*  Copyright 2015 PetaByteBoy

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

var mapTools = {
    getColor : function(){
        var color = this.bcolors.shift();
        this.bcolors.push(color);
        return color;
    },
    getStyle : function(dom){
        return {
            fillColor: dom.color,
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    },
    getStyleClicked : function(dom){
        return {
            fillColor: this.shadeColor(dom.color,-0.25),
            weight: 2,
            opacity: 1,
            color: '#333',
            dashArray: '0',
            fillOpacity: 0.7
        };
    },
    shadeColor : function(hex, lum) {

        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00"+c).substr(c.length);
        }

        return rgb;
    },
    prepare : function(sites){
        for (var dom in sites){
            this.settings[dom] = {
                'id' : sites[dom].id,
                'name' : sites[dom].name,
                'color' : this.getColor(),
                'geojson' : 'shapes/'+sites[dom].id+'.geojson',
                'active' : false
            };
        }
    },
    buildLegend : function(){
        var legend = {
            position : 'bottomleft',
            colors : [],
            labels : []
        };
        for (dom in this.settings){
            legend.colors.push(this.settings[dom].color);
            legend.labels.push(this.settings[dom].name);
        }
        return legend;
    },
    settings : {},
    bcolors : ['#2980B9', '#8E44AD', '#C83D2F', '#EC5E00', '#F1C40F', '#27AE60', '#34495E']
}

angular.module('firmwareDownload', ['ngMaterial', 'leaflet-directive'])
  .controller('DownloadCtrl', function($scope, $location, $interpolate, $filter, $http, leafletData){
    mapTools.prepare(config.sites);
    $scope.config = config;
    leafletData.getGeoJSON().then(function(lObjs){
        window.leafletDataGeoJSON = lObjs;
    });

    angular.extend($scope, {
        muenster: {
            lat: 52.05,
            lng: 7.2,
            zoom: 9,
            //autoDiscover: true
        },
        defaults: {
            scrollWheelZoom: false
        },
        legend : mapTools.buildLegend(),
        geojson : {}
    });
    var settings = {};
    
    angular.forEach(mapTools.settings, function(dom){
        $http.get(dom.geojson).success(function(data, status) {
            settings[dom.id] = {
                data: data,
                resetStyleOnMouseout: false,
                style: mapTools.getStyle(dom)
            };
            //dirty hack, cause $q..then() won't play with me
            if (Object.keys(mapTools.settings).length == Object.keys(settings).length){
                angular.extend($scope.geojson, settings);
            }
        });
    });
    $scope.$on("leafletDirectiveGeoJson.dommap.mouseover", function(ev, leafletPayload) {
        var target = leafletPayload.leafletEvent.target;
        var layer = leafletPayload.leafletEvent.target;
        layer.setStyle({
            weight: 2,
            color: '#777',
            dashArray: '0',
            fillColor: mapTools.shadeColor(target.options.style.fillColor, 0.25)
        });
        layer.bringToFront();
    });

    $scope.$on("leafletDirectiveGeoJson.dommap.mouseout", function(ev, leafletPayload) {
        var target = leafletPayload.leafletEvent.target;
        var layer = leafletPayload.leafletEvent.target;
        var activeLayer = angular.fromJson($scope.selectedSite);
        if (activeLayer && leafletPayload.layerName == activeLayer.id){
            layer.setStyle(mapTools.getStyleClicked(mapTools.settings[leafletPayload.layerName]));
        }else{
            layer.setStyle(mapTools.getStyle(mapTools.settings[leafletPayload.layerName]));
        }
    });

    //TODO: better way for "external" updating layer style
    $scope.$watch("selectedSite", function(newValue, oldValue) {
            var oldID = angular.fromJson(oldValue);
            var newID = angular.fromJson(newValue);
            leafletData.getGeoJSON().then(function(lObjs){
                if (oldID){
                    var obj = {};
                    for (layer in lObjs[oldID.id]._layers){
                        obj = lObjs[oldID.id]._layers[layer];
                        break;
                    }
                    obj.setStyle(mapTools.getStyle(mapTools.settings[oldID.id]));
                }
                if (newID){
                    var obj = {};
                    for (layer in lObjs[newID.id]._layers){
                        obj = lObjs[newID.id]._layers[layer];
                        break;
                    }
                    obj.setStyle(mapTools.getStyleClicked(mapTools.settings[newID.id]));
                    obj.bringToFront();
                    
                }
            });
    });

    $scope.$on("leafletDirectiveGeoJson.dommap.click", function(ev, leafletPayload) {
        $scope.selectedSite = $filter('json')(config.sites[leafletPayload.layerName]);
    });

    
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

    $scope.buildFirmwareUrl = function() {
        var url = $scope.interpolate(config.url);
        var manufacturer = angular.fromJson($scope.selectedManufacturer);
        if (manufacturer == null) {
            return url;
        }

        if (manufacturer.name == config.manufacturers['6netgear'].name && $scope.selectedMode == 'factory') {
            url += '.img';
        } else if (manufacturer.name == config.manufacturers['7x86'].name) {
            url += '';
        } else {
            url += '.bin';
        }

      return url;
    };
    //select factory by default
    $scope.selectedMode = "factory";

    //read selection from url parameters
    if($location.search().mode != null) { $scope.selectedMode = $location.search().mode; }
    if($location.search().region != null) { $scope.selectedSite = $filter('json')(config.sites[$location.search().region]); }
    if($location.search().manufacturer != null) { $scope.selectedManufacturer = $filter('json')(config.manufacturers[$location.search().manufacturer]); }
    if($location.search().router != null) { $scope.selectedRouter = $filter('json')(config.routers[$location.search().router]); }


  })
  //make parameters work without #! in the url
  .config(function($locationProvider) {
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
  });

