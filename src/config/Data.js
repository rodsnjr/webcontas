var Sequelize = require('sequelize');
var md5 = require('md5');
/* Produção
var sequelize = new Sequelize(
    'd34j8iut6s3rm9', 
    'vaxlypenzpwnst', 
    '8ca31a7e4d59cd538a6a8c39902eeb99494851be3f2522258391ca15fa249aa7', 
{
    host: "ec2-54-225-66-44.compute-1.amazonaws.com",
    port: 5432,
    dialect: 'postgres'
});
*/
/* Develop */ 
var sequelize = new Sequelize('dbname', 'contasapp', '', {
    host: "localhost",
    port: 5432,
    dialect: 'postgres'
});

sequelize.sync().then(function(){
    return migration();
});