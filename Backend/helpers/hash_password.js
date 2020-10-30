

var bcrypt = require("bcrypt");
exports.hash_password = async (password) => {
    var result;
    var salt = await bcrypt.genSalt(10);
    var hash = await bcrypt.hash(password, salt);
    result = hash;
    return result;
};
