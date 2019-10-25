const server: any = {}

//获取验证码
server.getVerifyCode = function (_this: any): void {
    _this.$axios.get("/api/getVerifyCode").then((res: any) => {
        _this.verifyCode = res.data;
        _this.$message({
            message: "验证码: " + _this.verifyCode,
            type: "success"
        });
    });
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

server.getShopType = function (_this: any, type: Object = {}) {
    return new Promise((resolve, reject) => {
        _this.$axios('/api/getShopType').then((res: any) => {
            resolve(res)
        })
    })
}

export default server