$(function () {
    let data = null;

    function getData() {
        $('.content tbody').html('')
        data = JSON.parse(localStorage.getItem("show_data"));
        let tmp = template('tmp', data)
        $('.content tbody').append(tmp)
    }
    getData()

    //获取所有的删除选项
    let del = document.querySelectorAll('.delete')
    del.forEach((i, index) => {
        i.onclick = function () {
            layer.confirm('确认删除吗?', {
                icon: 3,
                title: '提示'
            }, function (del) {
                data.splice(index, 1)
                window.localStorage.setItem('show_data', JSON.stringify(data))
                getData()
                layer.close(del)
            })
        }
    })
    //获取当前数量框的数量
    let nu_num = document.querySelectorAll('.nu .num')
    //获取添加数量的按钮
    let nu_add = document.querySelectorAll('.nu .add')
    //获取减的按钮
    let nu_less = document.querySelectorAll('.nu .less')
    //获取总价格
    let ri_price = document.querySelectorAll('.right .price')
    //获取商品的总数
    let choose_mall = document.querySelector('.foot .numb')
    //获取结算按钮
    let settlement = document.querySelectorAll('.right .r_ri')
    //获取现价
    let new_price = document.querySelectorAll('.price .new_price')
    //获取原价
    let mon_price = document.querySelectorAll('.money .mon_price')
    //获取全选按钮
    let all_check = document.querySelectorAll('.all_check')
    let mall = document.querySelectorAll('.mall_check')
    let fo_de = document.querySelector('.fo_delete')
    let length = $('tbody tr').length
    // 通过获取商品选项的id长度  获取全部多少商品
    $('.head .left .number').text(length)
    //加号
    nu_add.forEach((i, index) => {
        i.onclick = function () {
            nu_num[index].innerText = parseInt(nu_num[index].innerText) + 1 //商品数量自增
            //获取当前数量下的价格
            mon_price[index].innerText = new_price[index].innerText * nu_num[index].innerText
            if (mon_price[index].innerText.indexOf('.') != -1) {
                mon_price[index].innerText = parseFloat(mon_price[index].innerText).toFixed(2)
            } else {
                mon_price[index].innerText = parseFloat(mon_price[index].innerText).toFixed(2)
            }
            if (mall[index].checked == true) {
                ri_price.forEach((i, index) => {
                    i.innerText = parseFloat(i.innerText) + parseFloat(new_price[index].innerText)
                    i.innerText = parseFloat(i.innerText).toFixed(2)
                })
            }
        }
    })
    //减号
    nu_less.forEach((i, index) => {
        i.onclick = function () {
            if (nu_num[index].innerText <= 1) {
                nu_num[index].innerText = 1
                mon_price[index].innerText = new_price[index].innerText * nu_num[index].innerText
                mon_price[index].innerText = parseFloat(mon_price[index].innerText).toFixed(2)
            } else {
                nu_num[index].innerText = nu_num[index].innerText - 1
                mon_price[index].innerText = new_price[index].innerText * nu_num[index].innerText
                mon_price[index].innerText = parseFloat(mon_price[index].innerText).toFixed(2)
            }
            if (mall[index].checked == true) {
                ri_price.forEach((i, index) => {
                    i.innerText = parseFloat(i.innerText) - parseFloat(new_price[index].innerText)
                    i.innerText = parseFloat(i.innerText).toFixed(2)
                })
            }
        }
    })
    settlement.forEach((i,index)=>{
        i.onclick=function(){
            window.location.href='../html/older.html'
        }
    })
    // 全选按钮
    all_check.forEach(i => {
        i.onclick = function () {
            // console.log(this.checked);
            for (var j = 0; j < all_check.length; j++) {
                all_check[j].checked = this.checked
            }
            for (var k = 0; k < mall.length; k++) {
                mall[k].checked = this.checked
            }
            if (i.checked == true) {
                ri_price.forEach(i => {
                    let c = 0
                    for (var m = 0; m < mon_price.length; m++) {
                        c += parseFloat(mon_price[m].innerText)
                    }
                    i.innerText = c.toFixed(2)
                })
                window.localStorage.setItem('shows', JSON.stringify(data))
                choose_mall.innerText = mall.length
                settlement.forEach(i => {
                    i.style.backgroundColor = '#FF5000'
                })
                fo_de.onclick = function () {
                    layer.confirm('确认删除吗?', {
                        icon: 3,
                        title: '提示'
                    }, function (del) {
                        window.localStorage.removeItem('shop_data')
                        $('.content tbody').html('')
                        layer.close(del)
                    })
                }
            } else {
                ri_price.forEach(i => {
                    i.innerText = '0.00'
                })
                choose_mall.innerText = 0
                settlement.forEach(i => {
                    i.style.backgroundColor = '#aaa'
                })
            }

        }
    })
        // 商品选项按钮对全选影响的判断
    function check() {
            var times = 0
            for (var i = 0; i < mall.length; i++) {
                if (mall[i].checked) {
                    times++
                }
            }
            if (times == mall.length) {
                for (var j = 0; j < all_check.length; j++) {
                    all_check[j].checked = true
                }
            } else {
                for (var j = 0; j < all_check.length; j++) {
                    all_check[j].checked = false
                }
            }
        }
    mall.forEach((i, index) => {
        i.onclick = function () {
            check()
            if (i.checked == true) {
                ri_price.forEach((i, index) => {
                    let c = 0
                    for (var m = 0; m < mon_price.length; m++) {
                        c += parseFloat(mon_price[m].innerText)
                    }
                    i.innerText = c.toFixed(2)
                    if (i.innerText.indexOf('.') != -1) {
                        i.innerText = parseFloat(i.innerText).toFixed(2)
                    } else {
                        i.innerText = parseFloat(i.innerText).toFixed(2)
                    }
                    console.log($('tbody tr'));
                })
                window.localStorage.setItem('shows', JSON.stringify(data))
                choose_mall.innerText = parseInt(choose_mall.innerText) + 1
                settlement.forEach(i => {
                    i.style.backgroundColor = "#FF5000"
                })
                fo_de.onclick = function () {
                    layer.confirm('确认删除吗?', {
                        icon: 3,
                        title: '提示'
                    }, function (del) {
                        data.splice(index, 1)
                        window.localStorage.setItem('show_data', JSON.stringify(data))
                        getData()
                        layer.close(del)
                    })
                    
                }
            } else {
                ri_price.forEach((i, index) => {
                    i.innerText = parseFloat(i.innerText) - parseFloat(mon_price[index].innerText)
                    i.innerText = parseFloat(i.innerText).toFixed(2)
                })
                choose_mall.innerText = parseInt(choose_mall.innerText) - 1
                if (choose_mall.innerText == 0) {
                    settlement.forEach(i => {
                        i.style.backgroundColor = "#aaa"
                    })
                }
            }
        }
    })
})