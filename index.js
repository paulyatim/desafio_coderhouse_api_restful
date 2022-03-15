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