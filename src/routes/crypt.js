import bcrypt from 'bcrypt'
const saltRounds = 10;

export async function hashPass(password) {
    return bcrypt.hash(password, saltRounds);
}

export async function compareHash(password, hash) {
    return bcrypt.compare(password, hash);
}

async function test() {
    const hhh = await bcrypt.hash('123456', saltRounds)
    const cmp = await bcrypt.compare('123456', hhh)
    console.log(cmp)
}

test()