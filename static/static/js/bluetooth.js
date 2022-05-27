$.ajax({
    method: 'get',
    url: '/my/product/products',
    success: (res) => {
        let data = res.data
        //存储蓝牙耳机商品展示的空数组
        let earArr = [];
        let sArr = [];
    
        //存储推荐商品的空数组
        let tArr = []
        let jArr = []
        for (let x of data) {
            if (x.type_name == '蓝牙耳机') {
                earArr.push(x)
            }
            else if (x.type_name == '推荐') {
                tArr.push(x);
            }
        }
        //蓝牙耳机商品展示
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