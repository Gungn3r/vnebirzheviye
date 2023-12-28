const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, email_1, role) => {
    return jwt.sign(
        {id, email_1, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const { 
            name_company,
            bin,
            email_1,
            phone, 
            role,
            password,
            registered_address,
            actual_address,
            management_position,
            name_of_manager,
            contract_currency,
            account_number,
            name_of_the_bank,
            bik,
            kbe,
            kor_count,
            additional_information,
            name_person,
            position,
            work_phone,
            phone_person,
            name_bookkeeper,
            phone_bookkeeper,
            email_3,
            email_2} = req.body

        if (!email_1 || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email_1}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const name = await User.findOne({where: {name_company}})
        if (name) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({
            name_company,
            bin,
            email_1,
            phone, 
            role,
            password: hashPassword,
            registered_address,
            actual_address,
            management_position,
            name_of_manager,
            contract_currency,
            account_number,
            name_of_the_bank,
            bik,
            kbe,
            kor_count,
            additional_information,
            name_person,
            position,
            work_phone,
            phone_person,
            name_bookkeeper,
            phone_bookkeeper,
            email_3,
            email_2,
            //messageId
            })
        //const pko = await PKO.create({userId: user.id})
        const token = generateJwt(user.id, user.email_1, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email_1, password} = req.body
        const user = await User.findOne({where: {email_1}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email_1, user.role,user.phone, user.name_company, user.bin)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email_1, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()