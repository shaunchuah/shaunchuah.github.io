---
title: 'How to Handle Big Data Uploads in Django'
date: 2023-12-10T18:59:15Z
tags: []
draft: false
description: ""
canonicalURL: "https://canonical.url/to/page"
---

## Traditional File Uploads in Django

Handling non-trivial big data file uploads (think >5gb/file) in Django can be challenging. A typical file upload storage strategy in Django is to use django-storages and an Amazon S3 backend. In the traditional way, your browser uploads the file directly to Django which then transmits the data to S3.

This creates two problems:

1. Django needs to have enough memory to hold your uploaded file for retransmission.
2. The Django worker receiving the file upload is blocked until the upload is finished.
3. Streaming the upload onwards to S3 doubles the amount of bandwidth used.

## What if we could instead upload directly into AWS S3 while registering the upload with Django?

I stumbled across this excellent article by Radoslav Georgiev of HackSoft: [https://www.hacksoft.io/blog/direct-to-s3-file-upload-with-django](https://www.hacksoft.io/blog/direct-to-s3-file-upload-with-django)

It's a slightly complicated set-up but in essence, when the browser wants to perform an upload, it tells Django so and Django gives it a pre-signed S3 URL which will accept the upload.

The upload is then performed directly by the browser to S3. On completion, S3 lets the browser know it was successful and the browser then informs Django that the upload is successful.

This forms the basis of big data handling in Django and allows browsers to connect directly to S3 which in itself is an amazing capability. I highly recommend you check out the linked tutorial above!
