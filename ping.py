#!/bin/python3

import requests
import os
import subprocess

hostname = "192.168.1.99"
response = os.system("ping -c 1 " + hostname)

if response == 0:
    print("Connection found.")
    subprocess.call(["ledstrip", "on"])
else:
    print("Connection lost")
    subprocess.call(["ledstrip", "off"])
