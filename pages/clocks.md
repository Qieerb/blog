---
layout: post
title:  "Clocks"
categories: things
---

A collection of silly clocks

<div id="timer"></div>

<div id="dtimer"></div>

<div id="rtimer"></div>

<script type="text/javascript">

    function zeroPad(s) {
        if (isNaN(s)) {
            // works even if s is string??? wtf was i thinking?
            return (s.length == 1) ? '0' + s : s;
        }
        else {
            return (s < 10) ? '0' + s : s;
        }
    }

    // only need to work for [0,2359]
    function toRoman(hhmm) {
        var lut = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
            r = '',
            i;
        for (i in lut) {
            while (hhmm >= lut[i]) {
                r += i;
                hhmm -= lut[i];
            }
        }
        return r;
    }

    function startTime() {
        var t = new Date(),
            h = t.getHours(),
            m = t.getMinutes(),
            s = t.getSeconds(),
            l = t.getMilliseconds(),
            // 86400 seconds in a 24-hour day, 100000 seconds in a decimal day
            dt = (3600*h + 60*m + s + l/1000)/0.864,
            st = dt.toFixed(0),
            dh = st.slice(0,-4),
            dm = st.slice(-4,-2),
            ds = st.slice(-2),
            // convert hhmm to roman numeral
            rt = toRoman(100*h + m);

        document.getElementById( 'timer').innerHTML = 'Current time: ' + zeroPad(h) + ":" + zeroPad(m) + ":" + zeroPad(s);
        document.getElementById('dtimer').innerHTML = 'Decimal time: ' + zeroPad(dh) + ":" + dm + ":" + ds;
        document.getElementById('rtimer').innerHTML = 'Roman numeral time: ' + rt;
        setTimeout(startTime, 50);
    }

    startTime();

</script>
