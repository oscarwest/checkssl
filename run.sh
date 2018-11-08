#!/bin/bash

curl https://cdn.collector.se/commoninfrastructure/domains.txt > domains.txt
./checkssl.sh -f domains.txt