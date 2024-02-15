/**
 * @fileoverview gRPC-Web generated client stub for ai.nworx.api.proto.userworksheet.ratingrequestqp
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.1
// 	protoc              v4.22.2
// source: fetch-rating-request-qp.proto


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
proto.ai.nworx.api.proto.userworksheet = {};
proto.ai.nworx.api.proto.userworksheet.ratingrequestqp = require('./fetch-rating-request-qp_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.ai.nworx.api.proto.userworksheet.ratingrequestqp.FetchQPRatingServiceClient =
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
proto.ai.nworx.api.proto.userworksheet.ratingrequestqp.FetchQPRatingServicePromiseClient =
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
 *   !proto.ai.nworx.api.proto.userworksheet.ratingrequestqp.FetchQPRatingRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_FetchQPRatingService_fetchQPRatingRequests = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.userworksheet.ratingrequestqp.FetchQPRatingService/fetchQPRatingRequests',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.userworksheet.ratingrequestqp.FetchQPRatingRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.userworksheet.ratingrequestqp.FetchQPRatingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.userworksheet.ratingrequestqp.FetchQPRatingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.userworksheet.ratingrequestqp.FetchQPRatingServiceClient.prototype.fetchQPRatingRequests =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.userworksheet.ratingrequestqp.FetchQPRatingService/fetchQPRatingRequests',
      request,
      metadata || {},
      methodDescriptor_FetchQPRatingService_fetchQPRatingRequests,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.userworksheet.ratingrequestqp.FetchQPRatingRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.userworksheet.ratingrequestqp.FetchQPRatingServicePromiseClient.prototype.fetchQPRatingRequests =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.userworksheet.ratingrequestqp.FetchQPRatingService/fetchQPRatingRequests',
      request,
      metadata || {},
      methodDescriptor_FetchQPRatingService_fetchQPRatingRequests);
};


module.exports = proto.ai.nworx.api.proto.userworksheet.ratingrequestqp;
