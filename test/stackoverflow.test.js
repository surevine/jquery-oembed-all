describe('Stackoverflow', function() {
    
    chai.should()
    
    var sandbox
    beforeEach(function(){
        sandbox = sinon.sandbox.create()
    })
 
    afterEach(function() {
        sandbox.restore()
    })
    
    var stackOverflowLink = makeOembedLink('http://stackoverflow.com/questions/1335851')
    
    it('Should call the StackOverflow API when it finds an SO link', function(done) {
        
        var node = makeCleanNode(stackOverflowLink)
        
        sandbox.stub($, 'ajax', function(options) {
            options.url.should
                .equal('//api.stackexchange.com/2.2/questions/1335851?body=true&site=stackoverflow&jsonp=?')
            done()
        })
        
        node.find('.oembed').oembed()
    })
    
    it('Should build the correct SO form', function(done) {
        var node = makeCleanNode(stackOverflowLink)
        
        sandbox.stub($, 'ajax', function(options) {
            if (!options.success)
                return done('No success function')
                
            options.success(apiResponse)
            
            node.find('.oembedall-stoqembed').length
                .should.equal(1)

            node.find('.oembedall-stoqembed .oembedall-statscontainer').length
                .should.equal(1)
            node.find('.oembedall-stoqembed .oembedall-summary').length
                .should.equal(1)
            node.find('.oembedall-stoqembed .oembedall-fr').length
                .should.equal(1)
            done()
        })
        
        node.find('.oembed').oembed()
    })
    
    var apiResponse = {"items":[{"tags":["javascript","syntax","jslint","crockford","use-strict"],"owner":{"reputation":17921,"user_id":25847,"user_type":"registered","accept_rate":81,"profile_image":"https://www.gravatar.com/avatar/2a7422e683acff1b012c7564823963ae?s=128&d=identicon&r=PG","display_name":"Mark Rogers","link":"http://stackoverflow.com/users/25847/mark-rogers"},"is_answered":true,"view_count":378508,"protected_date":1370840538,"accepted_answer_id":1335881,"answer_count":10,"score":2707,"last_activity_date":1401913321,"creation_date":1251303013,"last_edit_date":1351575384,"question_id":1335851,"link":"http://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it","title":"What does &quot;use strict&quot; do in JavaScript, and what is the reasoning behind it?"}],"has_more":false,"quota_max":300,"quota_remaining":207}
})