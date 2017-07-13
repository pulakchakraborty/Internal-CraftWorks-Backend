/**
 * Created by pulakchakraborty on 7/4/17.
 */
var elasticsearch=require('elasticsearch');

var esClient = new elasticsearch.Client( {
    host: 'localhost:9200',
    log: 'trace'
});

module.exports = esClient;
