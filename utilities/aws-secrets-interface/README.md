# [...] #

- [ ] Use DocDB to create a Mapping for ID -> Secret-Name
  - [ ] When creating Secret(s), Validate DocDB Name Uniqueness Prior to Storing

## Overview ##

A production-ready serverless deployable that will automatically rotate 
AWS SecretsManager resource(s). Optionally, SNS can be configured upon
rotation events.

## Resources ##

### Lambda ###

```bash
sam init
```
