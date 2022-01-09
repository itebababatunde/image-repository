import express from 'express';
import connectToMongo from './db/connect';
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  
  connectToMongo().then(()=>{
    console.log('connected successfully');
  }).catch((err)=>{
    console.log(err)
  })
  //connect()
});


