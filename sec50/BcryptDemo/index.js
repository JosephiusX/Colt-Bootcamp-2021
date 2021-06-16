const bcrypt = require('bcrypt');

// const hashPassword = async (pw) => {
//     const salt = await bcrypt.genSalt(12);
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(salt);
//     console.log(hash);
// }

const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
}

const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log('logged you in! Successful match!')
    } else {
        console.log('incorrect')
    }
}


// hashPassword('monkey');
login('monkey', '$2b$12$9qzQz0NnpoqaG18n4VAJqu4jCgw2pI14we3UHTyQBvDybraEtek2a')
