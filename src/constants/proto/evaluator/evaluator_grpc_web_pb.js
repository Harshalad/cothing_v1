/**
 * @fileoverview gRPC-Web generated client stub for ai.nworx.api.proto.evaluator
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v4.22.2
// source: evaluator.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var common_common_pb = require('./common/common_pb.js')
const proto = {};
proto.ai = {};
proto.ai.nworx = {};
proto.ai.nworx.api = {};
proto.ai.nworx.api.proto = {};
proto.ai.nworx.api.proto.evaluator = require('./evaluator_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.evaluator.FetchTestOfEvaluatorRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_EvaluatorService_fetchPendingTestEvaluation = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.evaluator.EvaluatorService/fetchPendingTestEvaluation',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.evaluator.FetchTestOfEvaluatorRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.evaluator.FetchTestOfEvaluatorRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.evaluator.FetchTestOfEvaluatorRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServiceClient.prototype.fetchPendingTestEvaluation =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.evaluator.EvaluatorService/fetchPendingTestEvaluation',
      request,
      metadata || {},
      methodDescriptor_EvaluatorService_fetchPendingTestEvaluation,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.evaluator.FetchTestOfEvaluatorRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServicePromiseClient.prototype.fetchPendingTestEvaluation =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.evaluator.EvaluatorService/fetchPendingTestEvaluation',
      request,
      metadata || {},
      methodDescriptor_EvaluatorService_fetchPendingTestEvaluation);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.evaluator.FetchTestOfEvaluatorRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_EvaluatorService_fetchInProgressTestEvaluation = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.evaluator.EvaluatorService/fetchInProgressTestEvaluation',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.evaluator.FetchTestOfEvaluatorRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.evaluator.FetchTestOfEvaluatorRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.evaluator.FetchTestOfEvaluatorRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServiceClient.prototype.fetchInProgressTestEvaluation =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.evaluator.EvaluatorService/fetchInProgressTestEvaluation',
      request,
      metadata || {},
      methodDescriptor_EvaluatorService_fetchInProgressTestEvaluation,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.evaluator.FetchTestOfEvaluatorRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServicePromiseClient.prototype.fetchInProgressTestEvaluation =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.evaluator.EvaluatorService/fetchInProgressTestEvaluation',
      request,
      metadata || {},
      methodDescriptor_EvaluatorService_fetchInProgressTestEvaluation);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.evaluator.FetchTestOfEvaluatorRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_EvaluatorService_fetchCompletedTestEvaluation = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.evaluator.EvaluatorService/fetchCompletedTestEvaluation',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.evaluator.FetchTestOfEvaluatorRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.evaluator.FetchTestOfEvaluatorRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.evaluator.FetchTestOfEvaluatorRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServiceClient.prototype.fetchCompletedTestEvaluation =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.evaluator.EvaluatorService/fetchCompletedTestEvaluation',
      request,
      metadata || {},
      methodDescriptor_EvaluatorService_fetchCompletedTestEvaluation,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.evaluator.FetchTestOfEvaluatorRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServicePromiseClient.prototype.fetchCompletedTestEvaluation =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.evaluator.EvaluatorService/fetchCompletedTestEvaluation',
      request,
      metadata || {},
      methodDescriptor_EvaluatorService_fetchCompletedTestEvaluation);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.evaluator.StartEvaluationRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_EvaluatorService_startEvaluation = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.evaluator.EvaluatorService/startEvaluation',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.evaluator.StartEvaluationRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.evaluator.StartEvaluationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.evaluator.StartEvaluationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServiceClient.prototype.startEvaluation =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.evaluator.EvaluatorService/startEvaluation',
      request,
      metadata || {},
      methodDescriptor_EvaluatorService_startEvaluation,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.evaluator.StartEvaluationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServicePromiseClient.prototype.startEvaluation =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.evaluator.EvaluatorService/startEvaluation',
      request,
      metadata || {},
      methodDescriptor_EvaluatorService_startEvaluation);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.evaluator.FinishEvaluationRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_EvaluatorService_finishEvaluation = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.evaluator.EvaluatorService/finishEvaluation',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.evaluator.FinishEvaluationRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.evaluator.FinishEvaluationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.evaluator.FinishEvaluationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServiceClient.prototype.finishEvaluation =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.evaluator.EvaluatorService/finishEvaluation',
      request,
      metadata || {},
      methodDescriptor_EvaluatorService_finishEvaluation,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.evaluator.FinishEvaluationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServicePromiseClient.prototype.finishEvaluation =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.evaluator.EvaluatorService/finishEvaluation',
      request,
      metadata || {},
      methodDescriptor_EvaluatorService_finishEvaluation);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.evaluator.FetchAnswersForEvaluationRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_EvaluatorService_fetchAnswersForEvaluation = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.evaluator.EvaluatorService/fetchAnswersForEvaluation',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.evaluator.FetchAnswersForEvaluationRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.evaluator.FetchAnswersForEvaluationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.evaluator.FetchAnswersForEvaluationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServiceClient.prototype.fetchAnswersForEvaluation =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.evaluator.EvaluatorService/fetchAnswersForEvaluation',
      request,
      metadata || {},
      methodDescriptor_EvaluatorService_fetchAnswersForEvaluation,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.evaluator.FetchAnswersForEvaluationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServicePromiseClient.prototype.fetchAnswersForEvaluation =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.evaluator.EvaluatorService/fetchAnswersForEvaluation',
      request,
      metadata || {},
      methodDescriptor_EvaluatorService_fetchAnswersForEvaluation);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.evaluator.EvaluateAnswerRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_EvaluatorService_evaluateAnswer = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.evaluator.EvaluatorService/evaluateAnswer',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.evaluator.EvaluateAnswerRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.evaluator.EvaluateAnswerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.evaluator.EvaluateAnswerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServiceClient.prototype.evaluateAnswer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.evaluator.EvaluatorService/evaluateAnswer',
      request,
      metadata || {},
      methodDescriptor_EvaluatorService_evaluateAnswer,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.evaluator.EvaluateAnswerRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.evaluator.EvaluatorServicePromiseClient.prototype.evaluateAnswer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.evaluator.EvaluatorService/evaluateAnswer',
      request,
      metadata || {},
      methodDescriptor_EvaluatorService_evaluateAnswer);
};


module.exports = proto.ai.nworx.api.proto.evaluator;

