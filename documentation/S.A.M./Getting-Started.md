# SAM Getting Started Guide #

## Disable Telemetry Data Tracking ##

```bash
echo "export SAM_CLI_TELEMETRY=0" >> ~/.profile && source ~/.profile
```

## Template Anatomy ##

```yaml
Transform: AWS::Serverless-2016-10-31

Globals:
    Function:
        Handler:
        Runtime:
        CodeUri:
        DeadLetterQueue:
        Description:
        MemorySize:
        Timeout:
        VpcConfig:
        Environment:
        Tags:
        Tracing:
        KmsKeyArn:
        Layers:
        AutoPublishAlias:
        DeploymentPreference:
        PermissionsBoundary:
        ReservedConcurrentExecutions:
        ProvisionedConcurrencyConfig:
        AssumeRolePolicyDocument:
        EventInvokeConfig:

    Api:
        Auth:
        Name:
        DefinitionUri:
        CacheClusterEnabled:
        CacheClusterSize:
        Variables:
        EndpointConfiguration:
        MethodSettings:
        BinaryMediaTypes:
        MinimumCompressionSize:
        Cors:
        GatewayResponses:
        AccessLogSetting:
        CanarySetting:
        TracingEnabled:
        OpenApiVersion:
        Domain:

    HttpApi:
        Auth:
        AccessLogSettings:
        StageVariables:
        Tags:

    SimpleTable:
        SSESpecification:

Description:
    String

Metadata:
    template metadata

Parameters:
    set of parameters

Mappings:
    set of mappings

Conditions:
    set of conditions

Resources:
    set of resources

Outputs:
    set of outputs
```

### Nested Application via Local File System ###

```yaml
Transform: AWS::Serverless-2016-10-31

Resources:
    Application:
        Type: AWS::Serverless::Application
        Properties:
            Location: ../my-other-app/template.yaml
            Parameters:
                # Optional parameter that can have default value overridden
                # ParameterName1: 15 # Uncomment to override default value
                # Required parameter that needs value to be provided
                ParameterName2: YOUR_VALUE
```

## Environment Variable Formats ##

### Functional ###

```json
{
  "MyFunction1": {
    "TABLE_NAME": "localtable",
    "BUCKET_NAME": "testBucket"
  },
  "MyFunction2": {
    "TABLE_NAME": "localtable",
    "STAGE": "dev"
  }
}
```

### Parameterized ###

```json
{
    "Parameters": {
        "TABLE_NAME": "localtable",
        "BUCKET_NAME": "testBucket",
        "STAGE": "dev"
    } 
}
```

## `Makefile` Layers ##

```yaml
Resources:
  HelloWorldFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: hello_world/
      Handler: app.lambda_handler
      Runtime: python3.7
    Metadata:
      BuildMethod: makefile
```

```make
build-HelloWorldFunction:
    cp *.py $(ARTIFACTS_DIR)
    cp requirements.txt $(ARTIFACTS_DIR)
    python -m pip install -r requirements.txt -t $(ARTIFACTS_DIR)
    rm -rf $(ARTIFACTS_DIR)/bin
```

## API Gateway Extensions ##

API Gateway extensions API Gateway extensions are extensions to the OpenAPI specification that support the AWS-specific authorization and API Gateway-specific
API integrations. For more information about API Gateway extensions, see API Gateway Extensions to OpenAPI. AWS SAM supports a subset of API Gateway extensions.
To see which API Gateway extensions are supported by AWS SAM, see the following table. API Gateway Extension Supported by AWS SAM
`x-amazon-apigateway-any-method` Yes
`x-amazon-apigateway-api-key-source` Property No x-amazon-apigateway-auth Object Yes x-amazon-apigateway-authorizer Object Yes x-amazon-apigateway-authtype
Property Yes 186 AWS Serverless Application Model Developer Guide API Gateway extensions x-amazon-apigateway-binary-media-types Property Yes
x-amazon-apigateway-documentation Object No x-amazon-apigateway-endpoint-configuration Object No x-amazon-apigateway-gateway-responses Object Yes
x-amazon-apigateway-gateway-responses.gatewayResponse Object Yes x-amazon-apigateway-gateway-responses.responseParameters Object Yes
x-amazon-apigateway-gateway-responses.responseTemplates Object Yes x-amazon-apigateway-integration Object Yes x-amazon-apigateway-integration.requestTemplates
Object Yes x-amazon-apigateway-integration.requestParameters Object No x-amazon-apigateway-integration.responses Object Yes
x-amazon-apigateway-integration.response Object Yes x-amazon-apigateway-integration.responseTemplates Object Yes
x-amazon-apigateway-integration.responseParameters Object Yes x-amazon-apigateway-request-validator Property No x-amazon-apigateway-request-validators Object No
x-amazon-apigateway-request-validators.requestValidator Object No

## References ##

- [MacOS Installation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-application-model.pdf#page=18)
- [Credentials Setup](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-application-model.pdf#page=21)
- [SAM Configuration(s)](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-config.html)
- [Policy Template List](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-policy-template-list.html)
- [Canary Deployments](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html)