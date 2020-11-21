exports.handler = function(event, context, callback)
    {
        callback(null, 
            {
                statusCode: 200,
                body: "These are you private travel offers for today:"
            } )
    };