const {hash,compare,genSalt} = require('bcryptjs')
const ctrl = {}

ctrl.encrypt = async e => {
    return await hash(e, await genSalt(10))
}

ctrl.compare1 = async (e,s)=> {
    return await compare(e,s)
}

ctrl.compare = async (password, hash) => {
    compare()
}

module.exports = ctrl