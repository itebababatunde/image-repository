process.env.NODE_ENV = 'test'
const x = require('chai')
const chatHttp = require('chai-http')
const server = require('../app')
const User = require('../models/userModel')
const assert = x.assert
const bcrypt = require('bcryptjs')

const testUser = {
    name: 'test-user',
    password: 'password',
    passwordConfirm: 'password',
    email: 'ite@gmail.com'
}

const {name, email, password, passwordConfirm} = testUser
x.use(chatHttp)

describe('Login tests',()=>{
    before(async()=>{
        try {
    

            const hash = await bcrypt.hash(password,12);
            //create a new user
            await User.create({
                email,
                name, 
                password,
                passwordConfirm
            })
        } catch (error) {
            console.log('.')
        }
    })

    it('Should throw error when email is missing',(done)=>{
        x
        .request(server)
        .post('/api/v1/users/login')
        .send({password})
        .end((err: any,res: { status: any; body: { message: string } })=>{
            assert.equal(res.status,400)
            assert.include(res.body.message.toLowerCase(),'email')
            done()
        })
    })

    // it('Should throw error when password is missing',(done)=>{
    //     x
    //     .request(server)
    //     .post('/api/v1/users/login')
    //     .send({email})
    //     .end((err,res)=>{
    //         assert.equal(res.status,400)
    //         assert.include(res.body.message.toLowerCase(),'password')
    //         done()
    //     })
    // })

    // it('Should throw error when email doesnt exist',(done)=>{
    //     x
    //     .request(server)
    //     .post('/api/v1/users/login')
    //     .send({email:'test34@gmail.com', password})
    //     .end((err,res)=>{
    //         assert.equal(res.status,404)
    //         assert.include(res.body.message.toLowerCase(),'not exist')
    //         done()
    //     })
    // })

    // it('Should throw error when wrong password is provided',(done)=>{
    //     x
    //     .request(server)
    //     .post('/auth/login')
    //     .send({email, password:'wrong password'})
    //     .end((err,res)=>{
    //         assert.equal(res.status,401)
    //         assert.include(res.body.message.toLowerCase(),'invalid')
    //         done()
    //     })
    // })


    // it('It should be successful when the values are all valid',(done)=>{
    //     x
    //     .request(server)
    //     .post('/auth/login')
    //     .send({password,email})
    //     .end((err,res)=>{
    //         console.log(email,password)
    //         assert.equal(res.status,200)
    //         assert.include(res.body.message.toLowerCase(),'success')
    //         done()
    //     })
    // })
})