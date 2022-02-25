// import * as express from 'express';
// import * as path from 'path';
const express = require('express');
const path = require('path');

const appRoot = 'http://localhost:3000';
const allowHeaders = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
const isDev = process.env.NODE_ENV !== 'production';

// Extensions allowed to be returned from file server.
const allowedExt = [
    '.js', '.ico', '.css', '.png',
    '.jpg', '.woff2', '.woff', '.ttf',
    '.svg', '.mp3', '.wav',
];

class Server {
    static get Port(): number { 
        if(process.env.PORT) {
            return Number(process.env.PORT);
        }
        return 3000;
    }
    // TODO: Does process.env.HOST exist?
    static get Host(): string { return '127.0.0.1';}

    static Init(): any {
        switch (process.argv[2]) {
            case 'start':
                return Server.Start();
            default:
                return null;
        }
    }

    static Start(): void {
        const server = express();
        const http = require('http').Server(server);
        // Header Setup
        server.use((_, res, next) => {
            res.header('Access-Control-Allow-Origin', appRoot);
            res.header('Access-Control-Allow-Headers', allowHeaders);
            next();
        });
        server.use(express.json());
        // Socket.io
        const io = require('socket.io')(http);
        server.use((req, _, next) => {
            // Make 'io' available on all requests.
            req['io'] = io;
            next();
        });
        if(isDev) {
            io.on('connection', (socket) => {
                console.log('[IO]: client connected ');
                socket.on('disconnect', () => {
                    console.log('[IO]: client disconnected');
                })
            });
        }
        // DB Connect
        // ThirteenServer.DBConnection();
        // Route Configuration
        // server.use('/api', UserAccountRouter);

        // Static files.
        server.use(express.static(path.join(__dirname, 'build/client')));
        server.get('*', (req, res) => {
            // Remove '?__sbCache' and following text.
            if(req.url.includes('?__sbCache')) {
                req.url = req.url.split('?__sbCache')[0];
            }
            console.log('requested url: ' + req.url);
            console.log(path.resolve(`${req.url}`));
            if(req.url === '/') {
                res.sendFile(path.resolve('build/client/index.html'));
            }else{
                res.sendFile(path.resolve(`build/client/${req.url}`));
            }
            // // See if the requested file is allowed. Else send index.html
            // if(allowedExt.filter((ext) => req.url.indexOf(ext) > 0).length > 0) {
            //     res.sendFile(path.resolve(`build/client/${req.url}`));
            // }else{
            //     res.sendFile(path.resolve(`build/client/index.html`));
            // }
        });
        // Start listening!
        http.listen(
            Server.Port, 
            Server.Host,
            () => {
                console.log('[HTTP]: Listening on port ' + Server.Port);
            }
        );
        
    }
}

Server.Init();
export default Server;