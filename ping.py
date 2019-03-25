#!/bin/python3

import requests
import os

hostname = "192.168.1.77"
response = os.system("ping -c 1 " + hostname)

if response == 0:
    pingstatus = "Pcaats is on"
    # doe iets
    print("ja")
else:
    pingstatus = "Pcaats is off"
    # doe nog iets
    print("nee")
