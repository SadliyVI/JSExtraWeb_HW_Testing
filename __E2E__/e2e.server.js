import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config.mjs';

const compiler = webpack(config);

const server = new WebpackDevServer(
    {
        ...config.devServer,
        port: 9000,
        host: 'localhost',
        open: false,
        hot: false,
        client: {
            overlay: false,
        }
    },
    compiler
);

server.start().then(() => {
    console.log('Сервер запущен на http://localhost:9000');
    if (process.send) {
        process.send('ok');
    }
}).catch(err => {
    console.error('Ошибка запуска сервера:', err);
});
