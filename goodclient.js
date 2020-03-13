const _inner46f002m = {
    _onAccepts: [],
    _onUndeclareds: [],
    _onOptIns: [],
    _goodCookieURL: 'http://localhost:5555/verify',
    _bounceURL: 'http://localhost:5555/verify/bounce',
    _optURL: 'http://localhost:1234',
    _listenForPost: function(){
        window.onmessage = event => {
            if(event.data === 'OUR-GOOD-USER-HAS-ACCEPTED-ALL-COOKIES-ON-ALL-WEBSITES'){
                this._runOnOptIns()
                this._runOnAccepts()
            }
        }
    },
    _runOnOptIns: function(args = undefined){
        this._onOptIns.forEach(onOptIn => onOptIn(args))
    },
    _runOnAccepts: function(args = undefined){
        this._onAccepts.forEach(onAccept => onAccept(args))
    },
    _runOnUndeclareds: function(args = undefined) {
        this._onUndeclareds.forEach(onUndeclared => onUndeclared(args))
    }
}
const goodClient = {
    verify: async () => {
        return new Promise((fulfill, reject) => {
            const request = new XMLHttpRequest()
            request.open('get', _inner46f002m._goodCookieURL)
            request.onreadystatechange = () => {
                if(request.readyState === XMLHttpRequest.DONE){
                            let {'user-accepts-all-cookies-on-all-sites': accepted} = JSON.parse(request.responseText)
                            if(accepted){
                                _inner46f002m._runOnAccepts()
                            } else {
                                _inner46f002m._runOnUndeclareds()
                            }
                        }
                    }
            request.send()
        })
    },
    verifyBounce: (acceptURL, UndeclaredURL) => {
        const   accept = encodeURI(acceptURL),
                undeclared = encodeURI(UndeclaredURL)
        window.location.replace(`${_inner46f002m._bounceURL}?acceptURL=${accept}?undeclaredURL=${undeclaredURL}`)
    },
    optIn: (senderDomain) => {
        const  domain = encodeURI(senderDomain)
        _inner46f002m._listenForPost()
        let _optWindow = window.open(`${_inner46f002m._optURL}?senderDomain=${domain}}`)
        _optWindow.postMessage('the-secret-word-is-pastamarmalade')
    },
    onUndeclared: (...args) => {
        args && args.forEach(arg => _inner46f002m._onUndeclareds.push(arg))
    },
    onAccept: (...args) => {
        args && args.forEach(arg => _inner46f002m._onAccepts.push(arg))
    },
    onOptIn: (...args) => {
        args && args.forEach(arg => _inner46f002m._onOptIns.push(arg))
    },
    config: (options) => {
        //do stuff based on options
        return options
    }
}