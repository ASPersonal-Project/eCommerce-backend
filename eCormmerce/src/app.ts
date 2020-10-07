import express from 'express';
import mongoose from 'mongoose';

class App{
    public app: express.Application;
    public port: number;

    constructor(controllers:any,port:number){
        this.app = express();
        this.port = port;

        this.intializeMiddlewares();
        this.initializeControllers(controllers)
        this.intializeDatabase();
    }

    private intializeMiddlewares = () => {
        this.app.use(express.json());
    }

    private initializeControllers = (controllers:any) => {
        controllers.forEach((controller:any) => {
            this.app.use('/',controller.router);
        });

    }

    private intializeDatabase = async() =>{
        
        try {
            await mongoose.connect("mongodb://localhost:27017/eCommerce",{ useUnifiedTopology: true,useNewUrlParser: true, useFindAndModify: false });
            console.log("mongodb connected");
        } catch (error) {
            console.log(error);
        }
    }

    public listen(){
        this.app.listen(this.port,()=>{console.log(`Server is started ${this.port}`)})
    }

}

export default App;