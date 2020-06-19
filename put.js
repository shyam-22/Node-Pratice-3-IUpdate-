//initialize express
let express = require("express")
let app = express();

//generate the port
let port = process.env.NODE_ENV || 4800;
app.listen(port,  () => {  console.log(`port is working on ${port}`)});

let Joi = require("@hapi/Joi");

app.use(express.json());

//create array of object
let cources = [
    {id:1, name:"react"},
    {id:2, name:"angualr"},
    {id:3, name:"express"},
    {id:4, name:"node"},
    {id:5, name:"javascript"}
];

//remove course
app.delete("/api/cources/remove/:id", (req,res) =>  {
    let data = cources.find(item =>  item.id === parseInt(req.params.id))
    if(!data)
    {
        return res.status(404).send({message : "Invalid id "} )
    }
    let index = cources.indexOf(data);
    cources.splice(index,1);
    res.send(cources);

})

//update the data
//put
app.put("/api/cources/update/:id", (req,res) =>{
    //Id checking ,  Joi validation  ,  finally data save
    let cource = cources.find(item =>  item.id ===  parseInt(req.params.id))
    if(!cource)
    {
        return res.status(404).send({message : "Invalid id return"})
    }
  

    let valid = Joi.object({
        name: Joi.string().min(4).max(20).required()
    })

    let {error} = valid.validate(req.body)

    if(error)
    {
        return res.send(error.details[0].message);
    }

    cource.name=req.body.name;
    res.send(cources);

});

