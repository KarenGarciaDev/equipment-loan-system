import { Injectable, OnModuleInit } from "@nestjs/common";
import { Kafka } from "kafkajs";

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || "api-inventory",
    brokers: (process.env.KAFKA_BROKERS || process.env.KAFKA_BROKER || "redpanda:9092")
      .split(",")
      .map((s) => s.trim()),
  });

  private producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async emit(topic: string, payload: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(payload) }],
    });
  }
}
