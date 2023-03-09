/************************************/
/*** Import des modules necessaires */
const { Sequelize } = require('sequelize')

/************************************/
/*** Connexion à la base de données */
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
    }
)

/*********************************/
/*** Mise en place des relations */
const db = {}
db.User = require('./models/user')
db.Cocktail = require('./models/cocktail')



/*********************************/
/*** Synchronisation des modèles */
// sequelize.sync(err => {
//     console.log('Database Sync Error', err)
// })

module.exports = sequelize