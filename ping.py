#!/bin/python3

import requests
import os
import subprocess

hostname = "192.168.1.99"
response = os.system("ping -c 1 " + hostname)


def send_cmd(println,power):
    print("Connection " + str(println))
    subprocess.call(["/home/alex/shn/bash/ledstrip.py", "-p", str(power)])


if response == 0:
    send_cmd(found.,on)
else:
    send_cmd(lost.,off)

