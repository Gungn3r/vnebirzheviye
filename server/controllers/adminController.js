const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};

class AdminController {
    async registration(req, res, next) {
        try {
            const { admin_name, email, password, role } = req.body;

            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'));
            }
            
            if (role !== 'ADMIN') {
                return next(ApiError.badRequest('Регистрация разрешена только для администраторов'));
            }

            const adminCandidate = await Admin.findOne({ where: { email } });
            if (adminCandidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'));
            }

            const name = await Admin.findOne({ where: { admin_name } });
            if (name) {
                return next(ApiError.badRequest('Пользователь с таким именем уже существует'));
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const admin = await Admin.create({
                email,
                role,
                password: hashPassword,
            });

            const token = generateJwt(admin.id, admin.email, admin.role);
            return res.json({ token });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const admin = await Admin.findOne({ where: { email } });

            if (!admin) {
                return next(ApiError.notFound('Пользователь не найден'));
            }

            const comparePassword = bcrypt.compareSync(password, admin.password);
            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'));
            }

            const token = generateJwt(admin.id, admin.email, admin.role);
            return res.json({ token });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.admin.id, req.admin.email, req.admin.role);
            return res.json({ token });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new AdminController();
