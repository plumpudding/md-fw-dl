
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

angular.module('firmwareDownload', ['ngMaterial'])
  .controller('DownloadCtrl', function($scope, $location){

    /*-----------------------------------*/
    /* domain-specific configuration     */
    /* TODO: add branches, versions, etc */
    /* TODO: move to a seperate file     */
    /*-----------------------------------*/

    $scope.modes = [
      { id: "factory", name: "Neuinstallation der Freifunk Firmware" },
      { id: "sysupgrade", name: "Update der Freifunk Firmware" }
    ];

    //needed for community-specific firmwares
    $scope.sites = [
      { id: "bcd", name: "Burscheid" },
      { id: "bgl", name: "Bergisch Gladbach" },
      { id: "kut", name: "Kürten" },
      { id: "lln", name: "Leichlingen" },
      { id: "ode", name: "Odenthal" },
      { id: "ovr", name: "Overath" },
      { id: "rrh", name: "Rösrath" },
    ];

    //router list for gluon v2014.04
    $scope.manus = [
      "Buffalo",
      "D-Link",
      "Linksys",
      "TP-Link",
      "Ubiquiti"
    ];

    $scope.routers = [
      { id: "wzr-hp-ag300h-wzr-600dhp", name: "WZR 600DHP", manu: "Buffalo" },
      { id: "wzr-hp-g450h", name: "WZR HP G450H", manu: "Buffalo" },
      { id: "dir-825-rev-b1", name: "825", manu: "D-Link" },
      { id: "wrt160nl", name: "WRT 160 NL", manu: "Linksys" },
      { id: "cpe210-v1.0", name: "CPE210 Ver:1", manu: "TP-Link" },
      { id: "cpe220-v1.0", name: "CPE220 Ver:1", manu: "TP-Link" },
      { id: "cpe510-v1.0", name: "CPE510 Ver:1", manu: "TP-Link" },
      { id: "cpe520-v1.0", name: "CPE520 Ver:1", manu: "TP-Link" },
      { id: "tl-mr3020-v1", name: "TL MR 3020 Ver:1", manu: "TP-Link" },
      { id: "tl-mr3040-v1", name: "TL MR 3040 Ver:1", manu: "TP-Link" },
      { id: "tl-mr3040-v2", name: "TL MR 3040 Ver:2", manu: "TP-Link" },
      { id: "tl-mr3220-v1", name: "TL MR 3220 Ver:1", manu: "TP-Link" },
      { id: "tl-mr3420-v1", name: "TL MR 3420 Ver:1", manu: "TP-Link" },
      { id: "tl-mr3420-v2", name: "TL MR 3420 Ver:2", manu: "TP-Link" },
      { id: "tl-wa750re-v1", name: "TL WA 750RE Ver:1", manu: "TP-Link" },
      { id: "tl-wa801n-nd-v2", name: "TL WA 801 N/ND Ver:2", manu: "TP-Link" },
      { id: "tl-wa850re-v1", name: "TL WA 850RE Ver:1", manu: "TP-Link" },
      { id: "tl-wa901n-nd-v2", name: "TL WA 901 N/ND Ver:2", manu: "TP-Link" },
      { id: "tl-wdr3500-v1", name: "TL WDR 3500 Ver:1", manu: "TP-Link" },
      { id: "tl-wdr3600-v1", name: "TL WDR 3600 Ver:1", manu: "TP-Link" },
      { id: "tl-wdr4300-v1", name: "TL WDR 4300 Ver:1", manu: "TP-Link" },
      { id: "tl-wr703n-v1", name: "TL WR 703 N Ver:1", manu: "TP-Link" },
      { id: "tl-wr710n-v1", name: "TL WR 710 N Ver:1", manu: "TP-Link" },
      { id: "tl-wr740n-nd-v1", name: "TL WR 740 N/ND Ver:1", manu: "TP-Link" },
      { id: "tl-wr740n-nd-v3", name: "TL WR 740 N/ND Ver:3", manu: "TP-Link" },
      { id: "tl-wr740n-nd-v4", name: "TL WR 740 N/ND Ver:4", manu: "TP-Link" },
      { id: "tl-wr741n-nd-v1", name: "TL WR 741 N/ND Ver:1", manu: "TP-Link" },
      { id: "tl-wr741n-nd-v2", name: "TL WR 741 N/ND Ver:2", manu: "TP-Link" },
      { id: "tl-wr741n-nd-v4", name: "TL WR 741 N/ND Ver:4", manu: "TP-Link" },
      { id: "tl-wr841n-nd-v3", name: "TL WR 841 N/ND Ver:3", manu: "TP-Link" },
      { id: "tl-wr841n-nd-v5", name: "TL WR 841 N/ND Ver:5", manu: "TP-Link" },
      { id: "tl-wr841n-nd-v7", name: "TL WR 841 N/ND Ver:7", manu: "TP-Link" },
      { id: "tl-wr841n-nd-v8", name: "TL WR 841 N/ND Ver:8", manu: "TP-Link" },
      { id: "tl-wr841n-nd-v9", name: "TL WR 841 N/ND Ver:9", manu: "TP-Link" },
      { id: "tl-wr842n-nd-v1", name: "TL WR 842 N/ND Ver:1", manu: "TP-Link" },
      { id: "tl-wr842n-nd-v2", name: "TL WR 842 N/ND Ver:2", manu: "TP-Link" },
      { id: "tl-wr941n-nd-v2", name: "TL WR 941 N/ND Ver:2", manu: "TP-Link" },
      { id: "tl-wr941n-nd-v3", name: "TL WR 941 N/ND Ver:3", manu: "TP-Link" },
      { id: "tl-wr941n-nd-v4", name: "TL WR 941 N/ND Ver:4", manu: "TP-Link" },
      { id: "tl-wr1043n-nd-v1", name: "TL WR 1043 N/ND Ver:1", manu: "TP-Link" },
      { id: "tl-wr1043n-nd-v2", name: "TL WR 1043 N/ND Ver:2", manu: "TP-Link" },
      { id: "bullet-m", name: "Bullet M", manu: "Ubiquiti" },
      { id: "nanostation-m", name: "Nanostation M", manu: "Ubiquiti" },
      { id: "unifi", name: "UniFi", manu: "Ubiquiti" },
      { id: "unifiap-outdoor", name: "UniFi AP-Outdoor", manu: "Ubiquiti" }
    ];

    /*---------------*/
    /* semantic code */
    /*---------------*/

    //select factory by default
    $scope.selectedMode = "factory"; 

    //read selection from url parameters
    if($location.search().mode != null) { $scope.selectedMode = $location.search().mode; }
    if($location.search().site != null) { $scope.selectedSite = $location.search().site; }
    if($location.search().router != null) { $scope.selectedRouter = $location.search().router; }

  })
  //make parameters work without #! in the url
  .config(function($locationProvider) {
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
  });
