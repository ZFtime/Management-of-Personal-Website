export default class Http {
    /**
     * @param {options} 请求的参数对象
     * {
     *  url:'',
     *  method:'',
     *  data:{}
     * }
     */

    static Request(options) {
        return new Promise((resolve, reject) => {
            let url = options.url
            let methods = options.method || 'POST'
            let param = options.data || {}
            let xmlHttp = null
            if (XMLHttpRequest) {
                xmlHttp = new XMLHttpRequest()
            } else {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
            };
            let params = []
            for (var key in param) {
                if (!!param[key] || param[key] === 0) {
                    params.push(key + '=' + param[key])
                }
            };
            let postData = params.join('&')
            xmlHttp.timeout = 15000
            if (methods.toUpperCase() === 'POST') {
                xmlHttp.open('POST', url, true)
                xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
                xmlHttp.send(postData);
            } else if (methods.toUpperCase() === 'GET') {
                xmlHttp.open('GET', url + '?' + postData, true)
                xmlHttp.send(null)
            } else if (methods.toUpperCase() === 'DELETE') {
                xmlHttp.open('DELETE', url + '?' + postData, true)
                xmlHttp.send(null)
            }
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {
                    try {
                        if ((xmlHttp.status >= 200 && xmlHttp.status < 300) || xmlHttp.status === 304) {
                            resolve(JSON.parse(xmlHttp.responseText))
                        } else {
                            resolve('Request was unsuccessful:' + xmlHttp.status)
                        }
                    } catch (error) {
                        reject(error)
                    }
                }
            }
        })
    }
}