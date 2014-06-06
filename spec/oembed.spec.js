describe("jQuery oEmbed plugin", function() {
 
    var noEmbedLinks = '<a href="https://www.youtube.com/watch?v=M3h00M9dcj4">one link</a>'
    var youtubeEmbedLink = '<a class="oembed" href="https://www.youtube.com/watch?v=M3h00M9dcj4">one link</a>'
    var node;
    chai.should()
    
    beforeEach(function(){
//        node = $('<div>'+noEmbedLinks+'</div>')
    });
 
    afterEach(function() {
        node = undefined
    })
    
    it('should fail', function() {
        'hello new world'.should.include('new')
    })
 
    it('Should not take any notice of unclassed links', function() {
        var node = $('<div>'+noEmbedLinks+'</div>')
        node.find('.oembed').length.should.equal(0)
    })
    
    it('Should replace YouTube links with the correct embed code', function() {
        var node = $('<div>'+youtubeEmbedLink+'</div>')
        node.find('.oembed').oembed()
        
        node.find('iframe').length
            .should.equal(1)
        node.find('iframe').attr('src')
            .should.include('http://www.youtube.com/embed/M3h00M9dcj4?wmode=transparent')
    })
});
