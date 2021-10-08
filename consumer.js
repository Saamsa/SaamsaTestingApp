"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createConsumer = void 0;
var Kafka = require("kafkajs");
/**
 * Creates a producer object for export later
 * @param groupId - required for consumer creation in Kafka
 * @param topic - topic that matches producer
 *
 */
var createConsumer = function (groupId, topic) { return __awaiter(void 0, void 0, void 0, function () {
    var kafka, consumer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                kafka = new Kafka.Kafka({
                    clientId: groupId,
                    brokers: ['kafka:9092'],
                    // authenticationTimeout: 1000,
                    // reauthenticationThreshold: 10000,
                    ssl: true,
                    sasl: {
                        mechanism: 'aws',
                        authorizationIdentity: 'arn:aws:iam::852274558021:user/DynamoDBTemp',
                        accessKeyId: 'AKIA4M34FWRC7OL2YPNK',
                        secretAccessKey: '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'
                    }
                });
                consumer = kafka.consumer({ groupId: 'test-group' });
                //  kafka.consumer.groupId = {groupId}; 
                return [4 /*yield*/, consumer.connect()];
            case 1:
                //  kafka.consumer.groupId = {groupId}; 
                _a.sent();
                return [4 /*yield*/, consumer.subscribe({ topic: topic, fromBeginning: true })];
            case 2:
                _a.sent();
                return [4 /*yield*/, consumer.run({
                        autoCommitInterval: 5000,
                        // eachMessage: awsConnector.sendEachMessage, -> to send to the DB 
                        eachMessage: function (_a) {
                            var topic = _a.topic, partition = _a.partition, message = _a.message;
                            return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_b) {
                                    try {
                                        // listen for each message being sent, and then send the messages to the DB
                                        console.log({
                                            key: message.key.toString(),
                                            value: message.value.toString(),
                                            headers: message.headers
                                        });
                                    }
                                    catch (err) {
                                        console.log("There was an error consuming messages in consumer.run: " + err);
                                    }
                                    return [2 /*return*/];
                                });
                            });
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.createConsumer = createConsumer;
createConsumer('CovidGroup1', 'initial_report');
