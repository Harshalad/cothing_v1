// source: fetch-nworx-central-user.proto
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

goog.exportSymbol('proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest', null, global);
goog.exportSymbol('proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse', null, global);
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
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest.displayName = 'proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest';
}
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
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.displayName = 'proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse';
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
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    emailmobile: jspb.Message.getFieldWithDefault(msg, 1, "")
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
 * @return {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest}
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest;
  return proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest}
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmailmobile(value);
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
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEmailmobile();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string emailMobile = 1;
 * @return {string}
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest.prototype.getEmailmobile = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest} returns this
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserRequest.prototype.setEmailmobile = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





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
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    statuscode: jspb.Message.getFieldWithDefault(msg, 1, 0),
    extra: jspb.Message.getFieldWithDefault(msg, 2, ""),
    mfaenabled: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    isverifieduser: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    ssoenabled: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    mobile: jspb.Message.getFieldWithDefault(msg, 6, ""),
    baseurl: jspb.Message.getFieldWithDefault(msg, 7, "")
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
 * @return {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse}
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse;
  return proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse}
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatuscode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setExtra(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setMfaenabled(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsverifieduser(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSsoenabled(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setMobile(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setBaseurl(value);
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
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatuscode();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getExtra();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMfaenabled();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getIsverifieduser();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getSsoenabled();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getMobile();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getBaseurl();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * optional int32 statusCode = 1;
 * @return {number}
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.getStatuscode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse} returns this
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.setStatuscode = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string extra = 2;
 * @return {string}
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.getExtra = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse} returns this
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.setExtra = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool mfaEnabled = 3;
 * @return {boolean}
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.getMfaenabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse} returns this
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.setMfaenabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool isVerifiedUser = 4;
 * @return {boolean}
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.getIsverifieduser = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse} returns this
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.setIsverifieduser = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional bool ssoEnabled = 5;
 * @return {boolean}
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.getSsoenabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse} returns this
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.setSsoenabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional string mobile = 6;
 * @return {string}
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.getMobile = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse} returns this
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.setMobile = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string baseUrl = 7;
 * @return {string}
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.getBaseurl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse} returns this
 */
proto.ai.nworx.api.proto.nworxcentraluser.FetchNworxCentralUserResponse.prototype.setBaseurl = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


goog.object.extend(exports, proto.ai.nworx.api.proto.nworxcentraluser);