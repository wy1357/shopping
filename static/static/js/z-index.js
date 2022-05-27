$(function () {
    $('.evaluate').on('click', function () {
        $(this).toggleClass('after').siblings('.particulars').removeClass('after')
        $(this).parent('.m_t_top').next('.m_t_bottom').hide()
        $(this).parent('.m_t_top').parent('.middle_top').next('.cont1').hide()
        $(this).parent('.m_t_top').parent('.middle_top').next('.cont1').next('.cont2').hide()
    })
    $('.particulars').on('click', function () {
        $(this).toggleClass('after').siblings('.evaluate').removeClass('after')
        $(this).parent('.m_t_top').next('.m_t_bottom').show()
        $(this).parent('.m_t_top').parent('.middle_top').next('.cont1').show()
        $(this).parent('.m_t_top').parent('.middle_top').next('.cont1').next('.cont2').show()
    })

    let id, name;
    let str = location.href
    name = str.indexOf('?')
    id = str.substr(name + 1)
    //商品信息
    $.ajax({
        method: 'get',
        url: '/my/detail/details/' + id,
        data: {},
        success: (res) => {
            let dArr = []
            dArr.push(res.data)
            getTemplate('addDetails', dArr, '.l_right_cont')
        }
    })
    
    //商品颜色分类
    $.ajax({
        method: 'get',
        url: '/my/color/colorImg',
        data: {},
        success: (res) => {
            let data = res.data
            //用于存储当前id下的商品颜色分类
            let imgArr = []
            for (let x of data) {
                if (x.cate_id == id) {
                    imgArr.push(x)
                }
            }
            let number=1
            let showArr=[]
            let datArr=[]
            let val=parseInt($('.content4 .num .number').text())
            getTemplate('addColorImg', imgArr, '.classify_nav')
            let dram = document.querySelectorAll('.dram')
            Array.from(dram).forEach((i, index) => {
                $(i).on('click', function (e) {
                    var e = e || window.e
                    $(this).addClass('drams').siblings().removeClass('drams')
                    let imgArr = [] //存储商品图片的数组
                    let typeArr=[
                        '【黑色新升级Type-c数字芯片版 】 四核低音炮（扁口通用+带麦+音量键）',
                        '【白色新升级Type-c数字芯片版】 四核低音炮（扁口通用+带麦+音量键）',
                        '【黑色】四核低音炮（升级带麦调音版）',
                        '【黑色】四核低音炮（升级带麦调音版）',
                        '【白色】四核低音炮（升级带麦调音版）',
                        
                    ] //存储颜色分类的数组
                    
                    let color_img = $('.dram .picture').eq($(this).index()).attr('src')
                    let content = $('.content4 .top .p1').text()
                    let old_price=$('.content4 .old_price').text()
                    let new_price=$('.content4 .new_price').text()
                    let xb=color_img.indexOf('3')
                    let price=new_price*val+'.00'
                    let obj={
                        id:id,
                        color_img:color_img.substr(xb+4),
                        content:content,
                        type:typeArr[index],
                        old_price:old_price,
                        new_price:new_price,
                        num:val,
                        mon_price:price
                    }
                    let ls=localStorage.getItem('show_data')
                    if(ls) {
                        ls=JSON.parse(localStorage.getItem('show_data'))
                        ls.push(obj)
                        localStorage.setItem('show_data',JSON.stringify(ls))
                    }else {
                        showArr.push(obj)
                        localStorage.setItem('show_data',JSON.stringify(showArr))
                    }
                })
            })
            $('.m_top_top').on('click',function(){
                val+=number
                $('.content4 .num .number').text(val)
            })
            $('.s_bottom').on('click',function(){
                val--
                if(val<=1) {
                    val=1
                }
                $('.content4 .num .number').text(val)
            })
            $('.content2 .c_b_right').on('click', function () {
                layer.msg('加入购物车成功')
            })
            
            
            
            
            
        }
    })
    //商品展示图
    $.ajax({
        method: 'get',
        url: "/my/show/showImg",
        data: {},
        success: (res) => {
            let showArr = []
            let data = res.data
            for (let x of data) {
                if (x.cates_id == id) {
                    showArr.push(x.show_img)
                }
            }
            getTemplate('comShowImg', showArr, '.showImgs')
        }
    })
    //放大镜区域
    $.ajax({
        method: 'get',
        url: '/my/img/showSmall',
        data: {},
        success: (res) => {
            let data = res.data
            let smallArr = []
            for (let x of data) {
                if (x.small_id == id) {
                    smallArr.push(x)
                }
            }
            getTemplate('showSmall', smallArr, '.show-small-img')
        }
    })
    //大图
    $.ajax({
        method: 'get',
        url: '/my/img/showBig',
        data: {},
        success: (res) => {
            let data = res.data
            let bigArr = []
            for (let x of data) {
                if (x.big_id == id) {
                    bigArr.push(x)
                }
            }
            $('body').on('mousemove', '.show-small-img .nav', function () {
                $('.show-big-img').eq($(this).attr('data-id')).show().siblings().hide()
                $(this).addClass('border').siblings().removeClass('border')

            })
            getTemplate('showBig', bigArr, '.magnifying-glass')
            // //实现放大镜效果
            let left = document.querySelectorAll('.show-big-img')
            let right = document.querySelectorAll('.right-glass-r')
            // //获取遮罩层元素
            let mark = document.querySelectorAll('.mark')
            left.forEach((i, index) => {
                i.addEventListener('mouseover', function (event) {
                    var e = event || window.event
                    mark[index].style.display = 'block'
                    right[index].style.display = 'block'
                })
                i.addEventListener('mouseout', function (event) {
                    var e = event || window.event
                    mark[index].style.display = 'none'
                    right[index].style.display = 'none'
                })

            })
            let oLeft = 0,
                oTop = 0,
                x = 0,
                y = 0,
                m = 0,
                n = 0;
            mark.forEach((i, index) => {
                i.onmousedown = function (event) {
                    var e = event || window.event
                    x = e.clientX - this.offsetLeft;
                    y = e.clientY - this.offsetTop;
                    document.onmousemove = function (event) {
                        var e = event || window.event
                        oLeft = e.clientX - x
                        oTop = e.clientY - y
                        //判断临界值
                        if (oLeft <= 0) oLeft = 0
                        if (oLeft >= left[index].offsetWidth - i.offsetWidth) {
                            oLeft = left[index].offsetWidth - i.offsetWidth
                        }
                        if (oTop <= 0) oTop = 0
                        if (oTop >= left[index].offsetHeight - i.offsetHeight) {
                            oTop = left[index].offsetHeight - i.offsetHeight
                        }
                        m = -(parseInt(((i.offsetWidth + x) / right[index].offsetWidth) * oLeft))
                        n = -(parseInt(((i.offsetHeight + y) / right[index].offsetHeight) * oTop))
                        i.style.left = oLeft + 'px'
                        right[index].style.backgroundPositionX = m + 'px'
                        i.style.top = oTop + 'px'
                        right[index].style.backgroundPositionY = n + 'px'
                    }.bind(this)
                    document.onmouseup = function (e) {
                        document.onmousemove = null
                        document.onmouseup = null
                    }
                }

            })

        }
    })

    //封装引擎模板的方法
    function getTemplate(x, y, z) {
        let tmp = template(x, y)
        $(z).html(tmp)
    }


})