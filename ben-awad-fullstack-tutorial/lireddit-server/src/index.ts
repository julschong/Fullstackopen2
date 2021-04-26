import { MikroORM } from '@mikro-orm/core';
import dotenv from 'dotenv';
import { Post } from './entities/Post';
dotenv.config({ path: __dirname + '\\..\\.env' });

const main = () => {
    MikroORM.init({
        entities: [Post],
        dbName: 'lireddit',
        type: 'postgresql',
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        debug: true,
    });
};

main();
