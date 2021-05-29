const http = require('http');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./controllers/productsController');
// const products= require('./data/products')//F2 a F3

const server= http.createServer((req, res)=>{


  //F1
  // // simpre retorna lo mismo esto no especifica ruta
  // res.statusCode= 200;
  // //en elcabesado de la respuesta
  // res.setHeader('Content-Type', 'text/html');
  // res.write('<h1>hello world</h1>');
  // res.end()

  //F2
  // sin importar el link sigue retornado todo
  // res.writeHead(200, {'Content-Type': 'application/json'})
  // res.end(JSON.stringify(products));

  //F3
  //agregando rutas
  // if (req.url==='/api/products' && req.method==='GET'){
  //   res.writeHead(200, {'Content-Type': 'application/json'})
  //   res.end(JSON.stringify(products));
  // } else {
  //   res.writeHead(404, {'Content-Type': 'application/json'})
  //   res.end(JSON.stringify({message: 'Route Not fund'}));
  // }

  //F4 Modular agregando rutas
  if (req.url==='/api/products' && req.method==='GET'){
    getProducts(req,res)
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === 'GET'){
    //regulamente la url se componene de api/product/:id
    //por eso ase un match api/product/{es un numero} ademas si es un get 
    //por umo se sparan la url por los / y el cuarto resultado en la id
    const id = req.url.split('/')[3]
    getProduct(req, res, id)
  } 
  
  else if(req.url === '/api/products' && req.method === 'POST') {
    createProduct(req, res)
  } 
  
  else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'PUT') {
    const id = req.url.split('/')[3]
    updateProduct(req, res, id)
  } 
  
  else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3]
    deleteProduct(req, res, id)
  } 
  
  else{
    res.writeHead(404, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({message: 'Route Not fund'}));
  }
})

const PORT= process.env.PORT || 3000;

server.listen(PORT, ()=>console.log(`Server Running on port ${PORT}`))