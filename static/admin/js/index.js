//封装获取用户信息的函数
function getUser() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        data: {},
        success: (res) => {
            let data = res.data
            getInfo(data)
            getPic(data)
        }
    })
}
//获取头像
function getPic(data) {
    if (data.user_pic != null) {
        $('#trans_pic img').attr('src', data.user_pic)
        // 头部区域
        $('#header-avatar').html(`<img src="${data.user_pic}" class="layui-nav-img">个人中心`)
        // 侧边栏区域
        $('.user-info-box').html(`<img src="${data.user_pic}" class="layui-nav-img">
     <span class="welcome">&nbsp;欢迎&nbsp; ${data.nickname || data.username}</span>`)
    } else {
        // 头部区域
        $('#header-avatar').html(`
     <div class="text-avatar">${data.username.slice(0,1)}</div>
     个人中心`)
        // 侧边栏区域
        $('.user-info-box').html(`
     <div class="text-avatar">${data.username.slice(0,1)}</div>
     <span class="welcome">&nbsp;欢迎&nbsp; ${data.username}</span>`)
        if (data.nickname != null) {
            // 头部区域
            $('#header-avatar').html(`
        <div class="text-avatar">${data.nickname.slice(0,1)}</div>
        个人中心`)
            $('.user-info-box').html(`
      <div class="text-avatar">${data.nickname.slice(0,1)}</div>
      <span class="welcome">&nbsp;欢迎&nbsp; ${data.nickname}</span>`)
        }
    }
}

function getInfo(data) {
    layui.form.val('user-form', data)
}
$(function () {
    let $image, options;
    $('#transform a').on('click', function () {
        let id = $(this).attr('data-id')
        $('#' + id).show().siblings('.layui-body').hide()
        if (id == 'avatar') {
            // 1.1 获取裁剪区域的 DOM 元素  
            $image = $('#image')
            // 1.2 配置选项  
            options = {
                // 纵横比    
                aspectRatio: 1,
                // 指定预览区域    
                preview: '.img-preview'
            }
            // 1.3 创建裁剪区域  
            $image.cropper(options)
        }
    })
    layui.form.verify({
        nickname: [/^\S{3,10}$/, '昵称的长度为3-10的非空字符串'],
        samePwd: function (e) {
            if (e == $('#formUpdatePwd [name=oldPwd]').val()) {
                layer.msg('新密码不能与原密码一致')
            }
        },
        repwd: function (e) {
            if (e !== $('#formUpdatePwd [name=newPwd]').val()) {
                layer.msg('两次输入的密码不一致')
            }
        }
    })
    getUser()
    $('.logout').click(function () {
        layer.confirm('是否退出?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            localStorage.removeItem('token')
            window.location.href = '../html/enter&register.html'
            layer.close(index);
        });
    })
    //监听提交修改的表单提交
    $('#layui-form').on('submit', function (event) {
        var e = event || window.event
        e.preventDefault()
        $.ajax({
            method: "post",
            url: '/my/userinfo',
            data: {
                id: $('#layui-form [name=id]').val(),
                nickname: $('#layui-form [name=nickname]').val(),
                email: $('#layui-form [name=email]').val()
            },
            success: (res) => {
                if (res.status == 0) {
                    layer.msg(res.message)
                }
            }
        })
    })
    //重置用户信息
    $('#layui-form #reset').on('click', function (event) {
        var e = event || window.event
        e.preventDefault()
        getUser()
    })

    //上传头像
    $('#btnChooseImg').on('click', function (e) {
        e.preventDefault()
        $('#file_pic').click()
    })



    //监听文件是否发生变化
    $("#file_pic").on('change', function (e) {
        let file;
        let files = e.target.files
        file = files[0]
        if (file.length == 0) {
            layer.msg('请选择要上传的头像')
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域   
            .attr('src', newImgURL) // 重新设置图片路径   
            .cropper(options) // 重新初始化裁剪区域
    })
    $('#btnUploadImg').on('click', function (e) {
        e.preventDefault()
        if (!file) {
            layer.msg('请上传头像')
        }
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布        
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: (res) => {
                if (res.status == 0) {
                    getUser()
                    layer.msg(res.message)

                }
            }
        })
    })

    //监听重置密码
    $('#formUpdatePwd').on('submit', function (event) {
        var e = event || window.event
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status == 0) {
                    layer.msg(res.message)
                    setTimeout(function () {
                        window.location.href = '../html/enter&register.html'
                    }, 2000)
                } else {
                    layer.msg('原密码错误')
                }
            }
        })
    })
    $('#resetPwd').on('click', function (e) {
        e.preventDefault()
        $('#formUpdatePwd [name=re_pwd]').val('')
        $('#formUpdatePwd [name=newPwd]').val('')
        $('#formUpdatePwd [name=oldPwd]').val('')
    })
    //上传轮播图
    $('body').on('click', '#form-pub #select_img', function (e) {
        e.preventDefault()
        //模拟点击选择文件
        $('#form-pub #files').click()
    })
    let file, url, cate_file;

    //封装选择多个文件上传的方法
    function getFile(File, box) {
        let imgs = []
        file = File.files
        for (let i = 0; i < file.length; i++) {
            let url = new FileReader()
            url.readAsDataURL(file[i])
            url.onload = function () {
                document.querySelector(box).innerHTML += `<img src="${url.result}" alt="">`
            }
            imgs.push(file[i])
        }
    }
    //监听文件内容的变化
    $('body').on('change', '#form-pub #files', function (e) {
        getFile($(this)[0], '.img_preview')
    })
    $('body').on('submit', '#form-pub', function (event) {
        var e = event || window.event
        e.preventDefault()
        if (!file) {
            layer.msg('请上传图片')
        }
        for (let i in file) {
            if (i !== 'length' && i !== 'item') {
                let type = $('#manage [name=type]').val()
                let fd = new FormData()
                fd.append('type', type)
                fd.append('cover_img', file[i])
                fd.forEach((i,index)=>{
                    console.log(i);
                })
                $.ajax({
                    method: "post",
                    url: '/my/slideshow/addSlides',
                    data: fd,
                    // 发送的数据类型
                    contentType: false,
                    // 对 formData 进行解析 
                    processData: false,
                    success: (res) => {
                        if (res.status == 0) {
                            layer.msg(res.message)
                        }
                    }
                })
            }
        }
    })
    //更换轮播
    let handleCont;
    $('body').on('click', '.updateInfo', function () {
        let id = $(this).attr('data-id')
        //使用弹出层
        handleCont = layer.open({
            type: 1, //基本层类型
            title: '轮播更新', //标题
            area: ['100%', '100%'], //给弹出层设置宽高
            content: $('#banner-popup').html() //添加引擎模板
        })
        $.ajax({
            url: '/my/slideshow/cateSlides/' + id,
            method: 'get',
            success: (res) => {
                let data = res.data
                if (res.status == 0) {
                    let obj = {
                        id: data.id,
                        type: data.type
                    }
                    layui.form.val('form-update', obj)
                    layer.msg(res.message)
                }
            }
        })
    })
    //监听更换图片按钮
    $('body').on('click', '#form-edit #select_popup_img', function (e) {
        e.preventDefault()
        //模拟点击选择文件
        $('#form-edit #popup-files').click()
    })
    //监听文件内容的变化
    $('body').on('change', '#form-edit #popup-files', function (e) {
        selectImg(this, '.popup_pic')
    })
    $('body').on('submit', '#form-edit', function (event) {
        var e = event || window.event
        e.preventDefault()
        let type = $('#form-edit [name=type]').val()
        let id = $('#form-edit [name=id]').val()
        let fd = new FormData()
        fd.append('id', id)
        fd.append('type', type)
        fd.append('cover_img', cate_file)
        $.ajax({
            method: "post",
            url: '/my/slideshow/updateSlides',
            data: fd,
            // 发送的数据类型
            contentType: false,
            // 对 formData 进行解析 
            processData: false,
            success: (res) => {
                if (res.status == 0) {
                    layer.msg(res.message)
                    layer.close(handleCont)
                    cataList()
                }
            }
        })
    })
    //展示轮播数据
    cataList()
    //数据初始化
    function cataList() {
        $.ajax({
            method: 'get',
            url: '/my/slideshow/slides',
            data: {},
            success: (res) => {
                let tmp = template('banner_type', res)
                $('#banner-handle tbody').html(tmp)
            }
        })
    }
    //删除轮播数据
    $('tbody').on('click', '.deleteInfo', function () {
        let id = $(this).attr('data-id')
        layer.confirm('确认删除吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/slideshow/slides/' + id,
                success: (res) => {
                    if (res.status == 0) {
                        layer.msg(res.message)
                        cataList()
                    }
                }
            })
            layer.close(index)
        })
    })

    //商品分类管理区域

    //选择图片
    $('#cate_select_img').on('click', function (e) {
        e.preventDefault()
        $('#cate-form-pub #cate-files').click()
    })

    //封装选择图片上传的方法
    function selectImg(File, cateBox) {
        cate_file = File.files[0]
        url = URL.createObjectURL(cate_file)
        $(cateBox).attr('src', url)
    }
    //监听内容的改变
    $('#cate-form-pub #cate-files').on('change', function (e) {
        selectImg(this, '.cate_pic')
    })
    //监听添加导航分类
    $('#cate').on('submit', '#cate-form-pub', function (e) {
        e.preventDefault()
        let cate_name = $('#cate [name=cate_name]').val()
        let fd = new FormData()
        fd.append('cate_img', cate_file)
        fd.append('cate_name', cate_name)
        $.ajax({
            method: 'post',
            url: '/my/cate/addClassify',
            data: fd,
            // 发送的数据类型
            contentType: false,
            // 对 formData 进行解析 
            processData: false,
            success: (res) => {
                if (res.status == 0) {
                    layer.msg(res.message)
                }
            }
        })
    })
    //商品分类的操作
    //展示导航分类数据
    getType()
    //数据初始化
    function getType() {
        $.ajax({
            method: 'get',
            url: '/my/cate/getClassify',
            data: {},
            success: (res) => {
                let tmp = template('nav_type_data', res)
                $('#cate-handle tbody').html(tmp)
            }
        })
    }
    //删除导航分类数据
    $('tbody').on('click', '.deleteNav', function () {
        let id = $(this).attr('data-id')
        layer.confirm('确认删除吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/cate/deleteClassify/' + id,
                success: (res) => {
                    if (res.status == 0) {
                        layer.msg(res.message)
                        getType()
                    }
                }
            })
            layer.close(index)
        })
    })
    //修改导航分类数据
    let navCont=null;
    $('body').on('click', '.updateNav', function () {
        let id = $(this).attr('data-id')
        //使用弹出层
        navCont = layer.open({
            type: 1, //基本层类型
            title: '轮播更新', //标题
            area: ['640px', '640px'], //给弹出层设置宽高
            content: $('#new-type-popup').html() //添加引擎模板
        })
        $.ajax({
            url: '/my/cate/Classify/' + id,
            method: 'get',
            success: (res) => {
                let data = res.data
                if (res.status == 0) {
                    let obj = {
                        id: data.id,
                        cate_name: data.cate_name
                    }
                    layui.form.val('form-update', obj)
                    layer.msg(res.message)
                }
            }
        })
    })
    //监听更换图片按钮
    $('body').on('click', '#new-type-pub #nav_select_img', function (e) {
        e.preventDefault()
        //模拟点击选择文件
        $('#new-type-pub #nav-files').click()
    })
    //监听文件内容的变化
    $('body').on('change', '#new-type-pub #nav-files', function (e) {
        selectImg(this, '.nav_pic')
    })
    $('body').on('submit', '#new-type-pub', function (event) {
        var e = event || window.event
        e.preventDefault()
        let cate_name = $('#new-type-pub [name=cate_name]').val()
        let id = $('#new-type-pub [name=id]').val()
        let fd = new FormData()
        fd.append('id', id)
        fd.append('cate_name', cate_name)
        fd.append('cate_img', cate_file)
        $.ajax({
            method: "post",
            url: '/my/cate/updateClassify',
            data: fd,
            // 发送的数据类型
            contentType: false,
            // 对 formData 进行解析 
            processData: false,
            success: (res) => {
                if (res.status == 0) {
                    layer.msg(res.message)
                    layer.close(navCont)
                    getType()
                }
            }
        })
    })
    //商品管理区域
    getClassifyData()
    //选择图片
    $('#select_imgs').on('click', function (e) {
        e.preventDefault()
        $('#news_publish #add_files').click()
    })
    //监听文件内容的改变
    $('#news_publish #add_files').on('change', function (e) {
        //调用将文件转化格式的方法
        selectImg(this, '.commodity-pic')
    })
    //监听添加商品信息的表单
    $('#test').on('submit', '#news_publish', function (e) {
        e.preventDefault()
        if (!cate_file) {
            layer.msg('请上传商品图片')
        }
        let fd = new FormData($(this)[0])
        $.ajax({
            method: 'post',
            url: '/my/product/addProduct',
            data: fd,
            // 发送的数据类型
            contentType: false,
            // 对 formData 进行解析 
            processData: false,
            success: (res) => {
                if (res.status == 0) {
                    layer.msg(res.message)
                }
            }
        })
    })

    function getClassifyData() {
        $.ajax({
            method: 'get',
            url: '/my/cate/getClassify',
            data: {},
            success: (res) => {
                if (res.status !== 0) {
                    layer.msg(res.message)
                }
                let tmp = template('commodityManage', res)
                $('body [name=type_name]').html(tmp)
                //更新渲染页面
                layui.form.render()
            }
        })
    }
    //商品的管理操作
    getCommodity()
    //数据初始化
    function getCommodity() {
        $.ajax({
            method: 'get',
            url: '/my/product/products',
            data: {},
            success: (res) => {
                let tmp = template('commodity_type_data', res)
                $('#commodity-handle tbody').html(tmp)
            }
        })
    }
     //删除商品数据
     $('tbody').on('click', '.deleteCommodity', function () {
        let id = $(this).attr('data-id')
        layer.confirm('确认删除吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/product/deleteProduct/' + id,
                success: (res) => {
                    if (res.status == 0) {
                        layer.msg(res.message)
                        getCommodity()
                    }
                }
            })
            layer.close(index)
        })
    })
    let comCont;
    $('body').on('click', '.updateCommodity', function () {
        let id = $(this).attr('data-id')
        //使用弹出层
        comCont = layer.open({
            type: 1, //基本层类型
            title: '商品更新', //标题
            area: ['100%', '100%'], //给弹出层设置宽高
            content: $('#commodity-type-popup').html() //添加引擎模板
        })
        $.ajax({
            url: '/my/product/products/' + id,
            method: 'get',
            success: (res) => {
                let data = res.data
                if (res.status == 0) {
                    let obj = {
                        id: data.id,
                        type_name: data.type_name,
                        price:data.price,
                        content:data.content
                    }
                    layui.form.val('form-update', obj)
                    layer.msg(res.message)
                }
            }
        })
    })
     //监听更换图片按钮
     $('body').on('click', '#commodity-type-pub #commodity_select_imgs', function (e) {
        e.preventDefault()
        //模拟点击选择文件
        $('#commodity-type-pub #commodity_files').click()
    })
    //监听文件内容的变化
    $('body').on('change', '#commodity-type-pub #commodity_files', function (e) {
        selectImg(this, '.update-commodity-pic')
    })
    $('body').on('submit', '#commodity-type-pub', function (event) {
        var e = event || window.event
        e.preventDefault()
        let fd = new FormData($(this)[0])
        $.ajax({
            method: "post",
            url: '/my/product/updateProduct',
            data: fd,
            // 发送的数据类型
            contentType: false,
            // 对 formData 进行解析 
            processData: false,
            success: (res) => {
                if (res.status == 0) {
                    layer.msg(res.message)
                    layer.close(comCont)
                    getCommodity()
                }
            }
        })
    })
    //商品颜色分类区

    $('#color_select_img').on('click', function (e) {
        e.preventDefault()
        $('#color-files').click()
    })
    $('#color-files').on('change', function () {
        //调用上传多个文件的方法
        getFile($(this)[0], '.color_preview')
    })
    $('#color-classify').on('submit', '#color-form-pub', function (event) {
        var e = event || window.event
        e.preventDefault()
        if (!file) {
            layer.msg('请上传图片')
        }
        let cate_id = $('#color-form-pub [name=cate_id]').val()
        for (let i in file) {
            if (i !== 'length' && i !== 'item') {
                let fd = new FormData()

                fd.append('cate_id', cate_id)
                fd.append('color_type', file[i])
                $.ajax({
                    method: "post",
                    url: '/my/color/addColorImg',
                    data: fd,
                    // 发送的数据类型
                    contentType: false,
                    // 对 formData 进行解析 
                    processData: false,
                    success: (res) => {
                        if (res.status == 0) {
                            layer.msg(res.message)
                        }
                    }
                })
            }
        }
    })
    //商品详情区域
    getinform()
    //封装获取商品介绍的方法
    function getinform() {
        $.ajax({
            method: 'get',
            url: '/my/product/products',
            success: (res) => {
                let tmp = template('detailsManage', res)
                $('#details #de_content').html(tmp)
                layui.form.render()
            }
        })
    }
    
    //监听添加商品详情的表单提交
    $('#details').on('submit', '#add-detailsInfo', function (event) {
        var e = event || window.event
        e.preventDefault()
        let content = $('#details [name=content]').val()
        let product_gn = $('#details [name=product_gn]').val()
        let old_price = $('#details [name=old_price]').val()
        let new_price = $('#details [name=new_price]').val()
        $.ajax({
            method: 'post',
            url: '/my/detail/addDetails',
            data: {
                content,
                product_gn,
                old_price,
                new_price
            },
            success: (res) => {
                if (res.status == 0) {
                    layer.msg(res.message)
                    $('#details [name=product_gn]').html('')
                    $('#details [name=old_price]').val('')
                    $('#details [name=new_price]').val('')
                }
            }
        })
    })
    //商品颜色管理操作
    //展示商品颜色分类数据
    getColor()
    //数据初始化
    function getColor() {
        $.ajax({
            method: 'get',
            url: '/my/color/colorImg',
            data: {},
            success: (res) => {
                let tmp = template('color_type_data', res)
                $('#color-classify-handle tbody').html(tmp)
            }
        })
    }
     //删除商品颜色分类数据
     $('tbody').on('click', '.deleteColor', function () {
        let id = $(this).attr('data-id')
        layer.confirm('确认删除吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/color/deleteColorImg/' + id,
                success: (res) => {
                    if (res.status == 0) {
                        layer.msg(res.message)
                        getColor()
                    }
                }
            })
            layer.close(index)
        })
    })
     //修改商品颜色分类数据
     let colorCont;
     $('body').on('click', '.updateColor', function () {
         let id = $(this).attr('data-id')
         //使用弹出层
         colorCont = layer.open({
             type: 1, //基本层类型
             title: '轮播更新', //标题
             area: ['640px', '640px'], //给弹出层设置宽高
             content: $('#color-type-popup').html() //添加引擎模板
         })
         $.ajax({
             url: '/my/color/colorImg/' + id,
             method: 'get',
             success: (res) => {
                 let data = res.data
                 if (res.status == 0) {
                     let obj = {
                         id: data.id,
                         cate_id: data.cate_id
                     }
                     layui.form.val('form-update', obj)
                     layer.msg(res.message)
                 }
             }
         })
     })
     //监听更换图片按钮
    $('body').on('click', '#color-type-pub #color_type_img', function (e) {
        e.preventDefault()
        //模拟点击选择文件
        $('#color-type-pub #type-files').click()
    })
    //监听文件内容的变化
    $('body').on('change', '#color-type-pub #type-files', function (e) {
        selectImg(this, '.color_pic')
    })
    $('body').on('submit', '#color-type-pub', function (event) {
        var e = event || window.event
        e.preventDefault()
        let cate_id = $('#color-type-pub [name=cate_id]').val()
        let id = $('#color-type-pub [name=id]').val()
        let fd = new FormData()
        fd.append('id', id)
        fd.append('cate_id', cate_id)
        fd.append('color_type', cate_file)
        $.ajax({
            method: "post",
            url: '/my/color/updateColorImg',
            data: fd,
            // 发送的数据类型
            contentType: false,
            // 对 formData 进行解析 
            processData: false,
            success: (res) => {
                if (res.status == 0) {
                    layer.msg(res.message)
                    layer.close(colorCont)
                    getColor()
                }
            }
        })
    })
    //商品详情展示图区域
    $('#select-show-img').on('click', function (e) {
        e.preventDefault()
        $('#show-img-files').click()
    })
    $('#show-img-files').on('change', function () {
        //调用上传多个文件的方法
        getFile($(this)[0], '.showImg_preview')
    })
    $('#show-img').on('submit', '#show-img-pub', function (event) {
        var e = event || window.event
        e.preventDefault()
        let cates_id = $('#show-img [name=cates_id]').val()
        for (let i in file) {
            if (i !== 'length' && i !== 'item') {
                let fd = new FormData()
                fd.append('cates_id', cates_id)
                fd.append('show_img', file[i])
                $.ajax({
                    method: "post",
                    url: '/my/show/addShowImg',
                    data: fd,
                    // 发送的数据类型
                    contentType: false,
                    // 对 formData 进行解析 
                    processData: false,
                    success: (res) => {
                        if (res.status == 0) {
                            layer.msg(res.message)
                        }
                    }
                })
            }
        }

    })

    //小图
    $('#select-show-small-img').on('click', function (e) {
        e.preventDefault()
        $('#small-img-files').click()
    })
    $('#small-img-files').on('change', function () {
        //调用上传多个文件的方法
        getFile($(this)[0], '.small-showImg-preview')
    })
    $('#show-img').on('submit', '#show-img-small', function (event) {
        var e = event || window.event
        e.preventDefault()
        let small_id = $('#show-img [name=small_id]').val()
        for (let i in file) {
            if (i !== 'length' && i !== 'item') {
                let fd = new FormData()
                fd.append('small_id', small_id)
                fd.append('small_img', file[i])
                $.ajax({
                    method: "post",
                    url: '/my/img/addShowSmall',
                    data: fd,
                    // 发送的数据类型
                    contentType: false,
                    // 对 formData 进行解析 
                    processData: false,
                    success: (res) => {
                        if (res.status == 0) {
                            layer.msg(res.message)
                        }
                    }
                })
            }
        }

    })
    //大图
    $('#select-show-big-img').on('click', function (e) {
        e.preventDefault()
        $('#big-img-files').click()
    })
    $('#big-img-files').on('change', function () {
        //调用上传多个文件的方法
        getFile($(this)[0], '.big-showImg-preview')
    })
    $('#show-img').on('submit', '#show-img-big', function (event) {
        var e = event || window.event
        e.preventDefault()
        let big_id = $('#show-img [name=big_id]').val()
        for (let i in file) {
            if (i !== 'length' && i !== 'item') {
                let fd = new FormData()
                fd.append('big_id', big_id)
                fd.append('big_img', file[i])
                $.ajax({
                    method: "post",
                    url: '/my/img/addShowBig',
                    data: fd,
                    // 发送的数据类型
                    contentType: false,
                    // 对 formData 进行解析 
                    processData: false,
                    success: (res) => {
                        if (res.status == 0) {
                            layer.msg(res.message)
                        }
                    }
                })
            }
        }

    })
})