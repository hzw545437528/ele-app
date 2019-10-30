const server: any = {}

//获取验证码
server.getVerifyCode = function (_this: any) {
    return new Promise((resolve, reject) => {
        _this.$axios.get("/api/getVerifyCode").then((res: any) => {
            console.log(res);
            resolve(res);
        });
    })
}

//登录
server.login = function (_this: any, phone: string, code: string) {
    return new Promise((resolve, reject) => {
        _this.$axios
            .post("/api/login", {
                phone: phone,
                verfiyCode: code
            })
            .then((res: any) => {
                resolve(res);
            });
    })
}

//获取商店类别
server.getShopType = function (_this: any, type: Object = {}) {
    return new Promise((resolve, reject) => {
        _this.$axios('/api/getShopType').then((res: any) => {
            resolve(res)
        })
    })
}

//获取商店简介
server.getShops = function (_this: any, type: Object, page: Number = 0) {
    return new Promise((resovle, reject) => {
        let params = {
            type: type,
            page: page
        }
        _this.$axios.get('/api/getShops', { params: params }).then((res: any) => {
            resovle(res)
        })
    })
}

//获取商店展示图片
server.getShopImg = function (_this: any, filePath: String) {
    return new Promise((resolve, reject) => {
        _this.$axios('api/getShopImage', { params: { path: filePath }, responseType: 'arraybuffer' }).then((res: any) => {
            return 'data:image/png;base64,' + btoa(
                new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        }).then((res: any) => {
            resolve(res)
        })
    })
}

//获取商家赔或保等提供
server.getProvideIntroduce = function (_this: any, name: String) {
    return new Promise((resolve, reject) => {
        _this.$axios('/api/getProvideIntroduce', { params: { name: name } }).then((res: any) => {
            resolve(res)
        })
    })
}

export default server