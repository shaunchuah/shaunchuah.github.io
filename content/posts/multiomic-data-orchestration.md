---
title: 'Multi-omic Data Orchestration'
date: 2024-12-13T09:02:45Z
tags: []
draft: false
description: ""
---

Over the last few years, one of the key challenges we have faced in our multi-omic translational studies is the orchestration of multi-omic datasets. In this blog post, I summarise some of the strategies we have employed to manage this complexity, after dedicating significant time to considering this problem.

## Industry Data Warehousing

I recommend the Kimball book on data warehousing (_The Data Warehouse Toolkit: The Definitive Guide to Dimensional Modelling_) as a starting guide to see what other people have done in tackling 'big data'.

The concept of dimensional modelling is also interesting because, in IBD studies, one of the big challenges is modelling drug data properly. I have personally seen all sorts of techniques used to model drug data, but each has its own shortcomings when performing complex analyses on them.

## The Challenge

Having said that, the data warehouse approach is not entirely applicable to research data workflows. It tends to be more suited to high-volume transactional data, where the data is relatively static and well-structured. In research, the data is often dynamic and unstructured, and the analysis requirements are constantly changing. This makes it difficult to design a data warehouse that can accommodate all possible analysis scenarios. It is hard to define the 'grain' compared to, for example, sales data for a retailer.

Multi-omic data is complex and often requires a lot of data wrangling to get it into a format that is suitable for analysis. This is especially true when dealing with data from multiple sources, such as genomics, transcriptomics, proteomics, metabolomics, and clinical data. Each of these data types has its own unique characteristics and processing pipelines.

Another major issue, particularly when working in a group, is that these data files tend to be spread over multiple computers and held by different individuals. How do we approach this complexity?

## Embrace the Complexity

Initially, I spent a lot of time thinking about how to simplify things, but with experience, I have learned that we must embrace the complexity of this data landscape. This means that we must be prepared to integrate data from multiple sources, in multiple formats, and at multiple scales. This is not a trivial task and requires a lot of careful planning and coordination.

I like to break down data into the following model:

- **Structured data:**
  - RedCap/SQL databases.
  - CSV/excel files.
  - Easy to extract and transform.
- **Unstructured data:**
  - Raw -omic files such as fastq.
  - Processed -omic files such as gene expression matrices, variant call files.
  - Other types of unstructured file data such as video, images, histology slides etc.

## The Strategy

1. Structured data should be extracted, transformed, and loaded into a downstream database.
2. Unstructured data should be stored in cloud object storage such as AWS S3 or Azure Blob Storage. This allows for easy programmatic access and therefore the ability to integrate these data files with structured data.
3. Team members should be able to access both raw and processed files at certain stages necessary for their work. For example the seurat object used in single-cell analysis pipelines is a very specific data structure that needs accommodation.
4. Use a data orchestrator to coordinate and manage the complexity of the data landscape.

## Data Orchestrator

A data orchestrator is a tool that allows you to define data pipelines in code and automates the transformation, integration, and loading of data from multiple sources. This unifies and streamlines data processing workflows and can save team members a lot of time, providing easy access for someone with microbiome expertise to access genomic data and integrate the two.

Another benefit of defining data transformations in code is the ability to version control your data pipelines, ensuring they are reproducible. This is particularly important for addressing the replicability issue in research, especially with increasingly complex data processing workflows.

Another significant advantage is the ability to standardize the data dictionary across different studies. Often, researchers use slightly varied names or coding schemes for their variables. A data orchestrator enables you to define transformations and centralize the data dictionary, facilitating the integration of datasets and the reuse of data collected at considerable time and expense.

There are a number of data orchestrators, and the most established is Apache Airflow, widely used in industry. However, it is a complex piece of software that takes significant expertise to set up and maintain. Managed services are offered by cloud providers, but they are expensive.

## Dagster

Having tried a number of these tools, we have settled on [Dagster](https://dagster.io/). Dagster adopts a declarative approach to data assets rather than a functional programming approach seen in other orchestrators. It also allows for easy scheduling and testing of data pipelines. More importantly, it is relatively easy for a small team to set up and run. We run it using Docker Compose and secure it with Caddy as a reverse proxy.

We use Dagster to extract data from multiple sources and present it within G-Trac (our Django app) as a unified view. G-Trac maintains access control and audit logs for all data access. Team members can now visit a single point for all their data needs.

## Conclusion

Investing time in solving this issue is worth it, as it enables data re-use and scalability, which are essential for comprehending the high-dimensional biological datasets produced by the latest biotechnologies. We'll monitor our progress, and I may provide updates in the future.

If you face a similar challenge, I recommend you look into data orchestrators, particularly Dagster. They can help tame the complexity of multi-omic data and provide a unified view of your data landscape. Having said that, none of this is trivial, so feel free to connect on X/Twitter if you have any questions.
