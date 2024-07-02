const express = require('express')
const cors = require('cors')
const app = express()
const port =8080;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

app.use(cors())

app.use(express.json());


const Nutrition = require('./Schemas/nutritionSchema')
const Exercise = require('./Schemas/exerciseSchema')
const User = require('./Schemas/userSchema')



main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://amurph68:BKSX1Efheix6wqXO@cluster0.nkjkkub.mongodb.net/ironforge_database?retryWrites=true&w=majority&appName=Cluster0');
}


app.get('/nutrition', async (req, res) =>{
    const nutrition = await Nutrition.find({})
    res.json(nutrition)
})

app.post('/nutrition', async (req, res) => {
    const newNutrition = new Nutrition(req.body);
    const savedNutrition = await newNutrition.save();
    res.json(savedNutrition);
})

app.get('/exercise', async (req, res) =>{
    const exercise = await Exercise.find({})
    res.json(exercise) 
})

app.post('/exercise', async (req, res) => {
    const newExercise = new Exercise(req.body);
    const savedExercise = await newExercise.save();
    res.json(savedExercise);
})


app.post('/register', async (req, res) =>{
    const {username, password} = req.body

    const existingUser = await User.findOne({username: username})
    if (existingUser){
        return res.status(400).json({success:false, message:"Username is already taken"});
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = new User()
    user.username= username
    user.password = hashedPassword

    await user.save()

    res.status(201).json({success: true, message: "User as been registered successfully"})

})

app.post('/login', async (req, res) => {
    const {username, password}= req.body
    const existingUser = await User.findOne({username})
    if(existingUser) {
        const result = await bcrypt.compare(password, existingUser.password)
        if(result) {
            res.status(200).json({success: true});
        } else {
            res.status(400).json({success: false, message: 'Invalid username or password'});
        }
    } else {
        res.status(400).json({success: false, message: 'Invalid username or password'});
    }
})



app.listen(port,() =>{
    console.log('Server is running...')
});