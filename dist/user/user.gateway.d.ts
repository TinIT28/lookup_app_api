import { Server } from 'socket.io';
export declare class UserGateway {
    server: Server;
    handleUpdateUser(user: any): void;
}
