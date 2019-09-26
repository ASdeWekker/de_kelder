const { Client } = require("pg")
require("dotenv").config({ path: "/var/www/html/backup/projects/weight/1-public/.env" })
const query = `
create table if not exists oefenen (
	id serial primary key not null,
	name varchar(20) unique not null,
	port int unqiue not null check(port>3000))
`

const connStr = "postgres://" + process.env.PSQLU + ":" + process.env.PSQLW + "@192.168.1.90:5432/dekelder"
const client = new Client({ connectionString: connStr })
client.connect()
client.query(query).then(data => {
	console.log(data)
	client.end()
}).catch( e=> {
	console.error(e.stack)
	client.end()
})
