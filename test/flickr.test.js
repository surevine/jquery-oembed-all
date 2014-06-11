describe.skip('Flickr', function() {
    
    chai.should()
    
    var sandbox
    beforeEach(function(){
        sandbox = sinon.sandbox.create()
    })
 
    afterEach(function() {
        sandbox.restore()
    })
    
})