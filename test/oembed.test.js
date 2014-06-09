describe('Setup and options', function() {
    
    chai.should()
    
    var easyQuestion = 'http://stackoverflow.com/questions/1335851'
    
    var sandbox
    beforeEach(function(){
        sandbox = sinon.sandbox.create()
    })
 
    afterEach(function() {
        sandbox.restore()
    })
    
    it('Should attach an oembed method', function() {
        makeNode('test').oembed.should.exist
    })
    
    it('Should attach open/close handles', function(done) {
        var link = makeOembedLink(easyQuestion)
        var node = makeCleanNode(link)
        
        sandbox.stub($, 'ajax', function(options) {
            if (!options.success)
                return
            
            options.success(apiResponse)
                
            var closeHide = node.find('.oembedall-closehide')
        
            closeHide.length.should.equal(1)
        
            var content = encodeURIComponent(node.find('.oembedall-closehide').text())
            content.should.equal('%E2%86%91')

            closeHide.trigger('click')
            
            var content = encodeURIComponent(node.find('.oembedall-closehide').text())
            content.should.equal('%E2%86%93')
            
            done()
        })
        
        node.find('a.oembed').oembed()
    })
    
    it('Should attach custom open/close handles when specified', function(done) {
        var link = makeOembedLink(easyQuestion)
        var node = makeCleanNode(link)
        
        var handleOpen = '<span class="icon-chevron-down"></span>'
        var handleClose = '<span class="icon-chevron-up"></span>'
        
        sandbox.stub($, 'ajax', function(options) {
            if (!options.success)
                return
            
            options.success(apiResponse)
                
            var closeHide = node.find('.oembedall-closehide')
        
            closeHide.length.should.equal(1)
        
            closeHide[0].innerHTML.should.equal(handleClose)
            closeHide.trigger('click')
            closeHide[0].innerHTML.should.equal(handleOpen)
            
            return done()
        })
        
        node.find('a.oembed').oembed(null, {
            handleOpen: handleOpen,
            handleClose: handleClose
        })
    })
    
    it('Should start closed when specified', function(done) {
        var link = makeOembedLink(easyQuestion)
        var node = makeCleanNode(link)
        
        sandbox.stub($, 'ajax', function(options) {
            if (!options.success)
                return
            
            options.success(apiResponse)
            var embedNode = node.find('.oembedall-container').children().last()
            embedNode.attr('style').should.exist
            embedNode.css('display').should.equal('none')
            
            done()
        })
        
        node.find('.oembed').oembed(null, {
            startClosed: true
        })
    })
});



var apiResponse = {"items":[{"tags":["javascript","syntax","jslint","crockford","use-strict"],"owner":{"reputation":17921,"user_id":25847,"user_type":"registered","accept_rate":81,"profile_image":"https://www.gravatar.com/avatar/2a7422e683acff1b012c7564823963ae?s=128&d=identicon&r=PG","display_name":"Mark Rogers","link":"http://stackoverflow.com/users/25847/mark-rogers"},"is_answered":true,"view_count":378508,"protected_date":1370840538,"accepted_answer_id":1335881,"answer_count":10,"score":2707,"last_activity_date":1401913321,"creation_date":1251303013,"last_edit_date":1351575384,"question_id":1335851,"link":"http://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it","title":"What does &quot;use strict&quot; do in JavaScript, and what is the reasoning behind it?"}],"has_more":false,"quota_max":300,"quota_remaining":207}