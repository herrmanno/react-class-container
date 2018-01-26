module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "lib/app.js"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                include: `${__dirname}/src/`,
                use: "awesome-typescript-loader"
            }
        ]
    }
}