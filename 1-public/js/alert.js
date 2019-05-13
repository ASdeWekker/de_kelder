function notifyMe() {
	if (!("Notification" in window)) {
		alert("This browser does not support this shit")
	} else if (Notification.permission === "granted") {
		let notification = new Notification("Hi there")
	} else if (Notification.permission !== "denied") {
		Notification.requestPermission().then((permission) => {
			if (permission === "granted") {
				let notification = new Notification("Hi there")
			}
		})
	}
}