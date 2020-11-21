exports.handler = function(event, context, callback)
    {
        const content = `
                <h3>Welcome To Your Private Travel Offers for Today!</h3>
                <ul>Trip to your <strong>backyard</strong></ul>
                <ul>Trip to around the <strong>block</strong></ul>
            `
        let body;
        
        if(event.body)
            body = JSON.parse(event.body);    
        else
            body = { };

        if(body.password == "WebDeveloper")
        {
            callback(null, 
                {
                    statusCode: 200,
                    body: content
                } )
        } else               
        {
            callback(null, 
                {
                    statusCode: 401,
                    body: "Incorrect Password"
                } )
        }                
    };