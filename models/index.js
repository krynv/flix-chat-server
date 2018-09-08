import Sequelize from 'sequelize';
import config from '../config/db.config'

const sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: 'postgres',
    unerscored: true
});

const models = {
    User: sequelize.import('./user'),
    Channel: sequelize.import('./channel'),
    Message: sequelize.import('./message'),
    Group: sequelize.import('./group'),
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;