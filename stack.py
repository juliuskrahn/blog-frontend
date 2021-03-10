import aws_cdk as cdk
import aws_cdk.aws_cloudfront as cloudfront
import aws_cdk.aws_cloudfront_origins as cloudfront_origins
import aws_cdk.aws_s3_deployment as s3deploy
import aws_cdk.aws_s3 as s3
import aws_cdk.aws_certificatemanager as cm
import aws_cdk.aws_route53 as route53
import aws_cdk.aws_route53_targets as route53_targets


class Stack(cdk.core.Stack):

    def __init__(self, scope: cdk.core.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        cdk.core.Tags.of(self).add("Project", "Blog")
        cdk.core.Tags.of(self).add("Context", "Frontend")

        bucket = s3.Bucket(
            self,
            "blog-frontend",
            public_read_access=True,
            website_index_document="index.html"
        )

        s3deploy.BucketDeployment(
            self,
            "blog-deployment",
            destination_bucket=bucket,
            sources=[s3deploy.Source.asset("app/dist")],
            retain_on_delete=False,
            cache_control=[
                s3deploy.CacheControl.set_public(),
                s3deploy.CacheControl.max_age(cdk.core.Duration.days(2)),
            ]
        )

        certificate = cm.Certificate.from_certificate_arn(
            self,
            "blog-domain-name-certificate",
            "arn:aws:acm:us-east-1:473883619336:certificate/d5414905-09a8-43a1-a622-809971cffca0"
        )

        cloudfront_distribution = cloudfront.Distribution(
            self,
            "blog-cloudfront-distribution",
            default_behavior=cloudfront.BehaviorOptions(
                origin=cloudfront_origins.S3Origin(bucket),
                allowed_methods=cloudfront.AllowedMethods.ALLOW_GET_HEAD,
                viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cache_policy=cloudfront.CachePolicy.CACHING_OPTIMIZED,
            ),
            domain_names=["juliuskrahn.com"],
            certificate=certificate,
            error_responses=[
                cloudfront.ErrorResponse(
                    http_status=404,
                    response_page_path="/index.html",
                    response_http_status=200
                )
            ],
            price_class=cloudfront.PriceClass.PRICE_CLASS_100
        )

        route53.ARecord(
            self,
            "blog-frontend-a-record",
            target=route53.RecordTarget.from_alias(route53_targets.CloudFrontTarget(cloudfront_distribution)),
            zone=route53.HostedZone.from_lookup(self, "blog-hosted-zone", domain_name="juliuskrahn.com")
        )
