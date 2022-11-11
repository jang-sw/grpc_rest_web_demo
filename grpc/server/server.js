const PROTO_PATH = "./boards.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    arrays: true
}
const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const boardsProto = grpc.loadPackageDefinition(packageDefinition);
const { Boards } = require('./models')
const server = new grpc.Server()

server.addService(boardsProto.BoardService.service, {
    getBoardBaseInfos: async (_, callback) => {
        let boardBaseInfos = await Boards.findAll({attributes: ['seq','title']});
        callback( null, {boardBaseInfos} );
    },
    getBoardDetail: async (call, callback) => {
        let res = await Boards.findOne({where: {seq:call.request.seq}});
        callback(null, res);
    },
    updateBoard: (call, callback) => {
        let board = call.request
        Boards.update(
            {
                title: board.title, 
                content: board.content 
            },
            {
                where: {seq: board.seq}
            }
        ).then((result) => {
            callback(null, board);
        }).catch((err) => {
            console.log(err);
            callback(null, {
                code: grpc.status.UNKNOWN,
                details: err
            });
        });
    },
    insertBoard: (call, callback) => {
        let board = call.request
        Boards.create({
            title: board.title, 
            content: board.content 
        }).then(() => {
            callback(null, board);
        }).catch((err) => {
            console.log(err);
            callback(null, {
                code: grpc.status.UNKNOWN,
                details: err
            });
        });
    },
    removeBoard: (call, callback) => {
        Boards.destroy(
            {where: {seq: call.request.seq}
        }).then((result) => {
            callback(null, {})
        }).catch((err) => {
            console.log(err);
            callback({
                code: grpc.status.NOT_FOUND,
                details: err
            })        
        });
    }
})

const BIND_ADDRESS = "127.0.0.1:12010"
server.bindAsync(
    BIND_ADDRESS,
    grpc.ServerCredentials.createInsecure(),
    function () {
        console.log("::::: gRPC SERVER is START :::::"); 
        server.start()
    } 
); 

