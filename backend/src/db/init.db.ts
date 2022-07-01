import { iRobot, RobotModel } from '../models/robot.model.js';
import { iUser, User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { mongooseConnect } from './mongoose.js';

let aUsers: Array<iUser> = [
    {
        name: 'Pepe',
        passwd: '1234',
        email: 'pepe@sample.com',
        robots: [],
    },
    {
        name: 'Luisa',
        passwd: '1234',
        email: 'luisa@acme.com',
        robots: [],
    },
];

const aRobot: Array<iRobot> = [
    {
        name: 'robot1',
        img: 'test',
        velocity: 1,
        resistence: 2,
        date: 'test',
        owner: null,
    },
    {
        name: 'robot2',
        img: 'test',
        velocity: 3,
        resistence: 4,
        date: 'test',
        owner: null,
    },
];

export const initDB = async () => {
    const connect = await mongooseConnect();
    aUsers = await Promise.all(
        aUsers.map(async (item) => ({
            ...item,
            passwd: await bcrypt.hash(item.passwd, 10),
        }))
    );
    const users = await User.insertMany(aUsers);
    aRobot[0].owner = users[0].id;
    aRobot[1].owner = users[1].id;
    const robots = await RobotModel.insertMany(aRobot);

    let finalUsers = [];
    for (let i = 0; i < users.length; i++) {
        const item = users[i];
        finalUsers[i] = await User.findByIdAndUpdate(
            item.id,
            {
                $set: { robots: [robots[i].id] },
            },
            { new: true }
        );
    }

    connect.disconnect();
    return {
        robots,
        users: finalUsers,
    };
};
