/**
 * @fileoverview gRPC-Web generated client stub for ai.nworx.api.proto.userprogram
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.1
// 	protoc              v3.19.4
// source: update-user-program.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')

var common_common_pb = require('./common/common_pb.js')
const proto = {};
proto.ai = {};
proto.ai.nworx = {};
proto.ai.nworx.api = {};
proto.ai.nworx.api.proto = {};
proto.ai.nworx.api.proto.userprogram = require('./update-user-program_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.ai.nworx.api.proto.userprogram.UpdateUserProgramServiceClient =
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
proto.ai.nworx.api.proto.userprogram.UpdateUserProgramServicePromiseClient =
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
 *   !proto.ai.nworx.api.proto.userprogram.UpdateRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_UpdateUserProgramService_updateUserGoal = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.userprogram.UpdateUserProgramService/updateUserGoal',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.userprogram.UpdateRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.userprogram.UpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.userprogram.UpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.userprogram.UpdateUserProgramServiceClient.prototype.updateUserGoal =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.userprogram.UpdateUserProgramService/updateUserGoal',
      request,
      metadata || {},
      methodDescriptor_UpdateUserProgramService_updateUserGoal,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.userprogram.UpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.userprogram.UpdateUserProgramServicePromiseClient.prototype.updateUserGoal =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.userprogram.UpdateUserProgramService/updateUserGoal',
      request,
      metadata || {},
      methodDescriptor_UpdateUserProgramService_updateUserGoal);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.userprogram.addGoalAlignmentQuestionAnswerRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_UpdateUserProgramService_addGoalAlignmentQuestionAnswer = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.userprogram.UpdateUserProgramService/addGoalAlignmentQuestionAnswer',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.userprogram.addGoalAlignmentQuestionAnswerRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.userprogram.addGoalAlignmentQuestionAnswerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.userprogram.addGoalAlignmentQuestionAnswerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.userprogram.UpdateUserProgramServiceClient.prototype.addGoalAlignmentQuestionAnswer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.userprogram.UpdateUserProgramService/addGoalAlignmentQuestionAnswer',
      request,
      metadata || {},
      methodDescriptor_UpdateUserProgramService_addGoalAlignmentQuestionAnswer,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.userprogram.addGoalAlignmentQuestionAnswerRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.userprogram.UpdateUserProgramServicePromiseClient.prototype.addGoalAlignmentQuestionAnswer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.userprogram.UpdateUserProgramService/addGoalAlignmentQuestionAnswer',
      request,
      metadata || {},
      methodDescriptor_UpdateUserProgramService_addGoalAlignmentQuestionAnswer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.userprogram.addProgramGoalToUserGoalRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_UpdateUserProgramService_addProgramGoalToUserGoal = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.userprogram.UpdateUserProgramService/addProgramGoalToUserGoal',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.userprogram.addProgramGoalToUserGoalRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.userprogram.addProgramGoalToUserGoalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.userprogram.addProgramGoalToUserGoalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.userprogram.UpdateUserProgramServiceClient.prototype.addProgramGoalToUserGoal =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.userprogram.UpdateUserProgramService/addProgramGoalToUserGoal',
      request,
      metadata || {},
      methodDescriptor_UpdateUserProgramService_addProgramGoalToUserGoal,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.userprogram.addProgramGoalToUserGoalRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.userprogram.UpdateUserProgramServicePromiseClient.prototype.addProgramGoalToUserGoal =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.userprogram.UpdateUserProgramService/addProgramGoalToUserGoal',
      request,
      metadata || {},
      methodDescriptor_UpdateUserProgramService_addProgramGoalToUserGoal);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.userprogram.AddAQinUserGoalRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_UpdateUserProgramService_addAQinUserGoal = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.userprogram.UpdateUserProgramService/addAQinUserGoal',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.userprogram.AddAQinUserGoalRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.userprogram.AddAQinUserGoalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.userprogram.AddAQinUserGoalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.userprogram.UpdateUserProgramServiceClient.prototype.addAQinUserGoal =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.userprogram.UpdateUserProgramService/addAQinUserGoal',
      request,
      metadata || {},
      methodDescriptor_UpdateUserProgramService_addAQinUserGoal,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.userprogram.AddAQinUserGoalRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.userprogram.UpdateUserProgramServicePromiseClient.prototype.addAQinUserGoal =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.userprogram.UpdateUserProgramService/addAQinUserGoal',
      request,
      metadata || {},
      methodDescriptor_UpdateUserProgramService_addAQinUserGoal);
};


module.exports = proto.ai.nworx.api.proto.userprogram;
