const Kafka = require("node-rdkafka");
const config = require("../../config/kafka");

class KafkaActions {
  get producer() {
    return new Kafka.Producer({
      "metadata.broker.list": config.kafka_server,
    });
  }

  get streamProducer() {
    return Kafka.Producer.createWriteStream(
      {
        "metadata.broker.list": config.kafka_server,
      },
      {},
      {
        topic: config.kafka_topic,
      }
    );
  }

  get consumer() {
    return new Kafka.KafkaConsumer(
      {
        "group.id": "kafka",
        "metadata.broker.list": config.kafka_server,
      },
      {}
    );
  }

  get streamConsumer() {
    return new Kafka.KafkaConsumer.createReadStream(
      {
        "group.id": "kafka",
        "metadata.broker.list": config.kafka_server,
      },
      {},
      {
        topics: [config.kafka_topic],
      }
    );
  }
}

module.exports = KafkaActions;
