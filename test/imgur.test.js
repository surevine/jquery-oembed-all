describe('Imgur', function() {
    
    chai.should()
    
    var pageLinkStr = 'https://imgur.com/8fRVxby'
    var pageLink = makeOembedLink(pageLinkStr)
    var imageLink = makeLink('https://i.imgur.com/8fRVxby.jpg')
    
    var sandbox
    beforeEach(function(){
        sandbox = sinon.sandbox.create()
    })
 
    afterEach(function() {
        sandbox.restore()
    })
 
    it('Should tag imgur links as embeddable', function() {
        var node = makeNode(pageLink)
        node.find('.oembed').length.should.equal(1)
    })
    
    it('Should make the correct call to YQL when an Imgur link is discovered', function(done) {
        var node = makeCleanNode(pageLink)
        
        sandbox.stub($, 'ajax', function(options) {
            options.url.should
                .equal('//query.yahooapis.com/v1/public/yql')
            options.dataType.should.equal('jsonp')
            options.data.should.exist
            options.data.q.should.exist
            options.data.q.should
                .equal("SELECT * FROM html WHERE url=\""+pageLinkStr+"\" and xpath='//meta|//title|//link' and compat='html5'")
            options.data.format.should.equal('json')
            
            done()
        })
        
        node.find('.oembed').oembed()
    })
    
    it('Should replace Imgur page links', function(done) {
        var node = makeCleanNode(pageLink)
        
        sandbox.stub($, 'ajax', function(options) {
            options.success(yqlResponse)
            
            node.find('.oembedall-container p').length.should.equal(1)
            node.find('.oembedall-container p img').attr('src').should.equal('http://i.imgur.com/8fRVxby.jpg')
            done()
        })
        
        node.find('.oembed').oembed()
    })
    
    // Issue #1
    it.skip('Should replace Imgur image links', function(done) {
        var node = makeCleanNode(imageLink)
        
        sandbox.stub($, 'ajax', function(options) {
            options.success(yqlResponse)
            
            node.find('.oembedall-container p').length.should.equal(1)
            node.find('.oembedall-container p img').attr('src').should.equal('http://i.imgur.com/8fRVxby.jpg')
            done()
        })
        
        node.find('.oembed').oembed()
    })
})

var yqlResponse = {"query":{"count":31,"created":"2014-06-11T08:57:35Z","lang":"en-US","results":{"title":"            \n    \n    \n    imgur: the simple image sharer","meta":[{"content":"text/html;charset=utf-8","http-equiv":"content-type"},{"content":"index,nofollow","name":"robots"},{"content":"images, funny pictures, image host, image upload, image sharing, image resize","name":"keywords"},{"content":"Imgur is home to the web's most popular image content, curated in real time by a dedicated community through commenting, voting and sharing.","name":"description"},{"content":"Copyright 2014 Imgur, Inc.","name":"copyright"},{"content":"IE=Edge;","http-equiv":"X-UA-Compatible"},{"content":"photo","name":"twitter:card"},{"content":"imgur: the simple image sharer","name":"twitter:title"},{"content":"http://i.imgur.com/8fRVxby.jpg","name":"twitter:image"},{"content":"334","name":"twitter:image:width"},{"content":"302","name":"twitter:image:height"},{"content":"Imgur","name":"author"},{"content":"Imgur","name":"article:author"},{"content":"imgur: the simple image sharer","property":"og:title"},{"content":"http://i.imgur.com/8fRVxby.jpg","property":"og:image"},{"content":"article","property":"og:type"},{"content":"Imgur","property":"og:site_name"},{"content":"http://imgur.com/8fRVxby","property":"og:url"},{"content":"12331492,12301369","property":"fb:admins"},{"content":"@imgur","name":"twitter:site"},{"content":"imgur.com","name":"twitter:domain"},{"content":"639881495","name":"twitter:app:id:iphone"},{"content":"639881495","name":"twitter:app:id:ipad"},{"content":"com.imgur.mobile","name":"twitter:app:id:googleplay"}],"link":[{"href":"http://feeds.feedburner.com/ImgurGallery?format=xml","rel":"alternate","title":"Imgur Gallery","type":"application/rss+xml"},{"href":"https://s.imgur.com/min/global.css?1402429439","rel":"stylesheet","type":"text/css"},{"href":"https://s.imgur.com/min/referrer.css?1402429439","rel":"stylesheet","type":"text/css"},{"href":"http://i.imgur.com/8fRVxby.jpg","rel":"image_src"},{"href":"http://api.imgur.com/oembed.json?url=http://i.imgur.com/8fRVxby.jpg","rel":"alternate","title":"imgur: the simple image sharer","type":"application/json+oembed"},{"href":"http://api.imgur.com/oembed.xml?url=http://i.imgur.com/8fRVxby.jpg","rel":"alternate","title":"imgur: the simple image sharer","type":"application/xml+oembed"}]}}}