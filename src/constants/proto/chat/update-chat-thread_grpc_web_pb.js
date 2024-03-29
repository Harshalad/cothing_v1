/**
 * @fileoverview gRPC-Web generated client stub for ai.nworx.api.proto.user.userchats
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.1
// 	protoc              v3.19.4
// source: update-chat-thread.proto


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
proto.ai.nworx.api.proto.user = {};
proto.ai.nworx.api.proto.user.userchats = require('./update-chat-thread_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.ai.nworx.api.proto.user.userchats.UpdateUserChatThreadServiceClient =
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
proto.ai.nworx.api.proto.user.userchats.UpdateUserChatThreadServicePromiseClient =
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
 *   !proto.ai.nworx.api.proto.user.userchats.CreateUserChatThread,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_UpdateUserChatThreadService_createChatThread = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.user.userchats.UpdateUserChatThreadService/createChatThread',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.user.userchats.CreateUserChatThread,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.user.userchats.CreateUserChatThread} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.user.userchats.CreateUserChatThread} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.user.userchats.UpdateUserChatThreadServiceClient.prototype.createChatThread =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.user.userchats.UpdateUserChatThreadService/createChatThread',
      request,
      metadata || {},
      methodDescriptor_UpdateUserChatThreadService_createChatThread,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.user.userchats.CreateUserChatThread} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.user.userchats.UpdateUserChatThreadServicePromiseClient.prototype.createChatThread =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.user.userchats.UpdateUserChatThreadService/createChatThread',
      request,
      metadata || {},
      methodDescriptor_UpdateUserChatThreadService_createChatThread);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.user.userchats.DeleteUserChatThread,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_UpdateUserChatThreadService_deleteChatMessage = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.user.userchats.UpdateUserChatThreadService/deleteChatMessage',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.user.userchats.DeleteUserChatThread,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.user.userchats.DeleteUserChatThread} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.user.userchats.DeleteUserChatThread} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.user.userchats.UpdateUserChatThreadServiceClient.prototype.deleteChatMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.user.userchats.UpdateUserChatThreadService/deleteChatMessage',
      request,
      metadata || {},
      methodDescriptor_UpdateUserChatThreadService_deleteChatMessage,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.user.userchats.DeleteUserChatThread} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.user.userchats.UpdateUserChatThreadServicePromiseClient.prototype.deleteChatMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.user.userchats.UpdateUserChatThreadService/deleteChatMessage',
      request,
      metadata || {},
      methodDescriptor_UpdateUserChatThreadService_deleteChatMessage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.user.userchats.addChatRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_UpdateUserChatThreadService_addChat = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.user.userchats.UpdateUserChatThreadService/addChat',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.user.userchats.addChatRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.user.userchats.addChatRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.user.userchats.addChatRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.user.userchats.UpdateUserChatThreadServiceClient.prototype.addChat =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.user.userchats.UpdateUserChatThreadService/addChat',
      request,
      metadata || {},
      methodDescriptor_UpdateUserChatThreadService_addChat,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.user.userchats.addChatRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.user.userchats.UpdateUserChatThreadServicePromiseClient.prototype.addChat =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.user.userchats.UpdateUserChatThreadService/addChat',
      request,
      metadata || {},
      methodDescriptor_UpdateUserChatThreadService_addChat);
};


module.exports = proto.ai.nworx.api.proto.user.userchats;

