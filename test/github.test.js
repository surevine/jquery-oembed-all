describe('Github', function() {
    
    chai.should()
    
    var sandbox
    beforeEach(function(){
        sandbox = sinon.sandbox.create()
    })
 
    afterEach(function() {
        sandbox.restore()
    })
    
    var githubProjectLink = makeOembedLink('http://github.com/lloydwatkin/xmpp-ftw')
 
    it('Should tag Github links as oembeddable', function() {
        var node = makeNode(githubProjectLink)
        node.find('.oembed').length.should.equal(1)
    })
    
    it('Should make the correct call to the Github API', function(done) {
        var node = makeCleanNode(githubProjectLink)
        
        sandbox.stub($, 'ajax', function(options) {
            options.url.should
                .equal('https://api.github.com/repos/lloydwatkin/xmpp-ftw?callback=?')
            options.dataType.should.equal('jsonp')
//            'https://api.github.com/repos/lloydwatkin/xmpp-ftw?callback=?'
//            'https://api.github.com/repos/xmpp-ftw/xmpp-ftw?callback=?'
            
            done()
        })
        
        node.find('.oembed').oembed()
    })
    
    it.skip('Should embed the project correctly', function(done) {
        var node = makeCleanNode(githubProjectLink)
        
        sandbox.stub($, 'ajax', function(options) {
            options.success(apiResponse)
            
            // TODO once github limit expires
        })
        
        node.find('.oembed').oembed()
    })

    var apiResponse = { "id": 7959487, "name": "xmpp-ftw", "full_name": "xmpp-ftw/xmpp-ftw", "owner": { "login": "xmpp-ftw", "id": 5758950, "avatar_url": "https://avatars.githubusercontent.com/u/5758950?", "gravatar_id": "6c507da40850fc1c7db7abf898ba5af4", "url": "https://api.github.com/users/xmpp-ftw", "html_url": "https://github.com/xmpp-ftw", "followers_url": "https://api.github.com/users/xmpp-ftw/followers", "following_url": "https://api.github.com/users/xmpp-ftw/following{/other_user}", "gists_url": "https://api.github.com/users/xmpp-ftw/gists{/gist_id}", "starred_url": "https://api.github.com/users/xmpp-ftw/starred{/owner}{/repo}", "subscriptions_url": "https://api.github.com/users/xmpp-ftw/subscriptions", "organizations_url": "https://api.github.com/users/xmpp-ftw/orgs", "repos_url": "https://api.github.com/users/xmpp-ftw/repos", "events_url": "https://api.github.com/users/xmpp-ftw/events{/privacy}", "received_events_url": "https://api.github.com/users/xmpp-ftw/received_events", "type": "Organization", "site_admin": false }, "private": false, "html_url": "https://github.com/xmpp-ftw/xmpp-ftw", "description": "The goal of this project is to make XMPP really simple to use for developers. This module takes away all of the XML and works by hooking to events which are passed between client and server using a transport in JSON. For example code see https://github.com/lloydwatkin/xmpp-ftw-demo.", "fork": false, "url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw", "forks_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/forks", "keys_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/keys{/key_id}", "collaborators_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/collaborators{/collaborator}", "teams_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/teams", "hooks_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/hooks", "issue_events_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/issues/events{/number}", "events_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/events", "assignees_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/assignees{/user}", "branches_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/branches{/branch}", "tags_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/tags", "blobs_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/git/blobs{/sha}", "git_tags_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/git/tags{/sha}", "git_refs_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/git/refs{/sha}", "trees_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/git/trees{/sha}", "statuses_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/statuses/{sha}", "languages_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/languages", "stargazers_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/stargazers", "contributors_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/contributors", "subscribers_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/subscribers", "subscription_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/subscription", "commits_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/commits{/sha}", "git_commits_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/git/commits{/sha}", "comments_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/comments{/number}", "issue_comment_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/issues/comments/{number}", "contents_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/contents/{+path}", "compare_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/compare/{base}...{head}", "merges_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/merges", "archive_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/{archive_format}{/ref}", "downloads_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/downloads", "issues_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/issues{/number}", "pulls_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/pulls{/number}", "milestones_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/milestones{/number}", "notifications_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/notifications{?since,all,participating}", "labels_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/labels{/name}", "releases_url": "https://api.github.com/repos/xmpp-ftw/xmpp-ftw/releases{/id}", "created_at": "2013-02-01T14:27:36Z", "updated_at": "2014-06-10T10:02:05Z", "pushed_at": "2014-06-09T21:34:37Z", "git_url": "git://github.com/xmpp-ftw/xmpp-ftw.git", "ssh_url": "git@github.com:xmpp-ftw/xmpp-ftw.git", "clone_url": "https://github.com/xmpp-ftw/xmpp-ftw.git", "svn_url": "https://github.com/xmpp-ftw/xmpp-ftw", "homepage": "https://xmpp-ftw.jit.su", "size": 10899, "stargazers_count": 123, "watchers_count": 123, "language": "JavaScript", "has_issues": true, "has_downloads": true, "has_wiki": true, "forks_count": 14, "mirror_url": null, "open_issues_count": 3, "forks": 14, "open_issues": 3, "watchers": 123, "default_branch": "master", "organization": { "login": "xmpp-ftw", "id": 5758950, "avatar_url": "https://avatars.githubusercontent.com/u/5758950?", "gravatar_id": "6c507da40850fc1c7db7abf898ba5af4", "url": "https://api.github.com/users/xmpp-ftw", "html_url": "https://github.com/xmpp-ftw", "followers_url": "https://api.github.com/users/xmpp-ftw/followers", "following_url": "https://api.github.com/users/xmpp-ftw/following{/other_user}", "gists_url": "https://api.github.com/users/xmpp-ftw/gists{/gist_id}", "starred_url": "https://api.github.com/users/xmpp-ftw/starred{/owner}{/repo}", "subscriptions_url": "https://api.github.com/users/xmpp-ftw/subscriptions", "organizations_url": "https://api.github.com/users/xmpp-ftw/orgs", "repos_url": "https://api.github.com/users/xmpp-ftw/repos", "events_url": "https://api.github.com/users/xmpp-ftw/events{/privacy}", "received_events_url": "https://api.github.com/users/xmpp-ftw/received_events", "type": "Organization", "site_admin": false }, "network_count": 14, "subscribers_count": 20}
})