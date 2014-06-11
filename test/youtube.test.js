describe('Youtube', function() {
    
    chai.should()
    
    var youtube = makeOembedLink('https://www.youtube.com/watch?v=M3h00M9dcj4')
    var youtubePlain = makeLink('https://www.youtube.com/watch?v=M3h00M9dcj4')
 
    it('Should not take any notice of unclassed links', function() {
        var node = makeNode(youtubePlain)
        node.find('.oembed').length.should.equal(0)
    })
    
    it('Should replace YouTube links with the correct embed code', function() {
        var node = makeNode(youtube)
        
        node.find('iframe').length
            .should.equal(1)
        node.find('iframe').attr('src')
            .should.include('//www.youtube.com/embed/M3h00M9dcj4?wmode=transparent')
    })
})