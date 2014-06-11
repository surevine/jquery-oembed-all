describe('Vimeo', function() {
    
    chai.should()
    
    var sandbox
    beforeEach(function(){
        sandbox = sinon.sandbox.create()
    })
 
    afterEach(function() {
        sandbox.restore()
    })
    
    var videoId = '79611961';
    var vimeo = makeOembedLink('http://vimeo.com/'+videoId)
 
    it('Should tag Vimeo links as oembeddable', function() {
        var node = makeNode(vimeo)
        node.find('.oembed').length.should.equal(1)
    })
    
    it('Should make the correct call to the Vimeo API', function(done) {
        var node = makeCleanNode(vimeo)
        
        sandbox.stub($, 'ajax', function(options) {
            options.url.should
                .equal('//vimeo.com/api/oembed.json?format=json&url=http%3A//vimeo.com/'+videoId+'&callback=?')
            options.dataType.should.equal('jsonp')
            
            done()
        })
        
        node.find('.oembed').oembed()
    })
    
    it('Should embed the video correctly', function(done) {
        var node = makeCleanNode(vimeo)
        
        sandbox.stub($, 'ajax', function(options) {
            options.success(apiResponse)
            
            node.find('.oembedall-container iframe').length.should.equal(1)
            node.find('.oembedall-container iframe')
                .attr('src')
                .should
                .equal('//player.vimeo.com/video/79611961')
            done()
        })
        
        node.find('.oembed').oembed()
    })

    var apiResponse = {"type":"video","version":"1.0","provider_name":"Vimeo","provider_url":"https:\/\/vimeo.com\/","title":"BROOKLYNIANS \"The Hipster Coffee Incident\"","author_name":"Brooklynians","author_url":"https:\/\/vimeo.com\/brooklynians","is_plus":"0","html":"<iframe src=\"\/\/player.vimeo.com\/video\/79611961\" width=\"1280\" height=\"720\" frameborder=\"0\" title=\"BROOKLYNIANS &quot;The Hipster Coffee Incident&quot;\" webkitallowfullscreen mozallowfullscreen allowfullscreen><\/iframe>","width":1280,"height":720,"duration":268,"description":"An animated series about life, sex, & ironic mustaches.  In episode 1, Dave's roommate drags him to a new coffee shop.\n\nAnimated\/written\/directed by Matthew Tyler.  Voices: Matthew Tyler as Dave, Michael Toscano as Hipster Barista, and Nathan Floody as Pete.  Fake indie music by Matthew Tyler.  All other music: public domain.\n\nFind out more at www.brooklynians.net.","thumbnail_url":"https:\/\/i.vimeocdn.com\/video\/455345291_1280.jpg","thumbnail_width":1280,"thumbnail_height":720,"video_id":79611961}
})