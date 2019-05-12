let button

function request(ip,power) {
	let xhttp, obj
	xhttp = new XMLHttpRequest()
	xhttp.open("GET", "http://10.8.0.4:3099/req/" + ip + "/" + power)
	//xhttp.open("GET", "http://192.168.1." + ip + "/?power=" + action, true)
	xhttp.send()
}
