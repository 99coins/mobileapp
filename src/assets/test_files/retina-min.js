!function(){function t(){}function e(t){this.path=t,this.at_2x_path=t.replace(/\.\w+$/,function(t){return"@2x"+t})}function i(t){this.el=t,this.path=new e(this.el.getAttribute("src"));var i=this;this.path.check_2x_variant(function(t){t&&i.swap()})}var a="undefined"==typeof exports?window:exports,n={check_mime_type:!0};a.Retina=t,t.configure=function(t){null==t&&(t={});for(var e in t)n[e]=t[e]},t.init=function(t){null==t&&(t=a);var e=t.onload||new Function;t.onload=function(){var t=document.getElementsByTagName("img"),a=[],n,s;for(n=0;n<t.length;n++)s=t[n],a.push(new i(s));e()}},t.isRetina=function(){var t="(-webkit-min-device-pixel-ratio: 1.5),                      (min--moz-device-pixel-ratio: 1.5),                      (-o-min-device-pixel-ratio: 3/2),                      (min-resolution: 1.5dppx)";return a.devicePixelRatio>1||!(!a.matchMedia||!a.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),                      (min--moz-device-pixel-ratio: 1.5),                      (-o-min-device-pixel-ratio: 3/2),                      (min-resolution: 1.5dppx)").matches)},a.RetinaImagePath=e;var s,o,r;if(localStorage){if(localStorage.retinajs_confirmed_paths)try{e.confirmed_paths=JSON.parse(localStorage.retinajs_confirmed_paths)}catch(t){e.confirmed_paths={}}else e.confirmed_paths={};if(localStorage.retinajs_skip_paths)try{e.skip_paths=JSON.parse(localStorage.retinajs_skip_paths)}catch(t){e.skip_paths={}}else e.skip_paths={};s=!1,o=function t(){s||(s=!0,setTimeout(r,10))},r=function t(){if(localStorage)try{localStorage.retinajs_confirmed_paths=JSON.stringify(e.confirmed_paths),localStorage.retinajs_skip_paths=JSON.stringify(e.skip_paths)}catch(t){o=r=function(){}}s=!1}}else e.confirmed_paths={},e.skip_paths={},o=r=function(){};e.prototype.is_external=function(){return!(!this.path.match(/^https?\:/i)||this.path.match("//"+document.domain))},e.prototype.check_2x_variant=function(t){var i,a=this;return this.is_external()?t(!1):e.skip_paths[this.at_2x_path]?t(!1):e.confirmed_paths[this.at_2x_path]?t(!0):(i=new XMLHttpRequest,i.open("HEAD",this.at_2x_path),i.onreadystatechange=function(){if(4!=i.readyState)return t(!1);if(i.status>=200&&i.status<=399){if(n.check_mime_type){var s=i.getResponseHeader("Content-Type");if(null==s||!s.match(/^image/i))return e.skip_paths[a.at_2x_path]=1,o(),t(!1)}return e.confirmed_paths[a.at_2x_path]=1,o(),t(!0)}return e.skip_paths[a.at_2x_path]=1,o(),t(!1)},i.send(),void 0)},a.RetinaImage=i,i.prototype.swap=function(t){function e(){i.el.complete?(i.el.setAttribute("width",i.el.offsetWidth),i.el.setAttribute("height",i.el.offsetHeight),i.el.setAttribute("src",t)):setTimeout(e,5)}void 0===t&&(t=this.path.at_2x_path);var i=this;e()},t.isRetina()&&t.init(a)}();