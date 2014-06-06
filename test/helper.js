var makeLink = function(link) {
    return '<a href="'+link+'">link</a>'
}

var makeOembedLink = function(link) {
    return '<a class="oembed" href="'+link+'">link</a>'
}

var makeCleanNode = function(content) {
    return $('<div>'+content+'</div>')
}

var makeNode = function(content) {
    var rtn = makeCleanNode(content)
    rtn.find('.oembed').oembed()
    return rtn
}