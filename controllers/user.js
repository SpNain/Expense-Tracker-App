const fs = require('fs').promises;
const expenseDetails = require('../models/expenseDetails');

exports.getFormPage = async(req,res,next)=>{
    try{
        res.sendFile('index.html',{root:'views/user'})
    }catch(err){
        console.log("error in getting form page", err);
        res.status(500).json({
            error:err
          })
    }
}

exports.addExpenseDetails = async(req,res,next)=>{
    try {
        const { expenseAmount, expenseDescription, expenseCategory} = req.body;
        
        let expenseDetailsObj = await expenseDetails.create({
            expenseAmount: expenseAmount,
            expenseDescription: expenseDescription,
            expenseCategory: expenseCategory
        })
        res.status(201).json(expenseDetailsObj)

    }catch(err){
        console.log("Error while adding the details of a new Expense", err);
        res.status(500).json({
            error:err
          })
    }
}

exports.getAllExpenses = async(req,res,next)=>{
    try{
        const data = await expenseDetails.findAll();
        res.status(200).json(data)

    }catch(err){
        console.log("Error while fetching all expenses details", err);
        res.status(500).json({
            error:err
          })
    }

}

exports.deleteExpenseDetails = async(req,res,next)=>{ 
    const id = req.params.id;
    console.log(id);
    try{
        await expenseDetails.destroy({
            where:{
                id : id
            }
        })
        res.status(200).json({
            msg : "Expense Deleted Successfully"
        })
    }catch(err){
        console.log("Error while deleting expense with id : ", id, err)
        res.status(500).json({
            error:err
          })
    }
}

exports.editExpenseDetails = async (req, res, next) => {
    const id = req.params.id;
    try {
        const expenseDetailsObj = await expenseDetails.findByPk(id);
        expenseDetailsObj.expenseAmount = req.body.expenseAmount;
        expenseDetailsObj.expenseDescription = req.body.expenseDescription;
        expenseDetailsObj.expenseCategory = req.body.expenseCategory;
        await expenseDetailsObj.save();
        res.status(201).json(expenseDetailsObj);
    } catch (err) {
        console.log("Error while updating expense with id : ", id, err)
        res.status(500).json({
            error:err
          })
    }
}