import {
    AWSSQSQueue, Tag, AWSSQSQueuePolicy
} from "./CFN.Types";

import AWS, { SQS } from "aws-sdk";
import { Console } from "console";

class Test implements AWSSQSQueue {
    DeletionPolicy: "Delete" | "Retain" | "Snapshot" = "Delete";
    DependsOn: string | string[] = [];
    Metadata: { [p: string]: unknown; } = {
        Nexus: true
    };
    Properties: {
        ContentBasedDeduplication?: boolean;
        DeduplicationScope?: string;
        DelaySeconds?: number;
        FifoQueue?: boolean;
        FifoThroughputLimit?: string;
        KmsDataKeyReusePeriodSeconds?: number;
        KmsMasterKeyId?: string;
        MaximumMessageSize?: number;
        MessageRetentionPeriod?: number;
        QueueName?: string;
        ReceiveMessageWaitTimeSeconds?: number;
        RedriveAllowPolicy?:
            { [p: string]: unknown; };
        RedrivePolicy?: { [p: string]: unknown; };
        Tags?: Tag[];
        VisibilityTimeout?: number;
    } = {};

    UpdateReplacePolicy: "Delete" | "Retain" | "Snapshot" = "Snapshot";

    Type: "AWS::SQS::Queue" = "AWS::SQS::Queue";

    configuration = {
        logger: console,
        region: "us-east-2"

    }
    service: AWS.SQS;

    constructor(deletion: "Delete" | "Retain" | "Snapshot") {
        this.DeletionPolicy = deletion;
        this.service = new AWS.SQS({ ... this.configuration });
    }

    queues = async () => {
        return await this.service.listQueues().promise();
    }
}

const T = new Test("Delete");
