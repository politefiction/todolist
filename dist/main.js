!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=164)}([function(e,t,n){var r=n(13),o=36e5,a=6e4,u=2,i=/[T ]/,s=/:/,c=/^(\d{2})$/,f=[/^([+-]\d{2})$/,/^([+-]\d{3})$/,/^([+-]\d{4})$/],l=/^(\d{4})/,d=[/^([+-]\d{4})/,/^([+-]\d{5})/,/^([+-]\d{6})/],p=/^-(\d{2})$/,v=/^-?(\d{3})$/,g=/^-?(\d{2})-?(\d{2})$/,m=/^-?W(\d{2})$/,h=/^-?W(\d{2})-?(\d{1})$/,x=/^(\d{2}([.,]\d*)?)$/,y=/^(\d{2}):?(\d{2}([.,]\d*)?)$/,D=/^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,M=/([Z+-].*)$/,b=/^(Z)$/,T=/^([+-])(\d{2})$/,S=/^([+-])(\d{2}):?(\d{2})$/;function w(e,t,n){t=t||0,n=n||0;var r=new Date(0);r.setUTCFullYear(e,0,4);var o=7*t+n+1-(r.getUTCDay()||7);return r.setUTCDate(r.getUTCDate()+o),r}e.exports=function(e,t){if(r(e))return new Date(e.getTime());if("string"!=typeof e)return new Date(e);var n=(t||{}).additionalDigits;n=null==n?u:Number(n);var Y=function(e){var t,n={},r=e.split(i);if(s.test(r[0])?(n.date=null,t=r[0]):(n.date=r[0],t=r[1]),t){var o=M.exec(t);o?(n.time=t.replace(o[1],""),n.timezone=o[1]):n.time=t}return n}(e),O=function(e,t){var n,r=f[t],o=d[t];if(n=l.exec(e)||o.exec(e)){var a=n[1];return{year:parseInt(a,10),restDateString:e.slice(a.length)}}if(n=c.exec(e)||r.exec(e)){var u=n[1];return{year:100*parseInt(u,10),restDateString:e.slice(u.length)}}return{year:null}}(Y.date,n),I=O.year,F=function(e,t){if(null===t)return null;var n,r,o,a;if(0===e.length)return(r=new Date(0)).setUTCFullYear(t),r;if(n=p.exec(e))return r=new Date(0),o=parseInt(n[1],10)-1,r.setUTCFullYear(t,o),r;if(n=v.exec(e)){r=new Date(0);var u=parseInt(n[1],10);return r.setUTCFullYear(t,0,u),r}if(n=g.exec(e)){r=new Date(0),o=parseInt(n[1],10)-1;var i=parseInt(n[2],10);return r.setUTCFullYear(t,o,i),r}if(n=m.exec(e))return a=parseInt(n[1],10)-1,w(t,a);if(n=h.exec(e)){a=parseInt(n[1],10)-1;var s=parseInt(n[2],10)-1;return w(t,a,s)}return null}(O.restDateString,I);if(F){var k,H=F.getTime(),N=0;return Y.time&&(N=function(e){var t,n,r;if(t=x.exec(e))return(n=parseFloat(t[1].replace(",",".")))%24*o;if(t=y.exec(e))return n=parseInt(t[1],10),r=parseFloat(t[2].replace(",",".")),n%24*o+r*a;if(t=D.exec(e)){n=parseInt(t[1],10),r=parseInt(t[2],10);var u=parseFloat(t[3].replace(",","."));return n%24*o+r*a+1e3*u}return null}(Y.time)),Y.timezone?(W=Y.timezone,k=(j=b.exec(W))?0:(j=T.exec(W))?(C=60*parseInt(j[2],10),"+"===j[1]?-C:C):(j=S.exec(W))?(C=60*parseInt(j[2],10)+parseInt(j[3],10),"+"===j[1]?-C:C):0):(k=new Date(H+N).getTimezoneOffset(),k=new Date(H+N+k*a).getTimezoneOffset()),new Date(H+N+k*a)}var W,j,C;return new Date(e)}},function(e,t,n){e.exports={addDays:n(5),addHours:n(23),addISOYears:n(24),addMilliseconds:n(6),addMinutes:n(26),addMonths:n(11),addQuarters:n(27),addSeconds:n(28),addWeeks:n(15),addYears:n(29),areRangesOverlapping:n(63),closestIndexTo:n(64),closestTo:n(65),compareAsc:n(8),compareDesc:n(16),differenceInCalendarDays:n(10),differenceInCalendarISOWeeks:n(66),differenceInCalendarISOYears:n(30),differenceInCalendarMonths:n(31),differenceInCalendarQuarters:n(67),differenceInCalendarWeeks:n(68),differenceInCalendarYears:n(33),differenceInDays:n(34),differenceInHours:n(69),differenceInISOYears:n(70),differenceInMilliseconds:n(12),differenceInMinutes:n(71),differenceInMonths:n(17),differenceInQuarters:n(72),differenceInSeconds:n(18),differenceInWeeks:n(73),differenceInYears:n(74),distanceInWords:n(36),distanceInWordsStrict:n(78),distanceInWordsToNow:n(79),eachDay:n(80),endOfDay:n(20),endOfHour:n(81),endOfISOWeek:n(82),endOfISOYear:n(83),endOfMinute:n(84),endOfMonth:n(38),endOfQuarter:n(85),endOfSecond:n(86),endOfToday:n(87),endOfTomorrow:n(88),endOfWeek:n(37),endOfYear:n(89),endOfYesterday:n(90),format:n(91),getDate:n(92),getDay:n(93),getDayOfYear:n(39),getDaysInMonth:n(14),getDaysInYear:n(94),getHours:n(95),getISODay:n(43),getISOWeek:n(21),getISOWeeksInYear:n(96),getISOYear:n(2),getMilliseconds:n(97),getMinutes:n(98),getMonth:n(99),getOverlappingDaysInRanges:n(100),getQuarter:n(32),getSeconds:n(101),getTime:n(102),getYear:n(103),isAfter:n(104),isBefore:n(105),isDate:n(13),isEqual:n(106),isFirstDayOfMonth:n(107),isFriday:n(108),isFuture:n(109),isLastDayOfMonth:n(110),isLeapYear:n(42),isMonday:n(111),isPast:n(112),isSameDay:n(113),isSameHour:n(44),isSameISOWeek:n(46),isSameISOYear:n(47),isSameMinute:n(48),isSameMonth:n(50),isSameQuarter:n(51),isSameSecond:n(53),isSameWeek:n(22),isSameYear:n(55),isSaturday:n(114),isSunday:n(115),isThisHour:n(116),isThisISOWeek:n(117),isThisISOYear:n(118),isThisMinute:n(119),isThisMonth:n(120),isThisQuarter:n(121),isThisSecond:n(122),isThisWeek:n(123),isThisYear:n(124),isThursday:n(125),isToday:n(126),isTomorrow:n(127),isTuesday:n(128),isValid:n(41),isWednesday:n(129),isWeekend:n(130),isWithinRange:n(131),isYesterday:n(132),lastDayOfISOWeek:n(133),lastDayOfISOYear:n(134),lastDayOfMonth:n(135),lastDayOfQuarter:n(136),lastDayOfWeek:n(56),lastDayOfYear:n(137),max:n(138),min:n(139),parse:n(0),setDate:n(140),setDay:n(141),setDayOfYear:n(142),setHours:n(143),setISODay:n(144),setISOWeek:n(145),setISOYear:n(25),setMilliseconds:n(146),setMinutes:n(147),setMonth:n(57),setQuarter:n(148),setSeconds:n(149),setYear:n(150),startOfDay:n(4),startOfHour:n(45),startOfISOWeek:n(3),startOfISOYear:n(7),startOfMinute:n(49),startOfMonth:n(151),startOfQuarter:n(52),startOfSecond:n(54),startOfToday:n(152),startOfTomorrow:n(153),startOfWeek:n(9),startOfYear:n(40),startOfYesterday:n(154),subDays:n(155),subHours:n(156),subISOYears:n(35),subMilliseconds:n(157),subMinutes:n(158),subMonths:n(159),subQuarters:n(160),subSeconds:n(161),subWeeks:n(162),subYears:n(163)}},function(e,t,n){var r=n(0),o=n(3);e.exports=function(e){var t=r(e),n=t.getFullYear(),a=new Date(0);a.setFullYear(n+1,0,4),a.setHours(0,0,0,0);var u=o(a),i=new Date(0);i.setFullYear(n,0,4),i.setHours(0,0,0,0);var s=o(i);return t.getTime()>=u.getTime()?n+1:t.getTime()>=s.getTime()?n:n-1}},function(e,t,n){var r=n(9);e.exports=function(e){return r(e,{weekStartsOn:1})}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setHours(0,0,0,0),t}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setDate(n.getDate()+o),n}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e).getTime(),o=Number(t);return new Date(n+o)}},function(e,t,n){var r=n(2),o=n(3);e.exports=function(e){var t=r(e),n=new Date(0);return n.setFullYear(t,0,4),n.setHours(0,0,0,0),o(n)}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e).getTime(),o=r(t).getTime();return n<o?-1:n>o?1:0}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=t&&Number(t.weekStartsOn)||0,o=r(e),a=o.getDay(),u=(a<n?7:0)+a-n;return o.setDate(o.getDate()-u),o.setHours(0,0,0,0),o}},function(e,t,n){var r=n(4),o=6e4,a=864e5;e.exports=function(e,t){var n=r(e),u=r(t),i=n.getTime()-n.getTimezoneOffset()*o,s=u.getTime()-u.getTimezoneOffset()*o;return Math.round((i-s)/a)}},function(e,t,n){var r=n(0),o=n(14);e.exports=function(e,t){var n=r(e),a=Number(t),u=n.getMonth()+a,i=new Date(0);i.setFullYear(n.getFullYear(),u,1),i.setHours(0,0,0,0);var s=o(i);return n.setMonth(u,Math.min(s,n.getDate())),n}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()-o.getTime()}},function(e,t){e.exports=function(e){return e instanceof Date}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getFullYear(),o=t.getMonth(),a=new Date(0);return a.setFullYear(n,o+1,0),a.setHours(0,0,0,0),a.getDate()}},function(e,t,n){var r=n(5);e.exports=function(e,t){var n=Number(t);return r(e,7*n)}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e).getTime(),o=r(t).getTime();return n>o?-1:n<o?1:0}},function(e,t,n){var r=n(0),o=n(31),a=n(8);e.exports=function(e,t){var n=r(e),u=r(t),i=a(n,u),s=Math.abs(o(n,u));return n.setMonth(n.getMonth()-i*s),i*(s-(a(n,u)===-i))}},function(e,t,n){var r=n(12);e.exports=function(e,t){var n=r(e,t)/1e3;return n>0?Math.floor(n):Math.ceil(n)}},function(e,t,n){var r=n(75),o=n(76);e.exports={distanceInWords:r(),format:o()}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setHours(23,59,59,999),t}},function(e,t,n){var r=n(0),o=n(3),a=n(7),u=6048e5;e.exports=function(e){var t=r(e),n=o(t).getTime()-a(t).getTime();return Math.round(n/u)+1}},function(e,t,n){var r=n(9);e.exports=function(e,t,n){var o=r(e,n),a=r(t,n);return o.getTime()===a.getTime()}},function(e,t,n){var r=n(6),o=36e5;e.exports=function(e,t){var n=Number(t);return r(e,n*o)}},function(e,t,n){var r=n(2),o=n(25);e.exports=function(e,t){var n=Number(t);return o(e,r(e)+n)}},function(e,t,n){var r=n(0),o=n(7),a=n(10);e.exports=function(e,t){var n=r(e),u=Number(t),i=a(n,o(n)),s=new Date(0);return s.setFullYear(u,0,4),s.setHours(0,0,0,0),(n=o(s)).setDate(n.getDate()+i),n}},function(e,t,n){var r=n(6),o=6e4;e.exports=function(e,t){var n=Number(t);return r(e,n*o)}},function(e,t,n){var r=n(11);e.exports=function(e,t){var n=Number(t);return r(e,3*n)}},function(e,t,n){var r=n(6);e.exports=function(e,t){var n=Number(t);return r(e,1e3*n)}},function(e,t,n){var r=n(11);e.exports=function(e,t){var n=Number(t);return r(e,12*n)}},function(e,t,n){var r=n(2);e.exports=function(e,t){return r(e)-r(t)}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return 12*(n.getFullYear()-o.getFullYear())+(n.getMonth()-o.getMonth())}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return Math.floor(t.getMonth()/3)+1}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return n.getFullYear()-o.getFullYear()}},function(e,t,n){var r=n(0),o=n(10),a=n(8);e.exports=function(e,t){var n=r(e),u=r(t),i=a(n,u),s=Math.abs(o(n,u));return n.setDate(n.getDate()-i*s),i*(s-(a(n,u)===-i))}},function(e,t,n){var r=n(24);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(16),o=n(0),a=n(18),u=n(17),i=n(19),s=1440,c=2520,f=43200,l=86400;e.exports=function(e,t,n){var d=n||{},p=r(e,t),v=d.locale,g=i.distanceInWords.localize;v&&v.distanceInWords&&v.distanceInWords.localize&&(g=v.distanceInWords.localize);var m,h,x={addSuffix:Boolean(d.addSuffix),comparison:p};p>0?(m=o(e),h=o(t)):(m=o(t),h=o(e));var y,D=a(h,m),M=h.getTimezoneOffset()-m.getTimezoneOffset(),b=Math.round(D/60)-M;if(b<2)return d.includeSeconds?D<5?g("lessThanXSeconds",5,x):D<10?g("lessThanXSeconds",10,x):D<20?g("lessThanXSeconds",20,x):D<40?g("halfAMinute",null,x):g(D<60?"lessThanXMinutes":"xMinutes",1,x):0===b?g("lessThanXMinutes",1,x):g("xMinutes",b,x);if(b<45)return g("xMinutes",b,x);if(b<90)return g("aboutXHours",1,x);if(b<s)return g("aboutXHours",Math.round(b/60),x);if(b<c)return g("xDays",1,x);if(b<f)return g("xDays",Math.round(b/s),x);if(b<l)return g("aboutXMonths",y=Math.round(b/f),x);if((y=u(h,m))<12)return g("xMonths",Math.round(b/f),x);var T=y%12,S=Math.floor(y/12);return T<3?g("aboutXYears",S,x):T<9?g("overXYears",S,x):g("almostXYears",S+1,x)}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=t&&Number(t.weekStartsOn)||0,o=r(e),a=o.getDay(),u=6+(a<n?-7:0)-(a-n);return o.setDate(o.getDate()+u),o.setHours(23,59,59,999),o}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getMonth();return t.setFullYear(t.getFullYear(),n+1,0),t.setHours(23,59,59,999),t}},function(e,t,n){var r=n(0),o=n(40),a=n(10);e.exports=function(e){var t=r(e);return a(t,o(t))+1}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=new Date(0);return n.setFullYear(t.getFullYear(),0,1),n.setHours(0,0,0,0),n}},function(e,t,n){var r=n(13);e.exports=function(e){if(r(e))return!isNaN(e);throw new TypeError(toString.call(e)+" is not an instance of Date")}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e).getFullYear();return t%400==0||t%4==0&&t%100!=0}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e).getDay();return 0===t&&(t=7),t}},function(e,t,n){var r=n(45);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()===o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setMinutes(0,0,0),t}},function(e,t,n){var r=n(22);e.exports=function(e,t){return r(e,t,{weekStartsOn:1})}},function(e,t,n){var r=n(7);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()===o.getTime()}},function(e,t,n){var r=n(49);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()===o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setSeconds(0,0),t}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return n.getFullYear()===o.getFullYear()&&n.getMonth()===o.getMonth()}},function(e,t,n){var r=n(52);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()===o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getMonth(),o=n-n%3;return t.setMonth(o,1),t.setHours(0,0,0,0),t}},function(e,t,n){var r=n(54);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()===o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setMilliseconds(0),t}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return n.getFullYear()===o.getFullYear()}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=t&&Number(t.weekStartsOn)||0,o=r(e),a=o.getDay(),u=6+(a<n?-7:0)-(a-n);return o.setHours(0,0,0,0),o.setDate(o.getDate()+u),o}},function(e,t,n){var r=n(0),o=n(14);e.exports=function(e,t){var n=r(e),a=Number(t),u=n.getFullYear(),i=n.getDate(),s=new Date(0);s.setFullYear(u,a,15),s.setHours(0,0,0,0);var c=o(s);return n.setMonth(a,Math.min(i,c)),n}},function(e,t,n){var r=n(59);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(61)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(60)(!1)).push([e.i,"#header {\n  display: block;\n  border: 2px solid blue;\n  width: auto;\n  padding: 5px; }\n\n#sidebar {\n  position: relative;\n  float: left;\n  margin-top: 10px;\n  border: 2px solid red;\n  width: 200px;\n  height: 70vh;\n  padding: 1%; }\n  #sidebar p {\n    display: block; }\n\n#sidebar-list {\n  display: block;\n  border: 1px solid purple;\n  padding: 0 5px 5px 5px;\n  margin-bottom: 20px; }\n\n#tasks-today li {\n  font-size: 14px; }\n\nform {\n  display: none;\n  position: fixed;\n  z-index: 9;\n  background: white;\n  padding: 5px;\n  border: 3px solid darkolivegreen; }\n\nform input, select {\n  margin: 5px; }\n\n#calendar-box {\n  display: block;\n  border: 1px solid orange;\n  width: 175px;\n  height: 175px;\n  margin-left: 20px auto 10px auto; }\n\n#container {\n  float: left;\n  border: 2px solid green;\n  width: 70vw;\n  height: 70vh;\n  margin: 10px;\n  padding-left: 5px; }\n\n#calendar {\n  display: block;\n  border: 1px solid teal;\n  width: 70vw; }\n\n#cal-heading {\n  text-align: center; }\n\n#weekdays {\n  display: inline-flex; }\n  #weekdays div {\n    display: inline-block;\n    border: 1px solid black;\n    height: 20px;\n    width: 93px;\n    text-align: center; }\n\n.calendar-day {\n  display: inline-flex;\n  width: 93px;\n  height: 100px;\n  border: 1px solid black; }\n",""])},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(u=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(u))))+" */"),a=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(a).concat([o]).join("\n")}var u;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(r[a]=!0)}for(o=0;o<e.length;o++){var u=e[o];"number"==typeof u[0]&&r[u[0]]||(n&&!u[2]?u[2]=n:n&&(u[2]="("+u[2]+") and ("+n+")"),t.push(u))}},t}},function(e,t,n){var r,o,a={},u=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),i=function(e){var t={};return function(e,n){if("function"==typeof e)return e();if(void 0===t[e]){var r=function(e,t){return t?t.querySelector(e):document.querySelector(e)}.call(this,e,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}}(),s=null,c=0,f=[],l=n(62);function d(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=a[r.id];if(o){o.refs++;for(var u=0;u<o.parts.length;u++)o.parts[u](r.parts[u]);for(;u<r.parts.length;u++)o.parts.push(x(r.parts[u],t))}else{var i=[];for(u=0;u<r.parts.length;u++)i.push(x(r.parts[u],t));a[r.id]={id:r.id,refs:1,parts:i}}}}function p(e,t){for(var n=[],r={},o=0;o<e.length;o++){var a=e[o],u=t.base?a[0]+t.base:a[0],i={css:a[1],media:a[2],sourceMap:a[3]};r[u]?r[u].parts.push(i):n.push(r[u]={id:u,parts:[i]})}return n}function v(e,t){var n=i(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=f[f.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),f.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=i(e.insertAt.before,n);n.insertBefore(t,o)}}function g(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=f.indexOf(e);t>=0&&f.splice(t,1)}function m(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var r=function(){0;return n.nc}();r&&(e.attrs.nonce=r)}return h(t,e.attrs),v(e,t),t}function h(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function x(e,t){var n,r,o,a;if(t.transform&&e.css){if(!(a="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=a}if(t.singleton){var u=c++;n=s||(s=m(t)),r=M.bind(null,n,u,!1),o=M.bind(null,n,u,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",h(t,e.attrs),v(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,a=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||a)&&(r=l(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var u=new Blob([r],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(u),i&&URL.revokeObjectURL(i)}.bind(null,n,t),o=function(){g(n),n.href&&URL.revokeObjectURL(n.href)}):(n=m(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){g(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=u()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=p(e,t);return d(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var u=n[o];(i=a[u.id]).refs--,r.push(i)}e&&d(p(e,t),t);for(o=0;o<r.length;o++){var i;if(0===(i=r[o]).refs){for(var s=0;s<i.parts.length;s++)i.parts[s]();delete a[i.id]}}}};var y,D=(y=[],function(e,t){return y[e]=t,y.filter(Boolean).join("\n")});function M(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=D(t,o);else{var a=document.createTextNode(o),u=e.childNodes;u[t]&&e.removeChild(u[t]),u.length?e.insertBefore(a,u[t]):e.appendChild(a)}}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,a=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(a)?e:(o=0===a.indexOf("//")?a:0===a.indexOf("/")?n+a:r+a.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(e,t,n){var r=n(0);e.exports=function(e,t,n,o){var a=r(e).getTime(),u=r(t).getTime(),i=r(n).getTime(),s=r(o).getTime();if(a>u||i>s)throw new Error("The start of the range cannot be after the end of the range");return a<s&&i<u}},function(e,t,n){var r=n(0);e.exports=function(e,t){if(!(t instanceof Array))throw new TypeError(toString.call(t)+" is not an instance of Array");var n,o,a=r(e).getTime();return t.forEach(function(e,t){var u=r(e),i=Math.abs(a-u.getTime());(void 0===n||i<o)&&(n=t,o=i)}),n}},function(e,t,n){var r=n(0);e.exports=function(e,t){if(!(t instanceof Array))throw new TypeError(toString.call(t)+" is not an instance of Array");var n,o,a=r(e).getTime();return t.forEach(function(e){var t=r(e),u=Math.abs(a-t.getTime());(void 0===n||u<o)&&(n=t,o=u)}),n}},function(e,t,n){var r=n(3),o=6e4,a=6048e5;e.exports=function(e,t){var n=r(e),u=r(t),i=n.getTime()-n.getTimezoneOffset()*o,s=u.getTime()-u.getTimezoneOffset()*o;return Math.round((i-s)/a)}},function(e,t,n){var r=n(32),o=n(0);e.exports=function(e,t){var n=o(e),a=o(t);return 4*(n.getFullYear()-a.getFullYear())+(r(n)-r(a))}},function(e,t,n){var r=n(9),o=6e4,a=6048e5;e.exports=function(e,t,n){var u=r(e,n),i=r(t,n),s=u.getTime()-u.getTimezoneOffset()*o,c=i.getTime()-i.getTimezoneOffset()*o;return Math.round((s-c)/a)}},function(e,t,n){var r=n(12),o=36e5;e.exports=function(e,t){var n=r(e,t)/o;return n>0?Math.floor(n):Math.ceil(n)}},function(e,t,n){var r=n(0),o=n(30),a=n(8),u=n(35);e.exports=function(e,t){var n=r(e),i=r(t),s=a(n,i),c=Math.abs(o(n,i));return n=u(n,s*c),s*(c-(a(n,i)===-s))}},function(e,t,n){var r=n(12),o=6e4;e.exports=function(e,t){var n=r(e,t)/o;return n>0?Math.floor(n):Math.ceil(n)}},function(e,t,n){var r=n(17);e.exports=function(e,t){var n=r(e,t)/3;return n>0?Math.floor(n):Math.ceil(n)}},function(e,t,n){var r=n(34);e.exports=function(e,t){var n=r(e,t)/7;return n>0?Math.floor(n):Math.ceil(n)}},function(e,t,n){var r=n(0),o=n(33),a=n(8);e.exports=function(e,t){var n=r(e),u=r(t),i=a(n,u),s=Math.abs(o(n,u));return n.setFullYear(n.getFullYear()-i*s),i*(s-(a(n,u)===-i))}},function(e,t){e.exports=function(){var e={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};return{localize:function(t,n,r){var o;return r=r||{},o="string"==typeof e[t]?e[t]:1===n?e[t].one:e[t].other.replace("{{count}}",n),r.addSuffix?r.comparison>0?"in "+o:o+" ago":o}}}},function(e,t,n){var r=n(77);e.exports=function(){var e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],t=["January","February","March","April","May","June","July","August","September","October","November","December"],n=["Su","Mo","Tu","We","Th","Fr","Sa"],o=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],u=["AM","PM"],i=["am","pm"],s=["a.m.","p.m."],c={MMM:function(t){return e[t.getMonth()]},MMMM:function(e){return t[e.getMonth()]},dd:function(e){return n[e.getDay()]},ddd:function(e){return o[e.getDay()]},dddd:function(e){return a[e.getDay()]},A:function(e){return e.getHours()/12>=1?u[1]:u[0]},a:function(e){return e.getHours()/12>=1?i[1]:i[0]},aa:function(e){return e.getHours()/12>=1?s[1]:s[0]}};return["M","D","DDD","d","Q","W"].forEach(function(e){c[e+"o"]=function(t,n){return function(e){var t=e%100;if(t>20||t<10)switch(t%10){case 1:return e+"st";case 2:return e+"nd";case 3:return e+"rd"}return e+"th"}(n[e](t))}}),{formatters:c,formattingTokensRegExp:r(c)}}},function(e,t){var n=["M","MM","Q","D","DD","DDD","DDDD","d","E","W","WW","YY","YYYY","GG","GGGG","H","HH","h","hh","m","mm","s","ss","S","SS","SSS","Z","ZZ","X","x"];e.exports=function(e){var t=[];for(var r in e)e.hasOwnProperty(r)&&t.push(r);var o=n.concat(t).sort().reverse();return new RegExp("(\\[[^\\[]*\\])|(\\\\)?("+o.join("|")+"|.)","g")}},function(e,t,n){var r=n(16),o=n(0),a=n(18),u=n(19),i=1440,s=43200,c=525600;e.exports=function(e,t,n){var f=n||{},l=r(e,t),d=f.locale,p=u.distanceInWords.localize;d&&d.distanceInWords&&d.distanceInWords.localize&&(p=d.distanceInWords.localize);var v,g,m,h={addSuffix:Boolean(f.addSuffix),comparison:l};l>0?(v=o(e),g=o(t)):(v=o(t),g=o(e));var x=Math[f.partialMethod?String(f.partialMethod):"floor"],y=a(g,v),D=g.getTimezoneOffset()-v.getTimezoneOffset(),M=x(y/60)-D;if("s"===(m=f.unit?String(f.unit):M<1?"s":M<60?"m":M<i?"h":M<s?"d":M<c?"M":"Y"))return p("xSeconds",y,h);if("m"===m)return p("xMinutes",M,h);if("h"===m)return p("xHours",x(M/60),h);if("d"===m)return p("xDays",x(M/i),h);if("M"===m)return p("xMonths",x(M/s),h);if("Y"===m)return p("xYears",x(M/c),h);throw new Error("Unknown unit: "+m)}},function(e,t,n){var r=n(36);e.exports=function(e,t){return r(Date.now(),e,t)}},function(e,t,n){var r=n(0);e.exports=function(e,t,n){var o=r(e),a=void 0!==n?n:1,u=r(t).getTime();if(o.getTime()>u)throw new Error("The first date cannot be after the second date");var i=[],s=o;for(s.setHours(0,0,0,0);s.getTime()<=u;)i.push(r(s)),s.setDate(s.getDate()+a);return i}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setMinutes(59,59,999),t}},function(e,t,n){var r=n(37);e.exports=function(e){return r(e,{weekStartsOn:1})}},function(e,t,n){var r=n(2),o=n(3);e.exports=function(e){var t=r(e),n=new Date(0);n.setFullYear(t+1,0,4),n.setHours(0,0,0,0);var a=o(n);return a.setMilliseconds(a.getMilliseconds()-1),a}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setSeconds(59,999),t}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getMonth(),o=n-n%3+3;return t.setMonth(o,0),t.setHours(23,59,59,999),t}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setMilliseconds(999),t}},function(e,t,n){var r=n(20);e.exports=function(){return r(new Date)}},function(e,t){e.exports=function(){var e=new Date,t=e.getFullYear(),n=e.getMonth(),r=e.getDate(),o=new Date(0);return o.setFullYear(t,n,r+1),o.setHours(23,59,59,999),o}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getFullYear();return t.setFullYear(n+1,0,0),t.setHours(23,59,59,999),t}},function(e,t){e.exports=function(){var e=new Date,t=e.getFullYear(),n=e.getMonth(),r=e.getDate(),o=new Date(0);return o.setFullYear(t,n,r-1),o.setHours(23,59,59,999),o}},function(e,t,n){var r=n(39),o=n(21),a=n(2),u=n(0),i=n(41),s=n(19);var c={M:function(e){return e.getMonth()+1},MM:function(e){return l(e.getMonth()+1,2)},Q:function(e){return Math.ceil((e.getMonth()+1)/3)},D:function(e){return e.getDate()},DD:function(e){return l(e.getDate(),2)},DDD:function(e){return r(e)},DDDD:function(e){return l(r(e),3)},d:function(e){return e.getDay()},E:function(e){return e.getDay()||7},W:function(e){return o(e)},WW:function(e){return l(o(e),2)},YY:function(e){return l(e.getFullYear(),4).substr(2)},YYYY:function(e){return l(e.getFullYear(),4)},GG:function(e){return String(a(e)).substr(2)},GGGG:function(e){return a(e)},H:function(e){return e.getHours()},HH:function(e){return l(e.getHours(),2)},h:function(e){var t=e.getHours();return 0===t?12:t>12?t%12:t},hh:function(e){return l(c.h(e),2)},m:function(e){return e.getMinutes()},mm:function(e){return l(e.getMinutes(),2)},s:function(e){return e.getSeconds()},ss:function(e){return l(e.getSeconds(),2)},S:function(e){return Math.floor(e.getMilliseconds()/100)},SS:function(e){return l(Math.floor(e.getMilliseconds()/10),2)},SSS:function(e){return l(e.getMilliseconds(),3)},Z:function(e){return f(e.getTimezoneOffset(),":")},ZZ:function(e){return f(e.getTimezoneOffset())},X:function(e){return Math.floor(e.getTime()/1e3)},x:function(e){return e.getTime()}};function f(e,t){t=t||"";var n=e>0?"-":"+",r=Math.abs(e),o=r%60;return n+l(Math.floor(r/60),2)+t+l(o,2)}function l(e,t){for(var n=Math.abs(e).toString();n.length<t;)n="0"+n;return n}e.exports=function(e,t,n){var r=t?String(t):"YYYY-MM-DDTHH:mm:ss.SSSZ",o=(n||{}).locale,a=s.format.formatters,f=s.format.formattingTokensRegExp;o&&o.format&&o.format.formatters&&(a=o.format.formatters,o.format.formattingTokensRegExp&&(f=o.format.formattingTokensRegExp));var l=u(e);return i(l)?function(e,t,n){var r,o,a,u=e.match(n),i=u.length;for(r=0;r<i;r++)o=t[u[r]]||c[u[r]],u[r]=o||((a=u[r]).match(/\[[\s\S]/)?a.replace(/^\[|]$/g,""):a.replace(/\\/g,""));return function(e){for(var t="",n=0;n<i;n++)u[n]instanceof Function?t+=u[n](e,c):t+=u[n];return t}}(r,a,f)(l):"Invalid Date"}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getDate()}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getDay()}},function(e,t,n){var r=n(42);e.exports=function(e){return r(e)?366:365}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getHours()}},function(e,t,n){var r=n(7),o=n(15),a=6048e5;e.exports=function(e){var t=r(e),n=r(o(t,60)).valueOf()-t.valueOf();return Math.round(n/a)}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getMilliseconds()}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getMinutes()}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getMonth()}},function(e,t,n){var r=n(0),o=864e5;e.exports=function(e,t,n,a){var u=r(e).getTime(),i=r(t).getTime(),s=r(n).getTime(),c=r(a).getTime();if(u>i||s>c)throw new Error("The start of the range cannot be after the end of the range");if(!(u<c&&s<i))return 0;var f=(c>i?i:c)-(s<u?u:s);return Math.ceil(f/o)}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getSeconds()}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getFullYear()}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()>o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()<o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()===o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){return 1===r(e).getDate()}},function(e,t,n){var r=n(0);e.exports=function(e){return 5===r(e).getDay()}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getTime()>(new Date).getTime()}},function(e,t,n){var r=n(0),o=n(20),a=n(38);e.exports=function(e){var t=r(e);return o(t).getTime()===a(t).getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){return 1===r(e).getDay()}},function(e,t,n){var r=n(0);e.exports=function(e){return r(e).getTime()<(new Date).getTime()}},function(e,t,n){var r=n(4);e.exports=function(e,t){var n=r(e),o=r(t);return n.getTime()===o.getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){return 6===r(e).getDay()}},function(e,t,n){var r=n(0);e.exports=function(e){return 0===r(e).getDay()}},function(e,t,n){var r=n(44);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(46);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(47);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(48);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(50);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(51);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(53);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(22);e.exports=function(e,t){return r(new Date,e,t)}},function(e,t,n){var r=n(55);e.exports=function(e){return r(new Date,e)}},function(e,t,n){var r=n(0);e.exports=function(e){return 4===r(e).getDay()}},function(e,t,n){var r=n(4);e.exports=function(e){return r(e).getTime()===r(new Date).getTime()}},function(e,t,n){var r=n(4);e.exports=function(e){var t=new Date;return t.setDate(t.getDate()+1),r(e).getTime()===r(t).getTime()}},function(e,t,n){var r=n(0);e.exports=function(e){return 2===r(e).getDay()}},function(e,t,n){var r=n(0);e.exports=function(e){return 3===r(e).getDay()}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e).getDay();return 0===t||6===t}},function(e,t,n){var r=n(0);e.exports=function(e,t,n){var o=r(e).getTime(),a=r(t).getTime(),u=r(n).getTime();if(a>u)throw new Error("The start of the range cannot be after the end of the range");return o>=a&&o<=u}},function(e,t,n){var r=n(4);e.exports=function(e){var t=new Date;return t.setDate(t.getDate()-1),r(e).getTime()===r(t).getTime()}},function(e,t,n){var r=n(56);e.exports=function(e){return r(e,{weekStartsOn:1})}},function(e,t,n){var r=n(2),o=n(3);e.exports=function(e){var t=r(e),n=new Date(0);n.setFullYear(t+1,0,4),n.setHours(0,0,0,0);var a=o(n);return a.setDate(a.getDate()-1),a}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getMonth();return t.setFullYear(t.getFullYear(),n+1,0),t.setHours(0,0,0,0),t}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getMonth(),o=n-n%3+3;return t.setMonth(o,0),t.setHours(0,0,0,0),t}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e),n=t.getFullYear();return t.setFullYear(n+1,0,0),t.setHours(0,0,0,0),t}},function(e,t,n){var r=n(0);e.exports=function(){var e=Array.prototype.slice.call(arguments).map(function(e){return r(e)}),t=Math.max.apply(null,e);return new Date(t)}},function(e,t,n){var r=n(0);e.exports=function(){var e=Array.prototype.slice.call(arguments).map(function(e){return r(e)}),t=Math.min.apply(null,e);return new Date(t)}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setDate(o),n}},function(e,t,n){var r=n(0),o=n(5);e.exports=function(e,t,n){var a=n&&Number(n.weekStartsOn)||0,u=r(e),i=Number(t),s=u.getDay();return o(u,((i%7+7)%7<a?7:0)+i-s)}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setMonth(0),n.setDate(o),n}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setHours(o),n}},function(e,t,n){var r=n(0),o=n(5),a=n(43);e.exports=function(e,t){var n=r(e),u=Number(t),i=a(n);return o(n,u-i)}},function(e,t,n){var r=n(0),o=n(21);e.exports=function(e,t){var n=r(e),a=Number(t),u=o(n)-a;return n.setDate(n.getDate()-7*u),n}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setMilliseconds(o),n}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setMinutes(o),n}},function(e,t,n){var r=n(0),o=n(57);e.exports=function(e,t){var n=r(e),a=Number(t)-(Math.floor(n.getMonth()/3)+1);return o(n,n.getMonth()+3*a)}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setSeconds(o),n}},function(e,t,n){var r=n(0);e.exports=function(e,t){var n=r(e),o=Number(t);return n.setFullYear(o),n}},function(e,t,n){var r=n(0);e.exports=function(e){var t=r(e);return t.setDate(1),t.setHours(0,0,0,0),t}},function(e,t,n){var r=n(4);e.exports=function(){return r(new Date)}},function(e,t){e.exports=function(){var e=new Date,t=e.getFullYear(),n=e.getMonth(),r=e.getDate(),o=new Date(0);return o.setFullYear(t,n,r+1),o.setHours(0,0,0,0),o}},function(e,t){e.exports=function(){var e=new Date,t=e.getFullYear(),n=e.getMonth(),r=e.getDate(),o=new Date(0);return o.setFullYear(t,n,r-1),o.setHours(0,0,0,0),o}},function(e,t,n){var r=n(5);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(23);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(6);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(26);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(11);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(27);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(28);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(15);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){var r=n(29);e.exports=function(e,t){var n=Number(t);return r(e,-n)}},function(e,t,n){"use strict";n.r(t);n(58);var r=n(1);let o=JSON.parse(window.localStorage.getItem("taskList"))||[];const a=[],u=(()=>{const e=e=>{o.push(e),window.localStorage.setItem("taskList",JSON.stringify(o))};return{addTask:e,addProject:e=>a.push(e),addTaskToProject:(t,n)=>{n.projectId=t.projectId,e(n),t.tasks.push(n)}}})(),i=JSON.parse(window.localStorage.getItem("taskList")),s=(document.querySelector("#tasks-today"),()=>{let e=[];i.map(t=>{let n=t.date.split("T")[0];e.includes(n)||e.push(n),e=e.sort(r.compareAsc)}),e.map(e=>{let t=document.createElement("h4");((e,t)=>{let n=t||new Date;e.textContent=Object(r.format)(n,"MMMM Do, YYYY")})(t,e),document.querySelector("#task-list").appendChild(t);let n=document.createElement("ul");document.querySelector("#task-list").appendChild(n),function(e){return i.filter(function(t){return t.date.split("T")[0]===e})}(e).map(e=>{let t=document.createElement("li");t.innerHTML=`${Object(r.format)(e.date,"hh:mm a")}: ${e.title}`,n.appendChild(t)})})}),c=document.querySelector("#calendar"),f=e=>{let t=document.createElement("div");t.setAttribute("class","calendar-day"),t.textContent=e,c.appendChild(t)},l=document.querySelector("#add-task"),d=document.querySelector("form");l.onclick=(()=>{d.style.display="none"===d.style.display?"block":"none"});const p=e=>document.getElementsByName(e)[0].value;document.querySelector("#save-task").onclick=(e=>{e.preventDefault();let t=((e,t,n,r,o)=>({title:e,description:t,date:n,priority:r,projectId:o}))(p("title"),p("description"),new Date(p("date")),p("priority"));u.addTask(t),d.style.display="none"}),(e=>{const t=document.querySelector("#cal-heading");let n=e||new Date;t.textContent=Object(r.format)(n,"MMMM YYYY")})(new Date),window.localStorage.getItem("taskList")&&s();let v,g=1-Object(r.getDay)(Object(r.startOfMonth)(new Date)),m=new Date;for(v=g;v<=Object(r.getDaysInMonth)(new Date);v++)f(new Date(m.getFullYear(),m.getMonth(),v).getDate())}]);