const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");

const postCSSPlugins =
    [
        require("postcss-import"),
        require("postcss-mixins"),
        require('postcss-simple-vars'),
        require('postcss-nested'),
        require('autoprefixer')
    ]

class RunAfterCompile
{
    apply(compiler)
    {
        compiler.hooks.done.tap("Copy Images", function()
            {
                fse.copySync("./app/assets/images", "./docs/assets/images");
            });
    }
}

let cssConfig = 
    {
        test: /\.css$/i,
        use: 
          [
              'css-loader?url=false', 
              {
                  loader: 'postcss-loader', 
                  options: 
                  {
                      plugins: postCSSPlugins
                  }
              }
          ]
    };
          
let pages = fse.readdirSync("./app").filter(function(file)
    {
        return file.endsWith(".html");
    } ).map(function(page) 
        {
            return new HtmlWebpackPlugin(
                {
                    filename: page,
                    template: `./app/${page}`
                }
            )
        } );
    
    
let config =
{
      entry: './app/assets/scripts/App.js',
      plugins: pages,
      module: 
      {
        rules: 
        [
          cssConfig,
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: 
                    {
                        loader: 'babel-loader',
                        options: 
                            {
                                presets: [ "@babel/preset-env", "@babel/preset-react" ]
                            }
                    }
            }
        ]
      }
}

if (currentTask == "dev") 
{
    config.output =
        {
            filename: 'bundled.js',
            path: path.resolve(__dirname, 'app')
        };
    config.devServer =
      {
          host: "0.0.0.0",
          before: function(app, server)
          {
              server._watch("./app/**/*.html")
          },
          contentBase: path.join(__dirname, 'app'),
          hot: true,
          port:3000 
      };
    config.mode = 'development';
    
    cssConfig.use.unshift('style-loader'); 

} else if (currentTask == "build") 
{
    cssConfig.use.unshift(MiniCssExtractPlugin.loader);
    postCSSPlugins.push(require('cssnano'));

    config.module.rules.push( );
    
    config.output =
    {
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, 'docs')
    };
    config.mode = 'production';
    config.optimization = 
        {
            splitChunks: { chunks: "all" }
        }
    config.plugins.push( 
        new CleanWebpackPlugin(), 
        new MiniCssExtractPlugin( { filename: "styles.[chunkhash].css" } ),
        new RunAfterCompile() );    
}

module.exports = config;