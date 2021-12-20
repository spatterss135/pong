const React = require('react')


function Def(html) {
    return (
        <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="/style.css"></link>
            <title>Document</title>
        </head>
        <body>
            {html.children}
        </body>
        </html>
    )
}


module.exports = Def