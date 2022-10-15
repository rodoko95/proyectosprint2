import 'dotenv/config';
import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;


export const homeTlfn = (req, res) => {
    res.render('index')
}

export const getPlans = (req, res) =>{
    res.render('plans')
}

export const getPedidos = (req,res) => {
    res.render('pedidos')
}

export const getFeatures = (req, res) => {
    res.render('features')
}
// Obtenemos las tareas
export const listadoclientes = (req, res) =>{

    MongoClient.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db('ProyectoSprint2');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);
            database.collection('clientes').find({}).toArray((error, results) =>{
                if (error) {
                    throw error;
                }else{
                    res.render('clientela', { 
                        results
                    })
                }
            })
        }
    });
};


export const getClienteByID = (req, res) => {
    MongoClient.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db('ProyectoSprint2');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`)

            let ObjectId = mongodb.ObjectId;
            let { id } = req.params;

            database.collection('clientes').findOne({_id: ObjectId(id)}, (error, result) =>{
                if (error) {
                    throw error;
                }else{
                    res.render('editarconsulta', { 
                        result
                    })
                }
            })
        }
    });
}


//Creación de las tareas
export const formCliente = (req, res) => {

    
    const {nombre, provincia, plan} = req.body;

    MongoClient.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db('ProyectoSprint2'); 
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{ 

        console.log(`Conexion correcta a la Database`);        
            database.collection('clientes').insertOne({ nombre, provincia, plan }, (error, result) => {
                if (error) {
                    throw error;
                }else{
                    res.redirect('clientela')
                }
            })  
        } 
    }); 
}

//Actualizar Tareas
export const updateClientes = (req, res) =>{

    MongoClient.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db('ProyectoSprint2');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);

            let ObjectId = mongodb.ObjectId;
            let {id} = req.params;

            console.log(ObjectId(id));
            
            const {nombre, provincia, plan} = req.body;

            database.collection('Clientes').findOne({_id: ObjectId(id)}, {$set: {nombre, provincia, plan}} ,(error, result) => {
                error? console.log(error.message) :
                database.collection('clientes').replaceOne({_id: ObjectId(id)},{nombre, provincia, plan}, )
                //console.log(req.body)
                    res.redirect('/clientela')
                })
        }
    });
};

//Eliminar tareas
export const borrarCliente = (req, res) => {

    MongoClient.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db('ProyectoSprint2');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);
            
            const ObjectId = mongodb.ObjectId;
            const { id } = req.params;
            
        database.collection('clientes').deleteOne({_id: ObjectId(id)}, (error, result) =>{
                if (error) {
                    throw error;
                }else{
                    res.redirect('/clientela')
                }
            })
        }
    });
}