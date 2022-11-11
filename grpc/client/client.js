const PROTO_PATH = "../boards.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const BoardService = grpc.loadPackageDefinition(packageDefinition).BoardService;
const client = new BoardService(
    "localhost:12010",
    grpc.credentials.createInsecure()
)

module.exports = client