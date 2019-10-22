const server = {};
//获取验证码
server.getVerifyCode = function (_this) {
    _this.$axios.get("/api/getVerifyCode").then((res) => {
        _this.verifyCode = res.data;
        _this.$message({
            message: "验证码: " + _this.verifyCode,
            type: "success"
        });
    });
};
//登录
server.login = function (_this, phone, code) {
    _this.$axios
        .post("/api/login", {
        phone: phone,
        verfiyCode: code
    })
        .then((res) => {
        let data = res.data;
        if (data.code == 0) {
            _this.$message({
                message: data.msg,
                type: "error"
            });
        }
        else if (data.code == 1) {
            _this.$message({
                message: data.msg,
                type: "success"
            });
            localStorage.setItem("ele_login", _this.phoneData.value);
            _this.$router.push("/");
        }
        else if (data.code == -1) {
            _this.$message({
                message: data.msg,
                type: "warning"
            });
        }
    });
};
export default server;
//# sourceMappingURL=service.js.map