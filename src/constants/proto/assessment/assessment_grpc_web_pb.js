/**
 * @fileoverview gRPC-Web generated client stub for ai.nworx.api.proto.assessment
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v3.14.0
// source: assessment.proto


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
proto.ai.nworx.api.proto.assessment = require('./assessment_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.ai.nworx.api.proto.assessment.AssessmentServiceClient =
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
proto.ai.nworx.api.proto.assessment.AssessmentServicePromiseClient =
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
 *   !proto.ai.nworx.api.proto.assessment.CreateUserTestRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AssessmentService_createUserTestMap = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.assessment.AssessmentService/createUserTestMap',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.assessment.CreateUserTestRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.assessment.CreateUserTestRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.assessment.CreateUserTestRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.assessment.AssessmentServiceClient.prototype.createUserTestMap =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.assessment.AssessmentService/createUserTestMap',
      request,
      metadata || {},
      methodDescriptor_AssessmentService_createUserTestMap,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.assessment.CreateUserTestRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.assessment.AssessmentServicePromiseClient.prototype.createUserTestMap =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.assessment.AssessmentService/createUserTestMap',
      request,
      metadata || {},
      methodDescriptor_AssessmentService_createUserTestMap);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.assessment.TestDetailsRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AssessmentService_fetchTestDetails = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.assessment.AssessmentService/fetchTestDetails',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.assessment.TestDetailsRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.assessment.TestDetailsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.assessment.TestDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.assessment.AssessmentServiceClient.prototype.fetchTestDetails =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.assessment.AssessmentService/fetchTestDetails',
      request,
      metadata || {},
      methodDescriptor_AssessmentService_fetchTestDetails,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.assessment.TestDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.assessment.AssessmentServicePromiseClient.prototype.fetchTestDetails =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.assessment.AssessmentService/fetchTestDetails',
      request,
      metadata || {},
      methodDescriptor_AssessmentService_fetchTestDetails);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.assessment.TestDetailsRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AssessmentService_fetchQuestions = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.assessment.AssessmentService/fetchQuestions',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.assessment.TestDetailsRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.assessment.TestDetailsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.assessment.TestDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.assessment.AssessmentServiceClient.prototype.fetchQuestions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.assessment.AssessmentService/fetchQuestions',
      request,
      metadata || {},
      methodDescriptor_AssessmentService_fetchQuestions,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.assessment.TestDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.assessment.AssessmentServicePromiseClient.prototype.fetchQuestions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.assessment.AssessmentService/fetchQuestions',
      request,
      metadata || {},
      methodDescriptor_AssessmentService_fetchQuestions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.assessment.TestDetailsRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AssessmentService_fetchTestStartDate = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.assessment.AssessmentService/fetchTestStartDate',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.assessment.TestDetailsRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.assessment.TestDetailsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.assessment.TestDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.assessment.AssessmentServiceClient.prototype.fetchTestStartDate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.assessment.AssessmentService/fetchTestStartDate',
      request,
      metadata || {},
      methodDescriptor_AssessmentService_fetchTestStartDate,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.assessment.TestDetailsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.assessment.AssessmentServicePromiseClient.prototype.fetchTestStartDate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.assessment.AssessmentService/fetchTestStartDate',
      request,
      metadata || {},
      methodDescriptor_AssessmentService_fetchTestStartDate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.assessment.SubmitAnswerRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AssessmentService_submitAnswer = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.assessment.AssessmentService/submitAnswer',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.assessment.SubmitAnswerRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.assessment.SubmitAnswerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.assessment.SubmitAnswerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.assessment.AssessmentServiceClient.prototype.submitAnswer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.assessment.AssessmentService/submitAnswer',
      request,
      metadata || {},
      methodDescriptor_AssessmentService_submitAnswer,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.assessment.SubmitAnswerRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.assessment.AssessmentServicePromiseClient.prototype.submitAnswer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.assessment.AssessmentService/submitAnswer',
      request,
      metadata || {},
      methodDescriptor_AssessmentService_submitAnswer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.assessment.SubmitTestRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AssessmentService_submitTest = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.assessment.AssessmentService/submitTest',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.assessment.SubmitTestRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.assessment.SubmitTestRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.assessment.SubmitTestRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.assessment.AssessmentServiceClient.prototype.submitTest =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.assessment.AssessmentService/submitTest',
      request,
      metadata || {},
      methodDescriptor_AssessmentService_submitTest,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.assessment.SubmitTestRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.assessment.AssessmentServicePromiseClient.prototype.submitTest =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.assessment.AssessmentService/submitTest',
      request,
      metadata || {},
      methodDescriptor_AssessmentService_submitTest);
};


module.exports = proto.ai.nworx.api.proto.assessment;
