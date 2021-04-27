---
title: Dakuten
layout: post
---

<strong>A tool that irresponsibly adds dakutens everywhere.</strong>

<strong>濁点を無理やりつけるツール！</strong>

<div>
<textarea  style="display:block; margin-left:auto; margin-right:auto; background-color:black; color:white; width:90%" id="input" type="text" rows="10"></textarea>
<br>
<button style="display:block; margin-left:auto; margin-right:auto;" onclick="tsukeru()">つける！</button>
<br>
<textarea style="display:block; margin-left:auto; margin-right:auto; background-color:black; color:white; width:90%" id="output" type="text" rows="10"></textarea>
<br>
</div>

<script type="text/javascript" src="../src/dakuten.js"></script>
<script type="text/javascript">
    document.getElementById('input').placeholder = "The quick brown fox jumps over the lazy dog.\n\n"
                                                  +"Διαφυλάξτε γενικά τη ζωή σας από βαθειά ψυχικά τραύματα.";
</script>
