const kafka = require('kafka-node');
const bp = require('body-parser');
const config = require('../../config/kafka');

let collectionUsers = 0;

module.exports = routes => {

  // // Create Topics
  // routes.get('/kafka-t', (req, res) => {
  //   var client = new kafka.KafkaClient({kafkaHost: config.kafka_server});

  //   var topicsToCreate = [{
  //     topic: 'example',
  //     partitions: 3,
  //     replicationFactor: 2
  //   }];

  //   client.createTopics(topicsToCreate, (error, result) => {
  //     if(error) console.log(error)
  //     else console.log(result)
  //   });
  //   res.send("topic kafka")
  // })

  // Producer
  routes.get('/kafka-p', (req, res) => {
    try {
      const Producer = kafka.Producer;
      const client = new kafka.KafkaClient(config.kafka_server);
      const producer = new Producer(client, { partitionerType: 1 });
      const kafka_topic = 'example';

      let payloads = [
        {
          topic: kafka_topic,
          messages: req.query.mensagem,
        }
      ];

      producer.on('ready', async function () {
        let push_status = producer.send(payloads, (err, data) => {
          console.log("--------- Producer ---------")

          if (err) {
            console.log('[kafka-producer -> ' + kafka_topic + ']: broker update failed');
            console.log(err)
          } else {
            console.log('[kafka-producer -> ' + kafka_topic + ']: broker update success');
          }
          console.log("----------------------------")
        });
      });

      producer.on('error', function (err) {
        console.log(err);
        console.log('[kafka-producer -> ' + kafka_topic + ']: connection errored');
        throw err;
      });
    }
    catch (e) {
      console.log("------ Producer Error ------")
      console.log(e);
      console.log("----------------------------")
    }
    res.send("producer kafka")
  })

  // Consumer
  routes.get('/kafka-c/', (req, res) => {
    try {
      const id = collectionUsers;
      const Consumer = kafka.Consumer;
      const client = new kafka.KafkaClient();
      let consumer = new Consumer(
        client,
        [{ topic: config.kafka_topic, partition: 0 }],
        {
          autoCommit: true,
          fetchMaxWaitMs: 1000,
          fetchMaxBytes: 1024 * 1024,
          encoding: 'utf8',
          fromOffset: false
        }
      );
      consumer.on('message', async function (message) {
        console.log("--------- Consumer ---------")

        console.log(
          'kafka ', id, ' -> ',
          message.value
        );

        console.log("----------------------------")
      })
      consumer.on('error', function (err) {
        console.log('error', err);
      });
    }
    catch (e) {
      console.log("------ Consumer Error ------")
      console.log(e);
      console.log("----------------------------")
    }
    res.send("consumer kafka")
    collectionUsers++;
  })

  // Consumer
  routes.get('/kafka-cc/', (req, res) => {
    try {
      const id = collectionUsers;
      const Consumer = kafka.Consumer;
      const client = new kafka.KafkaClient(config.kafka_server);
      let consumer = new Consumer(
        client,
        [{ topic: config.kafka_topic, partition: 1 }],
        {
          autoCommit: true,
          fetchMaxWaitMs: 1000,
          fetchMaxBytes: 1024 * 1024,
          encoding: 'utf8',
          fromOffset: false
        }
      );
      consumer.on('message', async function (message) {
        console.log("--------- Consumer ---------")

        console.log(
          'kafka ', id, ' -> ',
          message.value
        );

        console.log("----------------------------")
      })
      consumer.on('error', function (err) {
        console.log('error', err);
      });
    }
    catch (e) {
      console.log("------ Consumer Error ------")
      console.log(e);
      console.log("----------------------------")
    }
    res.send("consumer kafka")
    collectionUsers++;
  })

  routes.get('/kafka-ccc/', (req, res) => {
    try {
      const id = collectionUsers;
      const Consumer = kafka.Consumer;
      const client = new kafka.KafkaClient(config.kafka_server);
      let consumer = new Consumer(
        client,
        [{ topic: config.kafka_topic, partition: 2 }],
        {
          autoCommit: true,
          fetchMaxWaitMs: 1000,
          fetchMaxBytes: 1024 * 1024,
          encoding: 'utf8',
          fromOffset: false
        }
      );
      consumer.on('message', async function (message) {
        console.log("--------- Consumer ---------")

        console.log(
          'kafka ', id, ' -> ',
          message.value
        );

        console.log("----------------------------")
      })
      consumer.on('error', function (err) {
        console.log('error', err);
      });
    }
    catch (e) {
      console.log("------ Consumer Error ------")
      console.log(e);
      console.log("----------------------------")
    }
    res.send("consumer kafka")
    collectionUsers++;
  })

}