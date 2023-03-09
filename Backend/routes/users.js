/**************************************/
/*** Import des modules nécessaires ***/
const express = require('express')

const User = require('../models/user')

/****************************************/
/*** Récupération du router d'express ***/
let router = express.Router()

/************************************/
/*** Routage de la ressource User ***/
router.get('', (req, res) => {
    User.findAll()
    .then( users => res.json({ data: users}))
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.get('/:id', (req, res) => {
    let userId = parseInt(req.params.id)

    if(!userid){
        return res.json(400).json({ message: 'Missing Parameter'})
    }

    User.findOne({ where: {id: userId}, raw: true})
    .then(user => {
        if((user === null)){
            return res.status(404).json({ message: 'this user does not exist !'})
        }

        return res.json({data: user})
    })
    .catch(err => res.status(500).json({ message: 'Databade Error', error: err}))
})

router.put('', (req, res) => {
    const {nom, prenom, pseudo, email, password} = req.body
    if(!nom || !prenom || !pseudo || !email || !password){
        return res.status(400).json({ message: 'Missing Data'})
    }

    User.findOne({ where: { email: email }, raw: true})
        .then(user => {
            if( user !== null){
                return res.status(409).json({ message: `the user ${nom} already exists !`})
            }

            User.create(req.body)
                .then(user => res.json({ message: `User Created`, data:user}))
                .catch(err => res.status(500).json({ message: 'Databade Error', error: err}))
        })
        .catch(err => res.status(500).json({ message: 'Databade Error', error: err}))
})

router.patch('/:id')

router.delete('/:id')