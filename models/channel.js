export default (sequelize, DataTypes) => {

    const Channel = sequelize.define("channel", {
        name: DataTypes.STRING,
        public: DataTypes.BOOLEAN,
    });

    Channel.associate = (models) => {
        // 1 to many
        Channel.belongsTo(models.Group, {
            foreignKey: 'groupId',
        });
    }

    return Channel;
}