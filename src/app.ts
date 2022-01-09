import express from 'express';
import config from "config";
import connectToMongo from './db/connect';
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))


const port = config.get("port") as number;
const host = config.get("host") as string;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
  
  connectToMongo().then(()=>{
    console.log('connected successfully');
  }).catch((err)=>{
    console.log(err)
  })
  //connect()
});


