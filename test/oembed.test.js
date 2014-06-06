describe("jQuery oEmbed plugin", function() {
    
    chai.should()
    
    it('Should attach an oembed method', function() {
        makeNode('test').oembed.should.exist
    })
});
