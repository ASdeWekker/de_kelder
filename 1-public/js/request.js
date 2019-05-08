let button

function request(ip,action) {
	let xhttp, obj
	xhttp = new XMLHttpRequest()
	xhttp.open("GET", "http://192.168.1." + ip + "/?power=" + action, true)
	xhttp.send()
}
