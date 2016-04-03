app.service('OptionsService', function() {
  var fileList = [];
  var options = {};
  var limits = {};

  var channels = [];
  
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  var addFile = function(newObj) {
      var fileObj = {
        unique_id: guid(),
        content: newObj
      }

      fileList.push(fileObj);
  };

  var updateFileBlob = function(unique_id,newObj){
    var fileObj = _.find(fileList,function(file){
      return file.unique_id === unique_id;
    });
    if(fileObj !== null && fileObj !== undefined){
      var name = fileObj.content.name;
      fileObj.content = newObj;
      fileObj.content.name = name;
    }
  }

  var getFiles = function(){
      return fileList;
  };

  var updateOptions = function(newOptions){
    options = $.extend({},options,newOptions);
  }
  var updateLimits = function(newLimits){
    limits = $.extend({},newLimits,newLimits);
  }

  var clearFiles = function() {
    fileList = [];
  }

  var updateChannels = function(newChannels){
    channels = newChannels;
  }

  var getChannels = function(){
    return channels;
  }
  var getOptions = function(){
    return options;
  }
  var getLimits = function(){
    return limits;
  }

  var filterChannels = function(channelIds) {
    channels = _.filter(function(channel){
      return _.find(channelIds,function(channelId){
        return channelId === channel.unique_id;
      });

    });
  }



  return {
    addFile: addFile,
    getFiles: getFiles,
    clearFiles : clearFiles,
    updateFileBlob: updateFileBlob,
    updateOptions : updateOptions,
    getOptions : getOptions,
    updateChannels : updateChannels,
    filterChannels : filterChannels,
    getChannels : getChannels,
    updateLimits : updateLimits,
    getLimits : getLimits
  };



});