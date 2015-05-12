


var modes = [
  { id: "factory", name: "Neuinstallation der Freifunk Firmware" },
  { id: "sysupgrade", name: "Update der Freifunk Firmware" }
];

var sites = [
  { id: "bcd", name: "Burscheid" },
  { id: "bgl", name: "Bergisch Gladbach" },
  { id: "kut", name: "Kürten" },
  { id: "lln", name: "Leichlingen" },
  { id: "ode", name: "Odenthal" },
  { id: "ovr", name: "Overath" },
  { id: "rrh", name: "Rösrath" },
];

//router list for gluon v2014.04
var manufacturers = [
  "Buffalo",
  "D-Link",
  "Linksys",
  "TP-Link",
  "Ubiquiti"
];

var routers = [
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
