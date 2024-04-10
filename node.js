const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
 
const app = express();
const port = process.env.PORT || 3000;
 
// Middleware
app.use(bodyParser.json());
app.use(cors());
 
// Connect to MongoDB
mongoose.connect('mongodb://localhost/recipes', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
 
// Define a schema for the recipe
const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [String],
    instructions: String,
    createdAt: { type: Date, default: Date.now },
});
 
// Create a model from the schema
const Recipe = mongoose.model('Recipe', recipeSchema);
 
// Routes
app.post('/api/recipes', async (req, res) => {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
    });
 
    try {
        const result = await recipe.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
 
app.get('/api/recipes', async (req, res) => {
    const recipes = await Recipe.find();
    res.send(recipes);
});
 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

fetch('http://localhost:3000/api/recipes')
  .then(response => response.json())
  .then(data => console.log(data));

  fetch('http://localhost:3000/api/recipes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Recipe',
    ingredients: ['Ingredient 1', 'Ingredient 2'],
    instructions: 'Mix ingredients and cook.',
  }),
})
.then(response => response.json())
.then(data => console.log(data));