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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var milvus2_sdk_node_1 = require("@zilliz/milvus2-sdk-node");
var Common_1 = require("@zilliz/milvus2-sdk-node/dist/milvus/types/Common");
var milvusClient = new milvus2_sdk_node_1.MilvusClient("localhost:19530");
var collectionManager = milvusClient.collectionManager;
console.log("Milvus SDK Info: ", milvus2_sdk_node_1.MilvusClient.sdkInfo);
var generateInsertData = function generateInsertData(fields, count) {
    var results = [];
    var _loop_1 = function () {
        var value = {};
        fields.forEach(function (v) {
            var isVector = v.isVector, dim = v.dim, name = v.name, isBool = v.isBool;
            value[name] = isVector
                ? __spreadArray([], Array(dim), true).map(function () { return Math.random() * 10; })
                : isBool
                    ? count % 2 === 0
                    : count;
        });
        value["count"] = count;
        results.push(value);
        count--;
    };
    while (count > 0) {
        _loop_1();
    }
    return results;
};
var hello_milvus = function () { return __awaiter(void 0, void 0, void 0, function () {
    var checkVersion, collectionName, dim, createRes, showCollectionRes, hasCollectionRes, fields, vectorsData, params, loadCollectionRes, result, releaseRes, dropRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, milvusClient.checkVersion()];
            case 1:
                checkVersion = _a.sent();
                console.log("--- check version ---", checkVersion);
                collectionName = "hello_milvus";
                dim = "4";
                return [4 /*yield*/, collectionManager.createCollection({
                        collection_name: collectionName,
                        fields: [
                            {
                                name: "count",
                                data_type: Common_1.DataType.Int64,
                                is_primary_key: true,
                                description: ""
                            },
                            {
                                name: "random_value",
                                data_type: Common_1.DataType.Double,
                                description: ""
                            },
                            {
                                name: "float_vector",
                                data_type: Common_1.DataType.FloatVector,
                                description: "",
                                type_params: {
                                    dim: dim
                                }
                            },
                        ]
                    })];
            case 2:
                createRes = _a.sent();
                console.log("--- Create collection ---", createRes, collectionName);
                return [4 /*yield*/, collectionManager.showCollections()];
            case 3:
                showCollectionRes = _a.sent();
                console.log("--- Show collections ---", showCollectionRes);
                return [4 /*yield*/, collectionManager.hasCollection({
                        collection_name: collectionName
                    })];
            case 4:
                hasCollectionRes = _a.sent();
                console.log("--- Has collection (" + collectionName + ") ---", hasCollectionRes);
                fields = [
                    {
                        isVector: true,
                        dim: 4,
                        name: "float_vector"
                    },
                    {
                        isVector: false,
                        name: "random_value"
                    },
                ];
                vectorsData = generateInsertData(fields, 100);
                params = {
                    collection_name: collectionName,
                    fields_data: vectorsData
                };
                return [4 /*yield*/, milvusClient.dataManager.insert(params)];
            case 5:
                _a.sent();
                console.log("--- Insert Data to Collection ---");
                return [4 /*yield*/, milvusClient.indexManager.createIndex({
                        collection_name: collectionName,
                        field_name: "float_vector",
                        extra_params: {
                            index_type: "IVF_FLAT",
                            metric_type: "L2",
                            params: JSON.stringify({ nlist: 10 })
                        }
                    })];
            case 6:
                _a.sent();
                console.log("--- Create Index in Collection ---");
                return [4 /*yield*/, collectionManager.loadCollectionSync({
                        collection_name: collectionName
                    })];
            case 7:
                loadCollectionRes = _a.sent();
                console.log("--- Load collection (" + collectionName + ") ---", loadCollectionRes);
                return [4 /*yield*/, milvusClient.dataManager.search({
                        collection_name: collectionName,
                        vectors: [vectorsData[0]["float_vector"]],
                        search_params: {
                            anns_field: "float_vector",
                            topk: "4",
                            metric_type: "L2",
                            params: JSON.stringify({ nprobe: 1024 }),
                            round_decimal: 4
                        },
                        output_fields: ["count"],
                        vector_type: Common_1.DataType.FloatVector
                    })];
            case 8:
                result = _a.sent();
                console.log("--- Search collection (" + collectionName + ") ---", result);
                return [4 /*yield*/, collectionManager.releaseCollection({
                        collection_name: collectionName
                    })];
            case 9:
                releaseRes = _a.sent();
                console.log("--- Release Collection ---", releaseRes);
                return [4 /*yield*/, collectionManager.dropCollection({
                        collection_name: collectionName
                    })];
            case 10:
                dropRes = _a.sent();
                console.log("--- Drop Collection ---", dropRes);
                return [2 /*return*/];
        }
    });
}); };
hello_milvus();
