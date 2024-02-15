// source: share-manager-prep.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

var common_common_pb = require('./common/common_pb.js');
goog.object.extend(proto, common_common_pb);
goog.exportSymbol('proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.displayName = 'proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    worksheetid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    userid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    programid: jspb.Message.getFieldWithDefault(msg, 3, ""),
    qp: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    sharemanager: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest}
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest;
  return proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest}
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setWorksheetid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setProgramid(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setQp(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setSharemanager(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWorksheetid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getProgramid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getQp();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getSharemanager();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional string worksheetId = 1;
 * @return {string}
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.prototype.getWorksheetid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest} returns this
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.prototype.setWorksheetid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string userId = 2;
 * @return {string}
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest} returns this
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string programId = 3;
 * @return {string}
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.prototype.getProgramid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest} returns this
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.prototype.setProgramid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool qp = 4;
 * @return {boolean}
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.prototype.getQp = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest} returns this
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.prototype.setQp = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional string shareManager = 5;
 * @return {string}
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.prototype.getSharemanager = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest} returns this
 */
proto.ai.nworx.api.proto.sharemanager.ShareManagerPrepRequest.prototype.setSharemanager = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


goog.object.extend(exports, proto.ai.nworx.api.proto.sharemanager);