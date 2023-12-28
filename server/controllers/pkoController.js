const uuid = require('uuid');
const path = require('path');
const multer = require('multer');
const {PKO} = require('../models/models');
const ApiError = require('../error/ApiError');

class PKOController {
    async uploadFiles(req, res, next) {
      try {
        // Проверка наличия всех файлов
        if (!req.files || Object.keys(req.files).length !== 7) {
          return res.status(400).json({ error: 'Пожалуйста, загрузите все семь файлов' });
        }
  
        // Обработка и сохранение файлов
        const fileFields = ['doc_1', 'doc_2', 'doc_3', 'doc_4', 'doc_5', 'doc_6', 'doc_7'];
        const filePromises = fileFields.map(async (field) => {
          const file = req.files[field];
          const buffer = file.buffer; 
          const filePath = `/static/${file.originalname}`; 
  
          
          await PKO.update({ [field]: filePath }, { where: { id: 1 } }); // Замените на нужные условия
        });
  
        // Дождитесь завершения всех операций с файлами
        await Promise.all(filePromises);
  
        res.json({ message: 'Файлы успешно загружены и сохранены' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Произошла ошибка при загрузке файлов' });
      }
    }
  }
  

module.exports = new PKOController();
