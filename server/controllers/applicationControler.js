const uuid = require('uuid');
const path = require('path');
const { Application} = require('../models/models');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const WebSocket = require ('ws')
const ApiError = require('../error/ApiError');

class ApplicationController {
    async create(req, res, next) {
        try {
            const { type, name_product, volume, price_for_1, total_price, place_of_delivery, choice_counteragent, bin, additional_information } = req.body;
            const userId = req.user.id;
            const newApplication = await Application.create({ type, name_product, volume, price_for_1, total_price, place_of_delivery, choice_counteragent, bin, additional_information, UserId: userId, status:'Создана'});

            return res.json(newApplication);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        try {
            let { limit, page } = req.query;
            page = page || 1;
            limit = limit || 9;
            const offset = (page - 1) * limit;

            let whereCondition = {};

            const applications = await Application.findAndCountAll({
                where: whereCondition,
                limit,
                offset
            });

            return res.json(applications);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ошибка при получении заявок' });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const application = await Application.findOne({
                where: { id }
            });
    
            if (!application) {
                return res.status(404).json({ error: 'Заявка не найдена' });
            }
    
            return res.json(application);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ошибка при получении заявки' });
        }
    }

    async checkApplication(req, res, next) {
        try {
            const { id } = req.params;
            const application = await Application.findOne({
                where: { id }
            });

            if (!application) {
                return res.status(404).json({ error: 'Заявка не найдена' });
            }

            // Проверка статуса заявки перед изменением
            if (application.status !== 'Создана') {
                return res.status(400).json({ error: 'Невозможно изменить заявку с текущим статусом' });
            }

            // Проверка роли пользователя
            if (req.user.role !== 'ADMIN') {
                return res.status(403).json({ error: 'Недостаточно прав для выполнения данного действия' });
            }

            // Присвоение статуса "Ожидание контрагента"
            application.status = 'Ожидание контрагента';
            await application.save();

            // Отправить уведомление пользователю с ссылкой на подтверждение

            return res.json({ message: 'Статус заявки изменен на Ожидание контрагента' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }

    async confirmApplication(req, res, next) {
        try {
            const { id } = req.params;
            const application = await Application.findOne({
                where: { id }
            });
    
            if (!application) {
                return res.status(404).json({ error: 'Заявка не найдена' });
            }
    
            // Проверка статуса заявки перед изменением
            if (application.status !== 'Ожидание контрагента') {
                return res.status(400).json({ error: 'Невозможно изменить заявку с текущим статусом' });
            }
    
            // Проверка, что текущий пользователь соответствует bin в заявке
            if (req.user.bin !== application.bin) {
                return res.status(403).json({ error: 'Недостаточно прав для выполнения данного действия' });
            }
    
            // Присвоение статуса "Ожидание результата"
            application.status = 'Ожидание результата';
            await application.save();
    
            // Отправить уведомление администратору о подтверждении
    
            return res.json({ message: 'Статус заявки изменен на Ожидание результата' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }
    
    async assignDealNumber(req, res, next) {
        try {
            const { id } = req.params;
            const application = await Application.findOne({
                where: { id }
            });
    
            if (!application) {
                return res.status(404).json({ error: 'Заявка не найдена' });
            }
    
            // Проверка статуса заявки перед изменением
            if (application.status !== 'Ожидание результата') {
                return res.status(400).json({ error: 'Невозможно изменить заявку с текущим статусом' });
            }
    
            // Проверка роли пользователя
            if (req.user.role !== 'ADMIN') {
                return res.status(403).json({ error: 'Недостаточно прав для выполнения данного действия' });
            }
    
            // Присвоение номера сделки
            
            application.status = 'Состоялась'; // Изменение статуса на 'Состоялась'
            await application.save();
    
            // Отправить уведомление пользователю о присвоении номера сделки
    
            return res.json({ message: 'Заявке присвоен номер сделки и статус изменен на Состоялась', dealNumber });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }

    
}

module.exports = new ApplicationController();
