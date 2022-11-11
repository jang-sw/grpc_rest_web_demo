module.exports = (sequelize, DataTypes) =>{
    var board = sequelize.define('board',{
        seq:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        content:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    });

    return board;
};