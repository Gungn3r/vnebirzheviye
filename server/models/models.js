const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email_1: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    phone: { type: DataTypes.STRING, defaultValue: ""}, // Добавлено поле для телефона
    name_company: { type: DataTypes.STRING,unique: true },
    registered_address: {type: DataTypes.STRING, unique: false, allowNull: false}, // Добавлено поле для наименования пользователя
    actual_address: {type: DataTypes.STRING, unique: false, allowNull: false},
    bin: { type: DataTypes.BIGINT,unique: true},
    management_position: {type: DataTypes.STRING, unique: false, allowNull: false},
    name_of_manager: {type: DataTypes.STRING, unique: true, allowNull: false},
    contract_currency: {type: DataTypes.ENUM('KZT', 'USD','EUR'),allowNull: false,},
    account_number: {type: DataTypes.STRING, unique: true, allowNull: false},
    name_of_the_bank: {type: DataTypes.STRING, unique: false, allowNull: false},
    bik: {type: DataTypes.STRING, unique: true, allowNull: false},
    kbe: { type: DataTypes.INTEGER,unique: true},
    kor_count: {type: DataTypes.STRING, unique: true, allowNull: false},
    additional_information: {type: DataTypes.STRING, unique: false, allowNull: false},   
    name_person: {type: DataTypes.STRING, unique: false, allowNull: false},
    position: {type: DataTypes.STRING, unique: false, allowNull: false},
    work_phone: { type: DataTypes.STRING, defaultValue: "",}, // Добавлено поле для телефона
    phone_person: { type: DataTypes.STRING, defaultValue: "",}, // Добавлено поле для телефона
    email_2: { type: DataTypes.STRING, unique: true },
    name_bookkeeper: {type: DataTypes.STRING, unique: false, allowNull: false},
    phone_bookkeeper: { type: DataTypes.STRING, defaultValue: ""}, // Добавлено поле для телефона
    email_3: { type: DataTypes.STRING, unique: true },
})

const Application = sequelize.define('Application', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.ENUM('Купить', 'Продать'),allowNull: false,},
    name_product: {type: DataTypes.STRING, unique: false, allowNull: false},
    volume: {type: DataTypes.INTEGER, unique: false, allowNull: false},
    price_for_1: {type: DataTypes.INTEGER, unique: false, allowNull: false},
    total_price: {type: DataTypes.INTEGER, unique: false, allowNull: false},
    place_of_delivery: {type: DataTypes.STRING, unique: false, allowNull: false},
    choice_counteragent: {type: DataTypes.ENUM('Один контрагент', 'Несколько контрагентов'),allowNull: false,},
    bin: {type: DataTypes.BIGINT, unique: false, allowNull: false},
    additional_information: {type: DataTypes.STRING, unique: false, allowNull: false},
    UserId: {type: DataTypes.INTEGER,allowNull: false,},
    status: {
        type: DataTypes.ENUM('Создана','Отменить','Ожидание контрагента' ,'Ожидание результата' ,'Состоялась'),
        allowNull: false,
        defaultValue: 'Создана', // Значение по умолчанию
    },
    dealNumber: {
        type: DataTypes.INTEGER,
        allowNull: true, // Поле может быть пустым до завершения сделки
    }, 
})

const Admin = sequelize.define('Admin', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "ADMIN" },
    phone: { type: DataTypes.STRING, defaultValue: "",unique: true}, // Добавлено поле для телефона
    admin_name: { type: DataTypes.STRING,unique: true }, // Добавлено поле для наименования пользователя
    
})

const PKO = sequelize.define('pko',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    doc_1: {type: DataTypes.STRING, allowNull: false},
    doc_2: {type: DataTypes.STRING, allowNull: false},
    doc_3: {type: DataTypes.STRING, allowNull: false},
    doc_4: {type: DataTypes.STRING, allowNull: false},
    doc_5: {type: DataTypes.STRING, allowNull: false},
    doc_6: {type: DataTypes.STRING, allowNull: false},
    doc_7: {type: DataTypes.STRING, allowNull: false},
})

//const Message = sequelize.define('message', {
//id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//UserId: {type: DataTypes.INTEGER,allowNull: false,},
//bin: {type: DataTypes.BIGINT, unique: false, allowNull: false},
//content: {type: DataTypes.TEXT, allowNull: false,},
//applicationId: {type: DataTypes.INTEGER,allowNull: false,references: {model: 'Application', key: 'id',},}
//})

User.hasOne(PKO)
PKO.belongsTo(User)

User.hasMany(Application)
Application.belongsTo(User)

Admin.hasMany(User)
User.belongsTo(Admin)

Admin.hasMany(Application)
Application.belongsTo(Admin)

//Message.hasOne(Application)
//Application.belongsTo(Message)

//Message.hasMany(User)
//User.belongsTo(Message)

module.exports = {
    User,
    Application,
    Admin,
    PKO,
   // Message
}