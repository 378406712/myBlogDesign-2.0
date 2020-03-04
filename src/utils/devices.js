export default {
  getOsInfo() {
    let userAgent = window.navigator.userAgent.toLowerCase()
    let version = ''
    if (userAgent.indexOf("win") > -1) {
      if (userAgent.indexOf("windows nt 5.0") > -1 || userAgent.indexOf("Windows 2000") > -1) {
        version = "Windows 2000";
      } else if (userAgent.indexOf("windows nt 5.1") > -1 || userAgent.indexOf("Windows XP") > -1) {
        version = "Windows XP";
      } else if (userAgent.indexOf("windows nt 5.2") > -1 || userAgent.indexOf("Windows 2003") > -1) {
        version = "Windows 2003";
      } else if (userAgent.indexOf("windows nt 6.0") > -1 || userAgent.indexOf("Windows Vista") > -1) {
        version = "Windows Vista";
      } else if (userAgent.indexOf("windows nt 6.1") > -1 || userAgent.indexOf("windows 7") > -1) {
        version = "Windows 7";
      } else if (userAgent.indexOf("windows nt 6.2") > -1 || userAgent.indexOf("windows 8") > -1) {
        version = "Windows 8";
      } else if (userAgent.indexOf("windows nt 6.3") > -1) {
        version = "Windows 8.1";
      } else if (userAgent.indexOf("windows nt 6.4") > -1 || userAgent.indexOf("windows nt 10") > -1) {
        version = "Windows 10";
      } else {
        version = "Unknown";
      }
    } else if (userAgent.indexOf("iphone") > -1) {
      version = "Iphone";
    } else if (userAgent.indexOf("mac") > -1) {
      version = "Mac";
    } else if (userAgent.indexOf("x11") > -1 || userAgent.indexOf("unix") > -1 || userAgent.indexOf("sunname") > -1 || userAgent.indexOf("bsd") > -1) {
      version = "Unix";
    } else if (userAgent.indexOf("linux") > -1) {
      if (userAgent.indexOf("android") > -1) {
        version = "Android"
      } else {
        version = "Linux";
      }
    } else {
      version = "Unknown";
    }
    return version;
  },
  getDigits: function () { //判断当前操作系统的版本号 
    var sUserAgent = navigator.userAgent.toLowerCase();
    var is64 = sUserAgent.indexOf("win64") > -1 || sUserAgent.indexOf("wow64") > -1;
    if (is64) {
      return "64位";
    } else {
      return "32位";
    }
  },
  getBrowser: function () { // 获取浏览器名
    var rMsie = /(msie\s|trident\/7)([\w\.]+)/;
    var rTrident = /(trident)\/([\w.]+)/;
    var rEdge = /(edge)\/([\w.]+)/; //IE

    var rFirefox = /(firefox)\/([\w.]+)/; //火狐
    var rOpera = /(opera).+version\/([\w.]+)/; //旧Opera
    var rNewOpera = /(opr)\/(.+)/; //新Opera 基于谷歌
    var rChrome = /(chrome)\/([\w.]+)/; //谷歌 
    var rUC = /(ubrowser)\/([\w.]+)/; //UC
    var rMaxthon = /(maxthon)\/([\w.]+)/; //遨游
    var r2345 = /(2345explorer)\/([\w.]+)/; //2345
    var rQQ = /(qqbrowser)\/([\w.]+)/; //QQ
    //var rMetasr =  /(metasr)\/([\w.]+)/;//搜狗
    var rSafari = /version\/([\w.]+).*(safari)/;

    var ua = navigator.userAgent.toLowerCase();

    var matchBS, matchBS2;

    //IE 低版
    matchBS = rMsie.exec(ua);
    if (matchBS != null) {
      matchBS2 = rTrident.exec(ua);
      if (matchBS2 != null) {
        switch (matchBS2[2]) {
          case "4.0":
            return {
              browser:
                "Microsoft IE",
                version: "IE: 8" //内核版本号
            };
            break;
          case "5.0":
            return {
              browser:
                "Microsoft IE",
                version: "IE: 9"
            };
            break;
          case "6.0":
            return {
              browser:
                "Microsoft IE",
                version: "IE: 10"
            };
            break;
          case "7.0":
            return {
              browser:
                "Microsoft IE",
                version: "IE: 11"
            };
            break;
          default:
            return {
              browser:
                "Microsoft IE",
                version: "Undefined"
            };
        }
      } else {
        return {
          browser: "Microsoft IE",
          version: "IE:" + matchBS[2] || "0"
        };
      }
    }
    //IE最新版
    matchBS = rEdge.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
      return {
        browser: "Microsoft Edge",
        version: "Edge/" + matchBS[2] || "0"
      };
    }
    //UC浏览器					  
    matchBS = rUC.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
      return {
        browser: "UC",
        version: "ubrowser/" + matchBS[2] || "0"
      };
    }
    //火狐浏览器
    matchBS = rFirefox.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
      return {
        browser: "火狐",
        version: "Firefox/" + matchBS[2] || "0"
      };
    }
    //Oper浏览器					 
    matchBS = rOpera.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
      return {
        browser: "Opera",
        version: "Opera/" + matchBS[2] || "0"
      };
    }
    //遨游
    matchBS = rMaxthon.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
      return {
        browser: "遨游",
        version: "Maxthon/" + matchBS[2] || "0"
      };
    }
    //2345浏览器					  
    matchBS = r2345.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
      return {
        browser: "2345",
        version: "2345explorer/ " + matchBS[2] || "0"
      };
    }
    //QQ浏览器					  
    matchBS = rQQ.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
      return {
        browser: "QQ",
        version: "qqbrowser/" + matchBS[2] || "0"
      };
    }
    //Safari（苹果）浏览器
    matchBS = rSafari.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
      return {
        browser: "Safari",
        version: "Safari(win版)/" + matchBS[1] || "0"
      };
    }
    //谷歌浏览器
    matchBS = rChrome.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
      matchBS2 = rNewOpera.exec(ua);
      if (matchBS2 == null) {
        return {
          browser: "谷歌",
          version: "Chrome/" + matchBS[2] || "0"
        };
      } else {
        return {
          browser: "Opera",
          version: "opr/" + matchBS2[2] || "0"
        };
      }
    }
  }


}
