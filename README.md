# Blog frontend

Built with Vue.js, written in Typescript and deployed on AWS with CDK Python.

## Structure

- top level dir for deployment...
- app dir for the Vue.js app

## Development

- in the app dir run $ npm run serve

## Deployment

(domain name and certificate are set up manually -> AWS Route53, AWS CM)

1. $ cdk synth
2. $ cdk bootstrap
3. $ cdk deploy