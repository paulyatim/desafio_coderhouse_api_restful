// const express = require('express');
// const router = express.Router();
// const Productos = require('./Productos');
// const PORT = 8080;

// const app = express();
// app.use(express.urlencoded({extended: true}));
// app.use('/api/productos', router);
// app.use('/static', express.static(__dirname + '/public'));


// const prods = new Productos('productos.txt');

// router.get('/', async (req, res) => {
//         try {
//             const products = await prods.getAll();
//             res.status(200).json(products);
//         } catch (error) {
//             res.status(500).json(error.message);
//         }
//     })
//     .get('/:id', async (req, res) => {
//         try {
//             const productoId = await prods.getById(req.params.id);
//             if (productoId) {
//                 return res.status(201).json(productoId);
//             } else {
//                 return res.status(404).json({error: "producto no encontrado"})
//             }
//         } catch (error) {
//             res.status(500).json(error.message);
//         }
//     });

// router.post('/', async (req, res) => {
//     try {
//         if (req.body.nombre && req.body.precio) {
//             const idNuevo = await prods.save(req.body);
//             const productoNuevo = await prods.getById(idNuevo);
//             res.status(201).json(productoNuevo);
//         } else {
//             res.status(500).json("error al crear producto")
//         }
//     } catch (error) {
//         res.status(500).json(error.message)
//     }
// })

// const server = app.listen(PORT, () => console.log(`El servidor corre en el puerto ${PORT}`));
// server.on('error', (error) => console.log(error.message))

const express = require('express')
const router = express.Router()
const Productos = require("./Productos.js")

const PORT = 8080

const app = express()

app.use(express.urlencoded({extended: true}))
app.use('/api/productos', router)
app.use(express.static("./public"))

const productos = new Productos()

router.get("/", (req, res) => {
    try {
        res.status(200).json(productos.getAll)
    } catch(error) {
        res.status(500).json(error.message)
    }
})

router.get("/:id", (req, res) => {
    try {
        const producto = productos.getById(req.params.id)
        if (producto) {
            return res.status(200).json(producto)
        } 
        return res.status(200).json({error: "No se encontro el producto"})
    } catch(error) {
        res.status(500).json(error.message)
    }
})

router.post("/", (req, res) => {
    try {
        if (req.body.nombre && req.body.precio) {
            const producto = productos.save(req.body)
            res.status(201).json(producto)
        } else {
            res.status(400).json({error: "Complete los datos obligatorios"})
        }
    } catch(error) {
        res.status(500).json(error.message)
    }
})

router.put("/:id", (req, res) => {
    try {
        const id = Number(req.params.id)
        const producto = productos.update(id, req.body)
        res.status(200).json(producto)
    }catch(error){
        res.status(`No se pudo actualizar el producto: ${error.message}`)
    }
})

router.delete("/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        productos.deleteById(id);
        res.status(200).json("Borrado")
    }catch(error){
        res.status(500).json({error: `No se pudo borrar el producto ${error.message}`})
    }
})

const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
server.on("error", (error) => console.log(error.message))