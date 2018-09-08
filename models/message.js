export default (sequelize, DataTypes) => {

    const Message = sequelize.define("message", {
        text: DataTypes.STRING,
    });

    Message.associate = (models) => {
        // 1 to many
        Message.belongsTo(models.Channel, {
            foreignKey: 'channelId',
        });

        // 1 to many
        Message.belongsTo(models.User, {
            foreignKey: 'userId',
        });
    }

    return Message;
}