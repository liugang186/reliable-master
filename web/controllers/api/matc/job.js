'use strict';
const models = require('../../../../common/models');
const _ = require('../../../../common/utils/helper');
const logger = require('../../../../common/utils/logger');
const Project = models.Project;


function *addTask() {
  const project = new Project();
  project.repositoryUrl = _.trim(this.request.body['repositoryUrl']);
  project.repositoryBranch = _.trim(this.request.body['repositoryBranch']);
  project.serialNumber = _.trim(this.request.body['serialNumber']);

  project.time = _.moment().format('x');

  if (yield project.add()) {
    this.body = {
      success: true,
      errorMsg: null,
      data: null
    };
  } else {
    this.body = {
      success: false,
      errorMsg: '提交任务失败',
      data: null
    };
  }
}


function *dispatch() {
  switch (this.params.method) {
    case 'add':
      yield addTask.call(this);
      break;

  }
}

module.exports = dispatch;
