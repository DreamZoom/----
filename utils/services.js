var Bmob = require('./bmob.js');
var Task = Bmob.Object.extend("Task");
module.exports = {
    initBmob: function () {
        Bmob.initialize("c861b923a13aa54239c606a580f5063f", "942ae1ffbb4516398573d10d29f75dfd");
    },
    convertModel: function (result) {
        if (result instanceof Array) {
            return result.map(function (item) {
                item.attributes.id = item.id;
                return item.attributes;
            });
        }
        else {
            result.attributes.id = result.id;

            return result.attributes;
        }
    },
    reversalrsModel: function (model, result) {
        for (var f in model) {
            result.set(f, model[f]);
        }
    },
    getTasks: function (page,successfun) {
        var that = this;
        var query = new Bmob.Query(Task);
        query.descending("updatedAt");
        var pagesize=10;
        query.limit(pagesize);
        query.skip(pagesize*(page-1)); 
        // // 查询所有数据
        query.find({
            success: function (results) {

                if (successfun) {
                    successfun(that.convertModel(results));
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    },
    addTask: function (data, successfun) {
        var that = this;
        var task = new Task();
        for (var f in data) {
            task.set(f, data[f]);
        }
        //添加数据，第一个入口参数是null
        task.save(null, {
            success: function (result) {
                console.log(result);
                if (successfun) {
                    successfun(that.convertModel(result));
                }
            },
            error: function (result, error) {
                // 添加失败
                console.log(error);
            }
        });
    },
    getTask: function (id, successfun) {
        var that = this;
        var query = new Bmob.Query(Task);
        query.get(id, {
            success: function (result) {

                if (successfun) {
                    successfun(that.convertModel(result));
                }
            },
            error: function (object, error) {
                // 查询失败
                console.log(error);
            }
        });
    },
    updateTask: function (model, successfun) {
        var that = this;
        var query = new Bmob.Query(Task);
        query.get(model.id, {
            success: function (result) {
                that.reversalrsModel(model, result);
                result.save(null, function (response) {
                    if (successfun) {
                        successfun(that.convertModel(response));
                    }
                });

                if (successfun) {
                    successfun(that.convertModel(result));
                }
            },
            error: function (object, error) {
                // 查询失败
                console.log(error);
            }
        });
    }

}