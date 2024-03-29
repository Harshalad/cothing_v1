/**
 * @fileoverview gRPC-Web generated client stub for ai.nworx.api.proto.analyse
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v4.22.2
// source: analyse.proto


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
proto.ai.nworx.api.proto.analyse = require('./analyse_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.ai.nworx.api.proto.analyse.AnalyseServiceClient =
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
proto.ai.nworx.api.proto.analyse.AnalyseServicePromiseClient =
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
 *   !proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AnalyseService_fetchActiveAssessments = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.analyse.AnalyseService/fetchActiveAssessments',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.analyse.AnalyseServiceClient.prototype.fetchActiveAssessments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchActiveAssessments',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchActiveAssessments,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.analyse.AnalyseServicePromiseClient.prototype.fetchActiveAssessments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchActiveAssessments',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchActiveAssessments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AnalyseService_fetchAvailableAssessments = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.analyse.AnalyseService/fetchAvailableAssessments',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.analyse.AnalyseServiceClient.prototype.fetchAvailableAssessments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchAvailableAssessments',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchAvailableAssessments,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.analyse.AnalyseServicePromiseClient.prototype.fetchAvailableAssessments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchAvailableAssessments',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchAvailableAssessments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AnalyseService_fetchCompletedAssessments = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.analyse.AnalyseService/fetchCompletedAssessments',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.analyse.AnalyseServiceClient.prototype.fetchCompletedAssessments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchCompletedAssessments',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchCompletedAssessments,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.analyse.AnalyseServicePromiseClient.prototype.fetchCompletedAssessments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchCompletedAssessments',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchCompletedAssessments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AnalyseService_fetchActiveSeekMRA = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.analyse.AnalyseService/fetchActiveSeekMRA',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.analyse.AnalyseServiceClient.prototype.fetchActiveSeekMRA =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchActiveSeekMRA',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchActiveSeekMRA,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.analyse.AnalyseServicePromiseClient.prototype.fetchActiveSeekMRA =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchActiveSeekMRA',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchActiveSeekMRA);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AnalyseService_fetchAvailableSeekMRA = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.analyse.AnalyseService/fetchAvailableSeekMRA',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.analyse.AnalyseServiceClient.prototype.fetchAvailableSeekMRA =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchAvailableSeekMRA',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchAvailableSeekMRA,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.analyse.AnalyseServicePromiseClient.prototype.fetchAvailableSeekMRA =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchAvailableSeekMRA',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchAvailableSeekMRA);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AnalyseService_fetchCompletedSeekMRA = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.analyse.AnalyseService/fetchCompletedSeekMRA',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.analyse.AnalyseServiceClient.prototype.fetchCompletedSeekMRA =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchCompletedSeekMRA',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchCompletedSeekMRA,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.analyse.AnalyseServicePromiseClient.prototype.fetchCompletedSeekMRA =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchCompletedSeekMRA',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchCompletedSeekMRA);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AnalyseService_fetchActiveGiveMRA = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.analyse.AnalyseService/fetchActiveGiveMRA',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.analyse.AnalyseServiceClient.prototype.fetchActiveGiveMRA =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchActiveGiveMRA',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchActiveGiveMRA,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.analyse.AnalyseServicePromiseClient.prototype.fetchActiveGiveMRA =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchActiveGiveMRA',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchActiveGiveMRA);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AnalyseService_fetchCompletedGiveMRA = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.analyse.AnalyseService/fetchCompletedGiveMRA',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.analyse.AnalyseServiceClient.prototype.fetchCompletedGiveMRA =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchCompletedGiveMRA',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchCompletedGiveMRA,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.analyse.AnalyseServicePromiseClient.prototype.fetchCompletedGiveMRA =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchCompletedGiveMRA',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchCompletedGiveMRA);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AnalyseService_fetchAnalyseAssessments = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.analyse.AnalyseService/fetchAnalyseAssessments',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.analyse.AnalyseServiceClient.prototype.fetchAnalyseAssessments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchAnalyseAssessments',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchAnalyseAssessments,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.analyse.AnalyseServicePromiseClient.prototype.fetchAnalyseAssessments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchAnalyseAssessments',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchAnalyseAssessments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AnalyseService_fetchAnalyseSeekMRA = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.analyse.AnalyseService/fetchAnalyseSeekMRA',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.analyse.AnalyseServiceClient.prototype.fetchAnalyseSeekMRA =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchAnalyseSeekMRA',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchAnalyseSeekMRA,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchAnalyseRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.analyse.AnalyseServicePromiseClient.prototype.fetchAnalyseSeekMRA =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchAnalyseSeekMRA',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchAnalyseSeekMRA);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.analyse.FetchBatteryRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AnalyseService_fetchBatteryDetails = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.analyse.AnalyseService/fetchBatteryDetails',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.analyse.FetchBatteryRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.analyse.FetchBatteryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchBatteryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.analyse.AnalyseServiceClient.prototype.fetchBatteryDetails =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchBatteryDetails',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchBatteryDetails,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchBatteryRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.analyse.AnalyseServicePromiseClient.prototype.fetchBatteryDetails =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchBatteryDetails',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchBatteryDetails);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.nworx.api.proto.analyse.FetchBatteryGroupRequest,
 *   !proto.ai.nworx.api.proto.common.ResponseProto>}
 */
const methodDescriptor_AnalyseService_fetchBatteryGroupDetails = new grpc.web.MethodDescriptor(
  '/ai.nworx.api.proto.analyse.AnalyseService/fetchBatteryGroupDetails',
  grpc.web.MethodType.UNARY,
  proto.ai.nworx.api.proto.analyse.FetchBatteryGroupRequest,
  common_common_pb.ResponseProto,
  /**
   * @param {!proto.ai.nworx.api.proto.analyse.FetchBatteryGroupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  common_common_pb.ResponseProto.deserializeBinary
);


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchBatteryGroupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ai.nworx.api.proto.common.ResponseProto)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ai.nworx.api.proto.common.ResponseProto>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ai.nworx.api.proto.analyse.AnalyseServiceClient.prototype.fetchBatteryGroupDetails =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchBatteryGroupDetails',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchBatteryGroupDetails,
      callback);
};


/**
 * @param {!proto.ai.nworx.api.proto.analyse.FetchBatteryGroupRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ai.nworx.api.proto.common.ResponseProto>}
 *     Promise that resolves to the response
 */
proto.ai.nworx.api.proto.analyse.AnalyseServicePromiseClient.prototype.fetchBatteryGroupDetails =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ai.nworx.api.proto.analyse.AnalyseService/fetchBatteryGroupDetails',
      request,
      metadata || {},
      methodDescriptor_AnalyseService_fetchBatteryGroupDetails);
};


module.exports = proto.ai.nworx.api.proto.analyse;

