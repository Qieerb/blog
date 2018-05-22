---
title: First post
layout: default
---

This is the first post. It has a different layout compared to the main page.

<div id="timer"></div>

<div id="dtimer"></div>

<script type="text/javascript">

    function zeroPad(s) {
        if (isNaN(s)) {
            return (s.length == 1) ? '0' + s : s;
        }
        else {
            return (s < 10) ? '0' + s : s;
        }
    }

    function startTime() {
        var t = new Date(),
            h = t.getHours(),
            m = t.getMinutes(),
            s = t.getSeconds(),
            l = t.getMilliseconds(),
            dt = (3600*h + 60*m + s + l/1000)/0.864,
            st = dt.toFixed(0),
            dh = st.slice(0,-4),
            dm = st.slice(-4,-2),
            ds = st.slice(-2);
        document.getElementById('timer').innerHTML = 'Current time: ' + zeroPad(h) + ":" + zeroPad(m) + ":" + zeroPad(s);
        document.getElementById('dtimer').innerHTML = 'Decimal time: ' + zeroPad(dh) + ":" + dm + ":" + ds;
        setTimeout(startTime, 50);
    }

    startTime();

</script>