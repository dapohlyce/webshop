import {Request,Response} from "express";

import * as OrderMapper from "../mapper/OrderMapper";
import {BaseRouter} from "./BaseRouter";
import resolve from '../resolver';


/**
 * express Router für Bestellungen
 */
export default class OrderRouter extends BaseRouter{

    initialiseRouter(){
        this.router.get('/',this.get);
        this.router.get('/status/:status',this.getByStatus);
        this.router.get('/:id',this.getOneFull);
        this.router.post('/submit',this.submitOrder);
        this.router.patch('/:id',this.setStatus);
        this.router.post('/',this.createOrder);
        
    }
    /**
     * Gibt alle Bestellungen zurück
     * @param req 
     * @param res 
     */
    async get(req: Request, res: Response)
    {
        let orders,err;
        [orders,err] = await resolve(OrderMapper.getAllOrders());
        if(err !== null || orders === undefined)
        {
            res.sendStatus(500);
            return;            
        }

        let result = [];
        orders.forEach(order => {
            result.push({
                id: order.id,
                mail: order.mail,
                timestamp: order.timestamp,
                status: order.status.id
            });
        });
        res.json(
           result
        );
    }

    /**
     * Gibt alle Bestellungen eines Statuses zurück
     * @param req 
     * @param res 
     */
    async getByStatus(req: Request, res: Response)
    {
        let statusId = parseInt(req.params.status);
        if(!Number.isInteger(statusId))
        {
            res.sendStatus(400);
            return;   
        }

        let result,err;
        [result,err] = await resolve(OrderMapper.getAllOrdersByStatus(statusId));
        if(err !== null)
        {
            res.sendStatus(500);
            return;            
        }
        if(result === undefined)
        {
            res.sendStatus(404);
            return;
        }

        res.json(
            result
        );
    }

    /**
     * Gibt eine komplette Bestellung zurück
     * @param req 
     * @param res 
     */
    async getOneFull(req: Request, res: Response)
    {
        let id = parseInt(req.params.id);
        if(!Number.isInteger(id))
        {
            res.sendStatus(400);
            return;   
        }

        let result,err;
        [result,err] = await resolve(OrderMapper.getFullOrder(id));
        if(err !== null)
        {
            res.sendStatus(500);
            return;            
        }

        if(result === undefined)
        {
            res.sendStatus(404);
            return;
        }

        res.json(
            result
        );
    }

    /**
     * setzt den Status einer Bestellung
     * @param req 
     * @param res 
     */
    async setStatus(req: Request, res: Response)
    {
        let id = parseInt(req.params.id);
        let info = req.body.info;
        let status = req.body.status;
        
        if(!Number.isInteger(id))
        {
            res.sendStatus(400);
            return;   
        }
        let result,err;

        if(!status)
        {
            [result,err] = await resolve(OrderMapper.setNextStatus(id,info));
        }else{
            [result,err] = await resolve(OrderMapper.setStatus(id,info,status));
        }
        if(err !== null)
        {
            res.sendStatus(500);
            return;
        }

        if(result == false)
        {
            res.sendStatus(400);
            return;
        }

        res.sendStatus(200);

    }

    /**
     * Erstellt eine neue Bestellung
     * @param req 
     * @param res 
     */
    async createOrder(req: Request, res: Response)
    {
        if(
            !req.body.mail ||
            !req.body.address ||
            (!req.body.articles && !Array.isArray(req.body.articles))
        )
        {
            res.sendStatus(400);
            return;
        }

        let result,err;
        [result,err] = await resolve(OrderMapper.addOrder(req.body.mail,req.body.address,req.body.articles));
        if(err !== null)
        {
            res.sendStatus(500);
            return;            
        }
        if(result === undefined)
        {
            res.sendStatus(400);
            return;
        }

        res.send(result);
    }

    /**
     * Bestätigt eine Bestellung
     * @param req 
     * @param res 
     */
    async submitOrder(req: Request, res: Response)
    {
        let user_key = req.body.user_key;
        let result,err;
        
        [result,err] = await resolve(OrderMapper.submitOrder(user_key));

        if(err !== null)
        {
            res.sendStatus(500);
            return;            
        }

        if(result)
        {
            res.sendStatus(400);
        }else{
            res.sendStatus(200);
        }
    }

}


