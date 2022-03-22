const db =  require('./models')

const testUser = async () => {
    try {
        const newUser = await db.User.create({
            name: 'zach',
            email: 'zach@zach.com',
            password: 'password'
        })
    }catch (err) {
        console.log(err)
    }
}

testUser()