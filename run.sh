#!/bin/bash

curl https://cdn.collector.se/commoninfrastructure/domains.txt > domains.txt
./checkssl -f domains.txt