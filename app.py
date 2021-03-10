#!/usr/bin/env python3

from aws_cdk import core

from stack import Stack

ENV = core.Environment(account="473883619336", region="us-east-1")

app = core.App()

Stack(app, "blog-frontend-stack", env=ENV)

app.synth()
