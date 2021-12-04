const express = require('express');  //handlebars 
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = new express();

//defined paths for express config
const publicDirectoryPath = path.join(__dirname, '../public'); //files in public folder can be rendered directly (static files)
const viewsPath = path.join(__dirname, '/templates/views');
const partialsPath = path.join(__dirname,'/templates/partials'); 


app.set('view engine', 'hbs'); //setting up handlebars  
app.set('views', viewsPath);   //setting the path of default views folder to the new templates folder where handlbar templates are defined
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath)); //static html content can be put in public


app.get('', (req, res) => {
    //res.render('index'); //name of template created in views folder  -- handlebars --> render dynamic pages 
    res.render('index', {
      title: 'WEATHER',
      name: 'Riya Athreya'
    })
});

// app.get('/help', (req,res) => {    //JSON RESPONSE
//     res.send([{
//         name: 'riya',
//         age: 23
//     }, 
//     {
//         name: 'sarah'
//     }])
// })

app.get('/about', (req,res) => {     //STRING RESPONSE 
   res.render('about', {
    title: 'about page',
    name: 'Riya Athreya'
  });  
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
      return res.send({error: "Please enter an address"})
    }
    
    const address = req.query.address;
    geocode(address, (error, {latitude, longitude, location} = {}) => {
      if(error){
        return res.send({error}) //shorthand sytax
      }

      forecast(latitude, longitude, (error, forecastData) => {
          if(error){
            return res.send({error: error})
          }
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address
          })
      })
    });   
})

app.get('/help', (req,res) => {
  res.render('help', {
    title: 'help text', 
    name: 'Riya Athreya'
  })
})


app.get('/products', (req,res) => {
  if(!req.query.search){
      return res.send({error: 'You must provide a search term'})
     
  }
  res.send({
    products: []
  })
})





//matching request like '/help/abc' or any other in /help path
app.get('/help/*',(req,res) => {
  res.render('404', {
     title: 'The help page ',
     name: 'riya'})
})


//match anything that is not matched for 404 not found
app.get('*',(req,res) => {
  res.render('404', { 
    title: "Page",
    name: 'riya athreya'})
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is up on port "+port+"...")
})