module.exports = {
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        // '@babel/react', // translate jsx
                        // 'stage-0', // async code
                        ['@babel/env', {
                            targets: {
                                browsers: ['last 2 versions'],
                            }
                        }]
                    ],
                    plugins: [
                        '@babel/plugin-proposal-object-rest-spread',
                    ]
                }
            }
        ]
    },

    externals : {
    }
};
