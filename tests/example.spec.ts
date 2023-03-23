import { expect } from "chai"
import * as fastify from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";


describe("teste inicial", () =>{
    let server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;
    
    it("firstTest", async () =>{
        const response = await server.inject({
            method: 'POST',
            url: '/veiculos',
            payload:{
                placa: 'OWN3L54',
                chassi: '20ISKEN4561',
                renavam: '005264785631',
                modelo: 'KA',
                marca: 'Ford',
                ano: 2014
            }
          })
    
          expect(response.statusCode, '201')
    })
})