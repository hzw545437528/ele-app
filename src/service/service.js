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
export default server;
//# sourceMappingURL=service.js.map