export default (sequelize, DataTypes) => {

    const Group = sequelize.define('group', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
    },
        {
            underscored: true,
        });

    Group.associate = (models) => {

        Group.belongsToMany(models.User, {
            through: 'member',
            foreignKey: {
                name: 'groupId',
                field: 'group_id',
            },
        });

        Group.belongsTo(models.User, {
            foreignKey: 'owner',
        });
    };

    return Group;
};