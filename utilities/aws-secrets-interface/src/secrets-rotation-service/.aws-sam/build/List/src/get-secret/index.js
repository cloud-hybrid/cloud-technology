/// https://mng.workshop.aws

const { Service, Response } = require("./../index.js");

const Debug = (process.env.NODE_ENV !== "production");

/// https://mng.workshop.aws/appconfig/lambda-validator.html
/// Service.config.paramValidation = true;

const Schema = (Properties) => {
    const $ = Properties?.ARN;
    const Tags = Properties.Tags?.filter(($) => !(String($.Key).includes("aws")));

    return {
        "Name": Properties?.Name,
        "Description": Properties?.Description,
        "Creation-Date": Properties?.CreatedDate,
        "Modification-Date": Properties?.LastChangedDate,
        "Access-Date": Properties?.LastAccessedDate,
        "Tags": Tags || Properties?.Tags,

        "ID": $, "ARN": $, "AWS-ID": $
    };
}

console.log("Loading Function .....");
exports.handler = async (event, context) => {
    console.info("Received Trigger Event" + ":", JSON.stringify(event, null, 4));

    const Data = event["queryStringParameters"];

    const Keys = Object.keys(Data);
    const Index = (Keys.indexOf("ID") !== -1) ? Keys.indexOf("ID"): Keys.indexOf("id");

    const ID = Data[Keys[Index]];

    try {
        const Secret = await Service.describeSecret({ SecretId: ID }).promise();

        const Model = Schema(Secret);

        return Response(JSON.stringify({ Secret: Model }, null, 4));
    } catch (e) {
        return Response(JSON.stringify({
            Status: 404,
            Error: "Secret Not Found",
            Debug: (Debug) ? { event, context }: null
        }, null, 4), 422)
    }
}