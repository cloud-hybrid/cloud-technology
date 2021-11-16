const { Service, Response } = require("./../index.js");

const Schema = (Properties) => {
    return {
        "AWS-ID": Properties?.ARN,
        "Name": Properties?.Name,
        "Description": Properties?.Description,
        "Key-ID": Properties?.KmsKeyId,
        "Creation-Date": Properties?.CreatedDate,
        "Modification-Date": Properties?.LastChangedDate,
        "Access-Date": Properties?.LastAccessedDate,
        "Tags": Properties?.Tags
    };
}

exports.handler = async (event) => {
    console.info("Received Trigger Event" + ":", JSON.stringify(event, null, 4));

    const Container = [];

    let $ = await Service.listSecrets({MaxResults: 20, SortOrder: "asc", Filters: null, NextToken: null}).promise();

    while ($.NextToken) {
        $.SecretList.forEach((Secret) => {
            const Instance = Schema(Secret);
            Container.push(Instance);
        })

        const Token = $?.NextToken;
        if (Token === undefined) break;

        $ = await Service.listSecrets({
            SortOrder: "asc",
            Filters: null,
            NextToken: Token
        }).promise();
    }

    console.info("Secrets-List" + ":", Container);

    const Body = JSON.stringify({ Secrets: Container, Trigger: event }, null, 4);

    console.info("Data" + ":", Body);

    return Response(Body);
}
