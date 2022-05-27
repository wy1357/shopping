$.ajax({
    method: 'get',
    url: '/my/product/products',
    success: (res) => {
        let data = res.data
        //存储入耳式耳机商品展示的空数组
        let earArr = [];
        let sArr = [];

        //存储推荐商品的空数组
        let tArr = []
        let jArr = []
        for (let x of data) {
            if (x.type_name == '入耳式耳机') {
                earArr.push(x)
            } else if (x.type_name == '推荐') {
                tArr.push(x);
            }
        }
        //入耳式耳机商品展示
        for (let i = 0; i < earArr.length;) {
            sArr.push(earArr.splice(0, i + 4))
        }
        getCommodity(sArr, '.cont-top-nav')

        //商品推荐
        for (let i = 0; i < tArr.length;) {
            jArr.push(tArr.splice(0, i + 4))
        }
        getCommodity(jArr, '.cont-bottom-nav')
    }
})

function getCommodity(x, y) {
    let tmp = template('colorImg', x)
    $(y).html(tmp)
}
// 1. 定义延时器的Id
var timer = null
// 定义全局缓存对象
var cacheObj = {}

// 2. 定义防抖的函数
function debounceSearch(kw) {
    timer = setTimeout(function () {
        getSuggestList(kw)
    }, 500)
}

// 为输入框绑定 keyup 事件
$('.container .content1 .search').on('keyup', function () {
    // 3. 清空 timer
    clearTimeout(timer)
    var keywords = $(this).val().trim()
    if (keywords.length <= 0) {
        return $('#suggest-list').empty().hide()
    }

    // 先判断缓存中是否有数据
    if (cacheObj[keywords]) {
        return renderSuggestList(cacheObj[keywords])
    }

    // TODO:获取搜索建议列表
    // console.log(keywords)
    // getSuggestList(keywords)
    debounceSearch(keywords)
})

function getSuggestList(kw) {
    $.ajax({
        method: 'get',
        url: '/my/product/products/' + kw,
        success: function (res) {
            let data = res.data
                let earArr = []
                let aArr = []
                for (let x of data) {
                    if (x.type_name == '入耳式耳机') {
                        earArr.push(x)
                    }
                }
                for (let i = 0; i < earArr.length;) {
                    aArr.push(earArr.splice(0, i + 4))
                }
                getCommodity(aArr, '.cont-top-nav')


        }
    })
}
let li = document.querySelectorAll('.content2_right .nav .navs')
li.forEach((i, index) => {
    $(i).on('click', function () {
        let text = $(this).text()
        if (text == '入耳式') {
            getSuggestList(text)
        } else if (text == '蓝牙耳机') {
            getSuggestList(text)
        } else if (text == '耳塞式') {
            getSuggestList(text)
        } else if (text == '挂耳式') {
            getSuggestList(text)
        } else if (text == '运动耳机') {
            $('.cont-top-nav').html(`<div>暂无商品</div>`)
        } else if (text == '金属耳机') {
            $('.cont-top-nav').html(`<div>暂无商品</div>`)
        }

    })
});