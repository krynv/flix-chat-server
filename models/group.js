export default (sequelize, DataTypes) => {

    const Group = sequelize.define("group", {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
    });

    Group.associate = (models) => {

        Group.belongsToMany(models.User, {
            through: 'member',
            foreignKey: 'teamId',
        });

        Group.belongsTo(models.User, {
            foreignKey: 'owner',
        });
    }

    return Group;
}