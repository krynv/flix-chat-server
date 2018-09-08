
import Sequelize from 'sequelize';
import config from '../config/db.config';

const sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: 'postgres',
});
const ASSOCIATE = 'associate';

const models = {
    User: sequelize.import('./user'),
    Channel: sequelize.import('./channel'),
    Group: sequelize.import('./group'),
    Message: sequelize.import('./message'),
};

Object.keys(models).forEach((modelName) => {
    if (models[modelName] && models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;