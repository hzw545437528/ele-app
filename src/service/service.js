import vue from '../main';
const server = {};
//获取验证码
server.getVerifyCode = function (_this) {
    return new Promise((resolve, reject) => {
        _this.$axios.get("/api/getVerifyCode").then((res) => {
            console.log(res);
            resolve(res);
        });
    });
};
//登录
server.login = function (_this, phone, code) {
    return new Promise((resolve, reject) => {
        _this.$axios
            .post("/api/login", {
            phone: phone,
            verfiyCode: code
        })
            .then((res) => {
            resolve(res);
        });
    });
};
//获取商店类别
server.getShopType = function (_this, type = {}) {
    return new Promise((resolve, reject) => {
        _this.$axios('/api/getShopType').then((res) => {
            resolve(res);
        });
    });
};
//获取商店简介
server.getShops = function (_this, type, page = 0) {
    return new Promise((resovle, reject) => {
        let params = {
            type: type,
            page: page
        };
        _this.$axios.get('/api/getShops', { params: params }).then((res) => {
            resovle(res);
        });
    });
};
//获取订单列表
server.getOrders = function (_this) {
    return new Promise((resovle, reject) => {
        _this.$axios.get('/api/getOrders').then((res) => {
            resovle(res);
        });
    });
};
//根据订单号获取订单
server.getOrderById = function (_this, orderId) {
    return new Promise((resovle, reject) => {
        let params = {
            orderId: orderId
        };
        _this.$axios.get('/api/getOrderById', { params: params }).then((res) => {
            resovle(res);
        });
    });
};
//根据商店名获取商店
server.getShopByName = function (_this, shopName) {
    return new Promise((resovle, reject) => {
        let params = {
            shopName: shopName
        };
        _this.$axios.get('/api/getShopByName', { params: params }).then((res) => {
            resovle(res);
        });
    });
};
//根据id获取商店
server.getShopById = function (id) {
    return new Promise((resovle, reject) => {
        vue.$axios('/api/getShopById', { params: { id: id } }).then((res) => {
            resovle(res);
        });
    });
};
//获取商店展示图片
server.getShopImg = function (_this, filePath) {
    return new Promise((resolve, reject) => {
        _this.$axios('api/getShopImage', { params: { path: filePath }, responseType: 'arraybuffer' }).then((res) => {
            return 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        }).then((res) => {
            resolve(res);
        });
    });
};
//获取商家信息
server.getShopInfo = function (shop_id) {
    return new Promise((resolve) => {
        vue.$axios.get('/api/getShopInfo', {
            params: {
                shop_id: shop_id
            }
        }).then((res) => {
            resolve(res);
        });
    });
};
//获取商家赔或保等提供
server.getProvideIntroduce = function (_this, name) {
    return new Promise((resolve, reject) => {
        _this.$axios('/api/getProvideIntroduce', { params: { name: name } }).then((res) => {
            resolve(res);
        });
    });
};
export default server;
//# sourceMappingURL=service.js.map