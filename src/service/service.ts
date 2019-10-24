const server: any = {}

//获取验证码
server.getVerifyCode = function (_this:any): void {
    _this.$axios.get("/api/getVerifyCode").then((res: any) => {
        _this.verifyCode = res.data;
        _this.$message({
            message: "验证码: " + _this.verifyCode,
            type: "success"
        });
    });
}

//登录
server.login = function (_this:any, phone: string, code: string): void {
    _this.$axios
    .post("/api/login", {
        phone: phone,
        verfiyCode: code
    })
    .then((res: any) => {
        let data = res.data;
        if (data.code == 0) {
            _this.$message({
                message: data.msg,
                type: "error"
            });
        } else if (data.code == 1) {
            _this.$message({
                message: data.msg,
                type: "success"
            });
            localStorage.setItem(
                "ele_login",
                _this.phoneData.value
            );
            _this.$router.push("/");
        } else if (data.code == -1) {
            _this.$message({
                message: data.msg,
                type: "warning"
            });
        }
    });
}

server.getShopType = function(_this:any, type: Object = {}) {
    return new Promise((resolve, reject) => {
        _this.$axios('/api/getShopType').then((res: any) => {
            resolve(res)
        })
    })
}

export default server