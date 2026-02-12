---
layout: post
title: Series of IC design
date: 2024-03-22 01:24
teaser: An OpenIC project to develop IC design platform using open-source EDA tools
image: /imgs/openic/20240322_series_IC_design/00_wallpaper.png
author: heroh396
comments: true
redirect_from:
shortUrl:
---

# Intro

## Mission
We have built a small team for a non-profit ASIC design project.
We are building an ASIC design platform named OpenIC that includes implementation flow, teaching documents, technique sharing, etc., using open-source EDA implementation tools (OpenLane, SKY130 PDK).
Our objective is to create a fundamental environment for anyone interested in IC design so they can learn and be able to build a chip by themselves.
## Team member
+ Gideon: a DFT engineer with 6+ years of experience
+ Leo: an ASIC design engineer with 6+ years of experience
+ Lucero: an electronics teacher with a high passion for IC, English and Sharing


# Management methodology
We started this project by creating a mind map to answer the questions: what, why, when, who, how.
![openic mindmap](/imgs/openic/20240322_series_IC_design/openic_mindmap.png)

My team need a project management tool, so we decided to use Meistertask (edu pro license $133/year)
![openic task](/imgs/openic/20240322_series_IC_design/openic_task_manage.png)


# Training
We created RTL2GDS introduction document and start training to our teacher ^^.
![openic rtl2gds intro](/imgs/openic/20240322_series_IC_design/RTL2GDS_intro_overview.png)

# Implementation

We will use OpenLand flow to implement design from RTL to GDS and wish it can submit to Google MPW to tapout chip.
![openland intro](/imgs/openic/20240322_series_IC_design/openland_intro.png)

Excecuting Efabless Caravel User Project used OpenLand EDAs trial done - a small but important success!!
![openic trial](/imgs/openic/20240322_series_IC_design/efabless_trial_result.png)

# Result

WIP

# Progress
+ Mar 22, 2024: Initial brainstorming
+ Mar 23, 2024: Discuss with Lucero
+ Arp 04, 2024: First meeting to initial OpenIC project. Adding new key member (Leo)
+ Arp 13, 2024: CPU design preparation done
+ Arp 20, 2024: CPU design training start
+ Arp 27, 2024: Blog writing training using Github done
+ May 07, 2024: RTL2GDS document creation ongoing (30%)
+ May 14, 2024: RTL2GDS document creation done
+ May 18, 2024: RTL2GDS introduction (1st meeting)
+ May 28, 2024: Trial Efabless Caravel User Project used OpenLand EDAs done