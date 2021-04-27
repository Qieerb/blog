function tsukeru() {
    var input = document.getElementById('input').value;
    if (!input) {
        input = document.getElementById('input').placeholder
    };
        // ﾞ \uFF9E  ﾟ \uFF9F
        // split this into different levels of muriyari?
    var lut = {// English (maybe make this follow latin?)
               'g':'kﾞ', 'z':'sﾞ', 'd':'tﾞ', 'b':'hﾞ', 'p':'hﾟ', 'v':'fﾞ', 'j':'cﾞ', 'ng':'kﾟ',
               // Greek (modern greek, no h sound)
               'μπ':'πﾞ', 'ντ':'τﾞ', 'γκ':'κﾞ', 'β':'φﾞ', 'δ':'θﾞ', 'ζ':'σﾞ', 'γ':'χﾞ'},
        reg = Object.keys(lut).join('|'),
        matcher = new RegExp(reg, 'gi');

    output = input.replace(matcher, function(m){
        k = m.toLowerCase();
        if (k == m) {
            return lut[k];
        } else {
            return lut[k].toUpperCase();
        };
    });
    document.getElementById('output').value = output;
}
