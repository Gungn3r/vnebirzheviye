require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpLoad = require('express-fileupload')
const router = require('./routes/index')
const applicationRouter = require('./routes/applicationRouter');
const errorHandler = require('./middleware/ErrorHadlingMiddleware')
const path = require('path')
const userRouter = require('./routes/userRouter')


const PORT =process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpLoad({}))
app.use('/api', router)
app.use('/user',userRouter)

app.use('/api/application', applicationRouter);

app.use(errorHandler)


const start = async()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e)
    }
}


start()


