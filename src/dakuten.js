function tsukeru() {
    var input = document.getElementById('input').value,
        // ﾞ \uFF9E  ﾟ \uFF9F
        // split this into different levels of muriyari?
        lut = {'g':'kﾞ',
               'z':'sﾞ',
               'd':'tﾞ',
               'b':'hﾞ',
               'p':'hﾟ',
               'v':'fﾞ',
               'j':'chﾞ',
               'ng':'kﾟ'},
    output = input.replace(/ng|[gzdbpvj]/g, m => lut[m]);
    document.getElementById('output').value = output;
}
