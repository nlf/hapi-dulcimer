var Boom = require('boom');
var Joi = require('joi');


exports.list = function (factory) {

    return {
        handler: function (request, reply) {

            factory.all(request.query, function (err, models, pagination) {

                if (err) {
                    return reply(Boom.internal(err));
                }

                var json = models.map(function (model) {

                    return model.toJSON();
                });

                for (var key in pagination) {
                    if (pagination.hasOwnProperty(key) &&
                        typeof pagination[key] !== 'undefined') {

                        json[key] = pagination[key];
                    }
                }

                reply(json);
            });
        },
        validate: {
            query: Joi.object().keys({
                limit: Joi.number().integer().min(1).max(100),
                continuation: Joi.string(),
                sortBy: Joi.string(),
                indexValue: Joi.any(),
                indexRange: Joi.object().keys({
                    start: Joi.any().required(),
                    end: Joi.any().required()
                }),
                index: Joi.string(),
                reverse: Joi.boolean(),
                depth: Joi.number().integer().min(0).max(100)
            }).with('indexValue', 'index').with('indexRange', 'index')
        }
    };
};


exports.create = function (factory) {

    return {
        handler: function (request, reply) {

            var instance = factory.create(request.payload);
            instance.save(function (err) {

                if (err) {
                    return reply(Boom.internal(err));
                }

                reply(instance.toJSON()).code(201);
            });
        }
    };
};


exports.get = function (factory) {

    return {
        handler: function (request, reply) {
        }
    };
};


exports.update = function (factory) {

    return {
        handler: function (request, reply) {
        }
    };
};


exports.destroy = function (factory) {

    return {
        handler: function (request, reply) {
        }
    };
};
