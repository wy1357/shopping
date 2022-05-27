 //获取导航的数据
 $.ajax({
    method: 'get',
    url: '/my/cate/getClassify',
    data: {},
    success: (res) => {
        let tmp = template('navClassify', res)
        $('.cont_nav').html(tmp)
        $('body').on('click', '.classify', function () {
            let id = $(this).attr('data-id')
            if (id == 1) {
                window.location.href = 'inEar.html'
            } else if (id == 2) {
                window.location.href = 'bluetooth.html'
            } else if (id == 3) {
                window.location.href = 'mountings.html'
            } else if (id == 4) {
                window.location.href = 'course.html'
            } else if (id == 5) {
                window.location.href = 'brand.html'
            }
        })
    }
})