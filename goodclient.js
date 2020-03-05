const _inner46f002m = {
    _accepts: [],
    _declines: [],
    _goodCookieURL: 'http://localhost:5555/verify',
    _bounceURL: 'http://localhost:5555/verify/bounce',
    _optURL: 'http://localhost:5555/opt/in/bounce',
    _runAccepts: function(args = undefined){
        this._accepts.forEach( accept => accept(args))
    },
    _runDeclines: function(args = undefined) {
        this._declines.forEach(decline => decline(args))
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
                                _inner46f002m._runAccepts()
                            } else {
                                _inner46f002m._runDeclines()
                            }
                        }
                    }
            request.send()
        })
    },
    verifyBounce: (acceptURL, declineURL) => {
        const   accept = encodeURI(acceptURL),
                decline = encodeURI(declineURL)
        window.location.replace(`${_inner46f002m._bounceURL}?acceptURL=${accept}?declineURL=${declineURL}`)
    },
    optIn: (acceptURL, declineURL) => {
        const   accept = encodeURI(acceptURL),
                decline = encodeURI(declineURL)
        window.open(`${_inner46f002m._optURL}?acceptURL=${accept}?declineURL=${declineURL}`)
    },
    onDecline: (...args) => {
        args && args.forEach(arg => _inner46f002m._declines.push(arg))
    },
    onAccept: (...args) => {
        args && args.forEach(arg => _inner46f002m._accepts.push(arg))
    }
}