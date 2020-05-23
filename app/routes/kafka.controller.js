const config = require("../../config/kafka");
const KafkaActions = require("../actions/kafka-actions");
const actions = new KafkaActions();
let collectionUsers = 0;

module.exports = (routes) => {
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
  routes.get("/kafka-p", function (req, res) {
    try {
      producer = actions.producer;
      producer.connect();

      producer.on("ready", async function () {
        try {
          console.log("------ Producer starting ------");
          producer.produce(
            config.kafka_topic,
            null,
            Buffer.from(req.query.message)
          );
          console.log("------ Producer finishing ------");
        } catch (error) {
          console.error("A problem occurred when sending our message");
          console.error(error);
        }
      });

      // Any errors we encounter, including connection errors
      producer.on("event.error", function (error) {
        console.error("Error from producer");
        console.error(error);
      });

      // producer.setPollInterval(100);
    } catch (e) {
      console.log("------ Producer Error ------");
      console.log(e);
      console.log("----------------------------");
    }
    res.send("producer kafka");
  });

  // Producer with Streams
  routes.get("/kafka-p-stream", function (req, res) {
    stream = actions.streamProducer;
    var queuedSuccess = stream.write(Buffer.from(req.query.message));

    if (queuedSuccess) {
      console.log("We queued our message!");
    } else {
      console.log("Too many messages in our queue already");
    }

    // NOTE: MAKE SURE TO LISTEN TO THIS IF YOU WANT THE STREAM TO BE DURABLE
    // Otherwise, any error will bubble up as an uncaught exception.
    stream.on("error", function (err) {
      console.error("Error in our kafka stream");
      console.error(err);
    });

    res.send("producer with stream");
  });

  // Consumer
  routes.get("/kafka-c/", function (req, res) {
    try {
      const id = collectionUsers;
      consumer = actions.consumer;
      consumer.connect();

      consumer
        .on("ready", function () {
          console.log("------ Consumer starting ------");
          consumer.subscribe([config.kafka_topic]);

          consumer.consume();
          console.log("------ Consumer finishing ------");
        })
        .on("data", function (data) {
          console.log("------ Getting data ------");
          // Output the actual message contents
          console.log(data.value.toString());
          console.log("----------------------------");
        });
    } catch (e) {
      console.log("------ Consumer Error ------");
      console.log(e);
      console.log("----------------------------");
    }
    res.send("consumer kafka");
    collectionUsers++;
  });

  routes.get("/kafka-c-stream/", function (req, res) {
    console.log("------ Consumer starting ------");
    stream = actions.streamConsumer;
    console.log("------ Consumer finishing ------");

    stream.on("data", function (message) {
      console.log("------ Getting data ------");
      console.log(message.value.toString());
    });
    res.send("consumer with stream");
  });
};
