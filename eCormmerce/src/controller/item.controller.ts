import {Router,Request,Response} from 'express';
import itemModel from '../models/item.model';
import Item from '../interface/item.interface';
import {authMiddleware} from '../middleware/authentication.middleware';
import {validationResult} from 'express-validator';
import {bodyValidation} from '../middleware/bodyValidation.middleware';

class ItemController{
    public router = Router();
    public item = itemModel;

    constructor(){
        this.initializeRouter();
    }


    private initializeRouter(){
        this.router.get('/items',this.fetchItem);
        this.router.post('/items',authMiddleware,bodyValidation('checkItem'),this.addItem);
        this.router.put('/items/:id',authMiddleware,bodyValidation('checkItem'),this.updateItem)
        this.router.delete('/items/:id',authMiddleware,this.deleteItem);
    }

    private fetchItem = async (req:Request,res:Response) => {
        try{
            const items: Item[] = await this.item.find()
            if(!items ){
                return res.status(400).json("item is not found");
            }
            res.status(200).json(items);
        }catch(error){
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    private addItem = async(req:Request,res:Response) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
        const ItemData: Item = req.body;
        try {
            const newItem = new this.item(ItemData);
            await newItem.save();

            res.status(200).json(newItem);
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    private updateItem = async(req:Request,res:Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
        const id: string = req.params.id;
        const itemData: Item = req.body;
        
        try {
            const updateItem = await this.item.findByIdAndUpdate(id,itemData,{new:true});
            if(!updateItem){
                return res.json('Item is not found')
            }
            res.status(200).json(updateItem);
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    private deleteItem = async(req:Request,res:Response) => {
        try {
            const id = req.params.id;
            const deleteItem:Item = await this.item.findByIdAndDelete(id);
            if(!deleteItem){
                return res.json('Item is not found')
            }
            res.status(200).json('Item successfully deleted');
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    }

    

export default ItemController;