const {paymentValidation} = require('../controllers/paymentValidation')
const {newPayment} = require('../controllers/newPayment')
const {getEmailByidSession}= require('../controllers/getEmailByidSession')
const { getTotalPays } = require('../controllers/getTotalPays')

const checkOutPayment = async (req, res)=>{
    const {id, amount, cartItems, userId}=req.body;
    try {
        const validatePayment = await paymentValidation(id, amount, cartItems, userId);
        res.status(200).json(validatePayment)
    } catch (error) {
        console.log(error.message);
        res.json(error.message)
    }
}

const newCheckOut = async (req, res)=>{
    const { cartItems }=req.body;
    try {
        const validatet = await newPayment( cartItems);
        console.log(validatet);
        res.status(200).json(validatet)
    } catch (error) {
        //console.log(error.message);
        res.json(error.message)
    }
}

const successfulPayment = async (req,res)=>{
    const { idSession, idUser }=req.query
    console.log(idUser,' este es el id user');
    try {
        const getEmails = await getEmailByidSession(idSession, idUser);
        console.log('getEmails',getEmails);
        res.status(200).json(getEmails)
    } catch (error) {
        res.json(error.message)
    }
}

const getDataPays = async (req,res)=>{
    console.log('entre al handler de Payment, en especifico al getDatapays');
        try {
            
            const dataPays= await getTotalPays();
            res.status(200).json(dataPays)
        } catch (error) {
            console.log('este es el error: ',error);
            res.status(400).json(error.message)
        }
}

module.exports = {checkOutPayment, newCheckOut, successfulPayment, getDataPays};