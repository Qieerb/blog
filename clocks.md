---
title: Clocks
layout: post
---

<strong>A collection of silly clocks, see if you can figure out how each works :))</strong>

### 24-hour time

* <span id="timer"></span>

### Decimal time

* <span id="dtimer"></span>

### Roman time

* <span id="rtimer"></span>

### Roman decimal time

* <span id="rdtimer"></span>


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
    function toRoman(dt) {
        var lut = {M:1000, CM:900,
                   D:500,  CD:400,
                   C:100,  XC:90,
                   L:50,   XL:40,
                   X:10,   IX:9,
                   V:5,    IV:4,
                   I:1,    S:0.5,
                   "·":1/12},
            dtm = dt,
            r = '',
            i;
        for (i in lut) {
            while (dtm >= lut[i]) {
                r += i;
                dtm -= lut[i];
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
            // normal 24-hour time in seconds
            nt = (3600*h + 60*m + s + l/1000),
            // 86400 seconds in a 24-hour day, 100000 seconds in a decimal day
            // decimal time
            dt = nt/0.864,
            st = dt.toFixed(0),
            dh = st.slice(0,-4),
            dm = st.slice(-4,-2),
            ds = st.slice(-2),
            // convert nt to roman numeral
            rt = toRoman(100*h + m + s/60 + l/60000),
            // roman decimal time??
            rdt = toRoman(dt/100);

        document.getElementById(  'timer').innerHTML = zeroPad(h) + ":" + zeroPad(m) + ":" + zeroPad(s);
        document.getElementById( 'dtimer').innerHTML = zeroPad(dh) + ":" + dm + ":" + ds;
        document.getElementById( 'rtimer').innerHTML = rt;
        document.getElementById('rdtimer').innerHTML = rdt;
        setTimeout(startTime, 50);
    }

    startTime();

</script>