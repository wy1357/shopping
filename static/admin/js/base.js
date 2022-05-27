$.ajaxPrefilter(function (opt) {
    opt.url = 'http://localhost:3000' + opt.url
    if(opt.url.indexOf('/my/')!==-1) {
        opt.headers = {
            Authorization: localStorage.getItem('token') || ''
          }
    } 
});