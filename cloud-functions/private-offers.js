exports.handler = function(event, context, callback)
    {
          const headers = 
          {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers" : "Content-Type"
          }

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
                    headers,
                    body: content
                } )
        } else               
        {
            callback(null, 
                {
                    statusCode: 401,
                    headers,
                    body: "Incorrect Password"
                } )
        }                
    };