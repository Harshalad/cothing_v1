// source: status-update.proto
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
goog.exportSymbol('proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest', null, global);
goog.exportSymbol('proto.ai.nworx.api.proto.assessment.EventDetail', null, global);
goog.exportSymbol('proto.ai.nworx.api.proto.assessment.GoalDetail', null, global);
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
proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.displayName = 'proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest';
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
proto.ai.nworx.api.proto.assessment.GoalDetail = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ai.nworx.api.proto.assessment.GoalDetail, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ai.nworx.api.proto.assessment.GoalDetail.displayName = 'proto.ai.nworx.api.proto.assessment.GoalDetail';
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
proto.ai.nworx.api.proto.assessment.EventDetail = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ai.nworx.api.proto.assessment.EventDetail, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ai.nworx.api.proto.assessment.EventDetail.displayName = 'proto.ai.nworx.api.proto.assessment.EventDetail';
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
proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    goaldetails: (f = msg.getGoaldetails()) && proto.ai.nworx.api.proto.assessment.GoalDetail.toObject(includeInstance, f),
    eventdetails: (f = msg.getEventdetails()) && proto.ai.nworx.api.proto.assessment.EventDetail.toObject(includeInstance, f)
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
 * @return {!proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest}
 */
proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest;
  return proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest}
 */
proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.ai.nworx.api.proto.assessment.GoalDetail;
      reader.readMessage(value,proto.ai.nworx.api.proto.assessment.GoalDetail.deserializeBinaryFromReader);
      msg.setGoaldetails(value);
      break;
    case 2:
      var value = new proto.ai.nworx.api.proto.assessment.EventDetail;
      reader.readMessage(value,proto.ai.nworx.api.proto.assessment.EventDetail.deserializeBinaryFromReader);
      msg.setEventdetails(value);
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
proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGoaldetails();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.ai.nworx.api.proto.assessment.GoalDetail.serializeBinaryToWriter
    );
  }
  f = message.getEventdetails();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.ai.nworx.api.proto.assessment.EventDetail.serializeBinaryToWriter
    );
  }
};


/**
 * optional GoalDetail GoalDetails = 1;
 * @return {?proto.ai.nworx.api.proto.assessment.GoalDetail}
 */
proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.prototype.getGoaldetails = function() {
  return /** @type{?proto.ai.nworx.api.proto.assessment.GoalDetail} */ (
    jspb.Message.getWrapperField(this, proto.ai.nworx.api.proto.assessment.GoalDetail, 1));
};


/**
 * @param {?proto.ai.nworx.api.proto.assessment.GoalDetail|undefined} value
 * @return {!proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest} returns this
*/
proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.prototype.setGoaldetails = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest} returns this
 */
proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.prototype.clearGoaldetails = function() {
  return this.setGoaldetails(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.prototype.hasGoaldetails = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional EventDetail eventDetails = 2;
 * @return {?proto.ai.nworx.api.proto.assessment.EventDetail}
 */
proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.prototype.getEventdetails = function() {
  return /** @type{?proto.ai.nworx.api.proto.assessment.EventDetail} */ (
    jspb.Message.getWrapperField(this, proto.ai.nworx.api.proto.assessment.EventDetail, 2));
};


/**
 * @param {?proto.ai.nworx.api.proto.assessment.EventDetail|undefined} value
 * @return {!proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest} returns this
*/
proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.prototype.setEventdetails = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest} returns this
 */
proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.prototype.clearEventdetails = function() {
  return this.setEventdetails(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.ai.nworx.api.proto.assessment.CompleteMethodStatusRequest.prototype.hasEventdetails = function() {
  return jspb.Message.getField(this, 2) != null;
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
proto.ai.nworx.api.proto.assessment.GoalDetail.prototype.toObject = function(opt_includeInstance) {
  return proto.ai.nworx.api.proto.assessment.GoalDetail.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ai.nworx.api.proto.assessment.GoalDetail} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ai.nworx.api.proto.assessment.GoalDetail.toObject = function(includeInstance, msg) {
  var f, obj = {
    userid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    programid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    usergoalid: jspb.Message.getFieldWithDefault(msg, 3, ""),
    milestoneid: jspb.Message.getFieldWithDefault(msg, 4, ""),
    methodid: jspb.Message.getFieldWithDefault(msg, 5, "")
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
 * @return {!proto.ai.nworx.api.proto.assessment.GoalDetail}
 */
proto.ai.nworx.api.proto.assessment.GoalDetail.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ai.nworx.api.proto.assessment.GoalDetail;
  return proto.ai.nworx.api.proto.assessment.GoalDetail.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ai.nworx.api.proto.assessment.GoalDetail} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ai.nworx.api.proto.assessment.GoalDetail}
 */
proto.ai.nworx.api.proto.assessment.GoalDetail.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setProgramid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsergoalid(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMilestoneid(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setMethodid(value);
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
proto.ai.nworx.api.proto.assessment.GoalDetail.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ai.nworx.api.proto.assessment.GoalDetail.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ai.nworx.api.proto.assessment.GoalDetail} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ai.nworx.api.proto.assessment.GoalDetail.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getProgramid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getUsergoalid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getMilestoneid();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getMethodid();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional string userId = 1;
 * @return {string}
 */
proto.ai.nworx.api.proto.assessment.GoalDetail.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.assessment.GoalDetail} returns this
 */
proto.ai.nworx.api.proto.assessment.GoalDetail.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string programId = 2;
 * @return {string}
 */
proto.ai.nworx.api.proto.assessment.GoalDetail.prototype.getProgramid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.assessment.GoalDetail} returns this
 */
proto.ai.nworx.api.proto.assessment.GoalDetail.prototype.setProgramid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string userGoalId = 3;
 * @return {string}
 */
proto.ai.nworx.api.proto.assessment.GoalDetail.prototype.getUsergoalid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.assessment.GoalDetail} returns this
 */
proto.ai.nworx.api.proto.assessment.GoalDetail.prototype.setUsergoalid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string milestoneId = 4;
 * @return {string}
 */
proto.ai.nworx.api.proto.assessment.GoalDetail.prototype.getMilestoneid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.assessment.GoalDetail} returns this
 */
proto.ai.nworx.api.proto.assessment.GoalDetail.prototype.setMilestoneid = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string methodId = 5;
 * @return {string}
 */
proto.ai.nworx.api.proto.assessment.GoalDetail.prototype.getMethodid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.assessment.GoalDetail} returns this
 */
proto.ai.nworx.api.proto.assessment.GoalDetail.prototype.setMethodid = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
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
proto.ai.nworx.api.proto.assessment.EventDetail.prototype.toObject = function(opt_includeInstance) {
  return proto.ai.nworx.api.proto.assessment.EventDetail.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ai.nworx.api.proto.assessment.EventDetail} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ai.nworx.api.proto.assessment.EventDetail.toObject = function(includeInstance, msg) {
  var f, obj = {
    usereventid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    usercontentid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    usermethodid: jspb.Message.getFieldWithDefault(msg, 3, "")
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
 * @return {!proto.ai.nworx.api.proto.assessment.EventDetail}
 */
proto.ai.nworx.api.proto.assessment.EventDetail.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ai.nworx.api.proto.assessment.EventDetail;
  return proto.ai.nworx.api.proto.assessment.EventDetail.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ai.nworx.api.proto.assessment.EventDetail} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ai.nworx.api.proto.assessment.EventDetail}
 */
proto.ai.nworx.api.proto.assessment.EventDetail.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsereventid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsercontentid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsermethodid(value);
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
proto.ai.nworx.api.proto.assessment.EventDetail.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ai.nworx.api.proto.assessment.EventDetail.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ai.nworx.api.proto.assessment.EventDetail} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ai.nworx.api.proto.assessment.EventDetail.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUsereventid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUsercontentid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getUsermethodid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string userEventId = 1;
 * @return {string}
 */
proto.ai.nworx.api.proto.assessment.EventDetail.prototype.getUsereventid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.assessment.EventDetail} returns this
 */
proto.ai.nworx.api.proto.assessment.EventDetail.prototype.setUsereventid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string userContentId = 2;
 * @return {string}
 */
proto.ai.nworx.api.proto.assessment.EventDetail.prototype.getUsercontentid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.assessment.EventDetail} returns this
 */
proto.ai.nworx.api.proto.assessment.EventDetail.prototype.setUsercontentid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string userMethodId = 3;
 * @return {string}
 */
proto.ai.nworx.api.proto.assessment.EventDetail.prototype.getUsermethodid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ai.nworx.api.proto.assessment.EventDetail} returns this
 */
proto.ai.nworx.api.proto.assessment.EventDetail.prototype.setUsermethodid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


goog.object.extend(exports, proto.ai.nworx.api.proto.assessment);