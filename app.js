
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
  .config(function($locationProvider) {
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
  })
  .controller('SelectCtrl', function($scope, $location){
    $scope.modes = [
      { id: "factory", name: "Neuinstallation der Freifunk Firmware" },
      { id: "sysupgrade", name: "Update der Freifunk Firmware" }
    ];
    $scope.selectedMode = "factory";
    $scope.regions = [
      { id: "bcd", name: "Burscheid" },
      { id: "bgl", name: "Bergisch Gladbach" },
      { id: "kut", name: "Kürten" },
      { id: "lln", name: "Leichlingen" },
      { id: "ode", name: "Odenthal" },
      { id: "ovr", name: "Overath" },
      { id: "rrh", name: "Rösrath" },
    ];
    $scope.routers = [
      { id: "buffalo-wzr-hp-ag300h-wzr-600dhp", name: "Buffalo WZR 600DHP" },
      { id: "buffalo-wzr-hp-g450h", name: "Buffalo WZR HP G450H" },
      { id: "d-link-dir-825-rev-b1", name: "D-Link 825" },
      { id: "linksys-wrt160nl", name: "Linksys WRT 160 NL" },
      { id: "tp-link-cpe210-v1.0", name: "TP-Link CPE210 Ver:1" },
      { id: "tp-link-cpe220-v1.0", name: "TP-Link CPE220 Ver:1" },
      { id: "tp-link-cpe510-v1.0", name: "TP-Link CPE510 Ver:1" },
      { id: "tp-link-cpe520-v1.0", name: "TP-Link CPE520 Ver:1" },
      { id: "tp-link-tl-mr3020-v1", name: "TP-Link TL MR 3020 Ver:1" },
      { id: "tp-link-tl-mr3040-v1", name: "TP-Link TL MR 3040 Ver:1" },
      { id: "tp-link-tl-mr3040-v2", name: "TP-Link TL MR 3040 Ver:2" },
      { id: "tp-link-tl-mr3220-v1", name: "TP-Link TL MR 3220 Ver:1" },
      { id: "tp-link-tl-mr3420-v1", name: "TP-Link TL MR 3420 Ver:1" },
      { id: "tp-link-tl-mr3420-v2", name: "TP-Link TL MR 3420 Ver:2" },
      { id: "tp-link-tl-wa750re-v1", name: "TP-Link TL WA 750RE Ver:1" },
      { id: "tp-link-tl-wa801n-nd-v2", name: "TP-Link TL WA 801 N/ND Ver:2" },
      { id: "tp-link-tl-wa850re-v1", name: "TP-Link TL WA 850RE Ver:1" },
      { id: "tp-link-tl-wa901n-nd-v2", name: "TP-Link TL WA 901 N/ND Ver:2" },
      { id: "tp-link-tl-wdr3500-v1", name: "TP-Link TL WDR 3500 Ver:1" },
      { id: "tp-link-tl-wdr3600-v1", name: "TP-Link TL WDR 3600 Ver:1" },
      { id: "tp-link-tl-wdr4300-v1", name: "TP-Link TL WDR 4300 Ver:1" },
      { id: "tp-link-tl-wr703n-v1", name: "TP-Link TL WR 703 N Ver:1" },
      { id: "tp-link-tl-wr710n-v1", name: "TP-Link TL WR 710 N Ver:1" },
      { id: "tp-link-tl-wr740n-nd-v1", name: "TP-Link TL WR 740 N/ND Ver:1" },
      { id: "tp-link-tl-wr740n-nd-v3", name: "TP-Link TL WR 740 N/ND Ver:3" },
      { id: "tp-link-tl-wr740n-nd-v4", name: "TP-Link TL WR 740 N/ND Ver:4" },
      { id: "tp-link-tl-wr741n-nd-v1", name: "TP-Link TL WR 741 N/ND Ver:1" },
      { id: "tp-link-tl-wr741n-nd-v2", name: "TP-Link TL WR 741 N/ND Ver:2" },
      { id: "tp-link-tl-wr741n-nd-v4", name: "TP-Link TL WR 741 N/ND Ver:4" },
      { id: "tp-link-tl-wr841n-nd-v3", name: "TP-Link TL WR 841 N/ND Ver:3" },
      { id: "tp-link-tl-wr841n-nd-v5", name: "TP-Link TL WR 841 N/ND Ver:5" },
      { id: "tp-link-tl-wr841n-nd-v7", name: "TP-Link TL WR 841 N/ND Ver:7" },
      { id: "tp-link-tl-wr841n-nd-v8", name: "TP-Link TL WR 841 N/ND Ver:8" },
      { id: "tp-link-tl-wr841n-nd-v9", name: "TP-Link TL WR 841 N/ND Ver:9" },
      { id: "tp-link-tl-wr842n-nd-v1", name: "TP-Link TL WR 842 N/ND Ver:1" },
      { id: "tp-link-tl-wr842n-nd-v2", name: "TP-Link TL WR 842 N/ND Ver:2" },
      { id: "tp-link-tl-wr941n-nd-v2", name: "TP-Link TL WR 941 N/ND Ver:2" },
      { id: "tp-link-tl-wr941n-nd-v3", name: "TP-Link TL WR 941 N/ND Ver:3" },
      { id: "tp-link-tl-wr941n-nd-v4", name: "TP-Link TL WR 941 N/ND Ver:4" },
      { id: "tp-link-tl-wr1043n-nd-v1", name: "TP-Link TL WR 1043 N/ND Ver:1" },
      { id: "tp-link-tl-wr1043n-nd-v2", name: "TP-Link TL WR 1043 N/ND Ver:2" },
      { id: "ubiquiti-bullet-m", name: "Ubiquiti Bullet M" },
      { id: "ubiquiti-nanostation-m", name: "Ubiquiti Nanostation M" },
      { id: "ubiquiti-unifi", name: "Ubiquiti UniFi" },
      { id: "ubiquiti-unifiap-outdoor", name: "Ubiquiti UniFi AP-Outdoor" }
    ];
    if($location.search().mode != null) { $scope.selectedMode = $location.search().mode; }
    if($location.search().region != null) { $scope.selectedRegion = $location.search().region; }
    if($location.search().router != null) { $scope.selectedRouter = $location.search().router; }
  });
