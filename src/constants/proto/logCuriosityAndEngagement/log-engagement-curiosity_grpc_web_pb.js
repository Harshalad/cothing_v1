/**
 * @fileoverview gRPC-Web generated client stub for ai.nworx.api.proto.curiosityenagement
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.1
// 	protoc              v3.19.4
// source: log-engagement-curiosity.proto


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
proto.ai.nworx.api.proto.curiosityenagement = require('./log-engagement-curiosity_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.ai.nworx.api.proto.curiosityenagement.LogCuriosityEnagementServiceClient =
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
proto.ai.nworx.api.proto.curiosityenagement.LogCuriosityEnagementServicePromiseClient =
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
 *   !proto.ai.nworx.api.proto.curiosityenagement.LogCuriosityEnagementRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_LogCuriosityEnagementService_logCuriosityEnagement = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.curiosityenagement.LogCuriosityEnagementService/logCuriosityEnagement',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.curiosityenagement.LogCuriosityEnagementRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.curiosityenagement.LogCuriosityEnagementRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.curiosityenagement.LogCuriosityEnagementRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.curiosityenagement.LogCuriosityEnagementServiceClient.prototype.logCuriosityEnagement =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.curiosityenagement.LogCuriosityEnagementService/logCuriosityEnagement',
      request,
      metadata || {},
      methodDescriptor_LogCuriosityEnagementService_logCuriosityEnagement,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.curiosityenagement.LogCuriosityEnagementRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.curiosityenagement.LogCuriosityEnagementServicePromiseClient.prototype.logCuriosityEnagement =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.curiosityenagement.LogCuriosityEnagementService/logCuriosityEnagement',
      request,
      metadata || {},
      methodDescriptor_LogCuriosityEnagementService_logCuriosityEnagement);
};


module.exports = proto.ai.nworx.api.proto.curiosityenagement;

