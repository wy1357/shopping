let data = JSON.parse(window.localStorage.getItem('shows'))
let tmp = template('tmp', data)
$('.or_content .order_info tbody').append(tmp)
let price = document.querySelectorAll('.price')
let mon_price = document.querySelector('.mon_price')
price.forEach((i, index) => {
    i.innerText = data[0].mon_price
})
let nu_num = document.querySelector('.nu .num')
let nu_add = document.querySelectorAll('.nu .add')
let nu_less = document.querySelectorAll('.nu .less')
let new_price = document.querySelector('.new_price')
let add_adress = document.querySelector('#add_adress')
let control_adress = document.querySelector('#control_adress')
let shengs = document.querySelectorAll('.shengs')
let shis = document.querySelectorAll('.shis')
let area = document.querySelectorAll('.area')
let name = document.querySelectorAll('.name')
let phone = document.querySelectorAll('.u_num')
// 点击+号
//加号
nu_add.forEach((i, index) => {
    i.onclick = function () {
        nu_num.innerText = parseInt(nu_num.innerText) + 1
        mon_price.innerText = new_price.innerText * nu_num.innerText
        mon_price.innerText = parseFloat(mon_price.innerText).toFixed(2)
        price.forEach((i, index) => {
            i.innerText = mon_price.innerText
        })
    }
})
nu_less.forEach((i, index) => {
    i.onclick = function () {
        if (nu_num.innerText <= 1) {
            nu_num.innerText = 1
            mon_price.innerText = new_price.innerText * nu_num.innerText
            mon_price.innerText = parseFloat(mon_price.innerText).toFixed(2)
            price.forEach((i, index) => {
                i.innerText = mon_price.innerText
            })
        } else {
            nu_num.innerText = nu_num.innerText - 1
            mon_price.innerText = new_price.innerText * nu_num.innerText
            mon_price.innerText = parseFloat(mon_price.innerText).toFixed(2)
            price.forEach((i, index) => {
                i.innerText = mon_price.innerText
            })
        }
    }
})

// 点击新增收货地址
add_adress.onclick = function () {
    //使用弹出层
    var tc = addCont = layer.open({
        type: 1, //基本层类型
        title: '选择地址', //标题
        area: ['500px', '250px'], //给弹出层设置宽高
        content: $('#tmp-add').html() //添加引擎模板
    })
    var sheng = document.querySelector('.sheng')
    var shi = document.querySelector('.shi')
    var qu = document.querySelector('.qu')
    var shengArr = ['江西省', '福建省'];
    var shiArr = [
        ['上饶市', '南昌市', '九江市'],
        ['厦门市', '泉州市', '福州市']
    ];
    var quArr = [
        [
            ['玉山县', '上饶县', '铅山县'],
            ['东湖区', '西湖区', '红谷滩区'],
            ['都昌县', '彭泽县', '修水县']
        ],
        [
            ['湖里区', '海沧区', '集美区'],
            ['丰泽区', '洛江区', '泉港区'],
            ['台江区', '晋安区', '长乐区']
        ]
    ];

    function cra(a, b) {
        a.forEach(function (i) {
            var opt = document.createElement('option')
            opt.innerHTML = i
            opt.value = i
            b.appendChild(opt)
        })
    }
    cra(shengArr, sheng)
    var sheng_index = sheng.selectedIndex
    cra(shiArr[sheng_index], shi)
    var shi_index = shi.selectedIndex
    cra(quArr[sheng_index][shi_index], qu)
    sheng.onchange = function () {
        shi.innerHTML = ''
        qu.innerHTML = ''
        sheng_index = this.selectedIndex
        cra(shiArr[sheng_index], shi)
        shi_index = shi.selectedIndex
        cra(quArr[sheng_index][shi_index], qu)
    }
    shi.onchange = function () {
        qu.innerHTML = ''
        sheng_index = sheng.selectedIndex
        shi_index = shi.selectedIndex
        cra(quArr[sheng_index][shi_index], qu)
    }
    // 点击确认
    $('button').click(function () {
        shengs.forEach(i => {
            i.innerText = $('.sheng').val()
        })
        shis.forEach(i => {
            i.innerText = $('.shi').val()
        })
        area.forEach(i => {
            i.innerText = $('.qu').val()
        })
        name.forEach(i => {
            i.innerText = $('#name').val()
        })
        phone.forEach(i => {
            i.innerText = $('#phone').val()
        })
        layer.close(tc)
    })
}
// 点击 提交订单
$('.btn').click(function () {
    layer.msg('订单已提交')
    setTimeout(() => {
        window.location.href = '../html/index.html'
        window.localStorage.removeItem('show_data')
    }, 2000)
})