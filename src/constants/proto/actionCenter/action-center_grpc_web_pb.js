/**
 * @fileoverview gRPC-Web generated client stub for ai.nworx.proto.actioncenter
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v4.22.2
// source: action-center.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var common_common_pb = require('./common/common_pb.js')
const proto = {};
proto.ai = {};
proto.ai.nworx = {};
proto.ai.nworx.proto = {};
proto.ai.nworx.proto.actioncenter = require('./action-center_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.ai.nworx.proto.actioncenter.ActionCenterServiceClient =
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
proto.ai.nworx.proto.actioncenter.ActionCenterServicePromiseClient =
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
 *   !proto.ai.nworx.proto.actioncenter.FetchProgressTrackerRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_ActionCenterService_fetchProgressTracker = new grpc.web.MethodDescriptor(
  '/ai.nworx.proto.actioncenter.ActionCenterService/fetchProgressTracker',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.proto.actioncenter.FetchProgressTrackerRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.proto.actioncenter.FetchProgressTrackerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.proto.actioncenter.FetchProgressTrackerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.proto.actioncenter.ActionCenterServiceClient.prototype.fetchProgressTracker =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.proto.actioncenter.ActionCenterService/fetchProgressTracker',
      request,
      metadata || {},
      methodDescriptor_ActionCenterService_fetchProgressTracker,
      callback);
};


/**
 * @param {!proto.ai.nworx.proto.actioncenter.FetchProgressTrackerRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.proto.actioncenter.ActionCenterServicePromiseClient.prototype.fetchProgressTracker =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.proto.actioncenter.ActionCenterService/fetchProgressTracker',
      request,
      metadata || {},
      methodDescriptor_ActionCenterService_fetchProgressTracker);
};


module.exports = proto.ai.nworx.proto.actioncenter;

