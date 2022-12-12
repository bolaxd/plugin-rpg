const handle = async (m, { q, conn, db, repl }) => {
	let i = db.users.findIndex(v => v[0] == m.sender)
	if (!db.users[i][1].daftar) return repl('Anda belom mendaftar!, daftar dengan perintah .daftar nama');
	if (!m.args[0]) return repl('Masukan Nominal judi...');
	if (!Number(m.args[0])) return repl('Invalid Number...');
	if (m.args[0] < 1000) return repl('Minimal 1000 Buat judi...')
	let bott = db.users[i][2].coin
	switch (db.users[i][2].coin) {
		case db.users[i][2].coin <= 100000:{ bott = 280 }break;case db.users[i][2].coin <= 1000000:{ bott = 320 }break;case db.users[i][2].coin <= 9000000:{ bott = 330 }break;case db.users[i][2].coin <= 100000000:{ bott = 340 }break;case db.users[i][2].coin <= 800000000:{ bott = 350 }break;case db.users[i][2].coin <= 10000000000:{ bott = 370 }break;case db.users[i][2].coin >= 10000000000:{ bott = 380 }break;
	}
	const bot = Math.floor(Math.random() * redem)
	const user = Math.floor(Math.random() * 270)
	if (bot > user) {
		let judiDuit = parseInt(m.args[0])
		if (m.args[0] > db.users[i][2].coin) judiDuit = db.users[i][2].coin 
		db.users[i][2].coin -= judiDuit
		repl(`BETTING LOSE\n\n`
		+`${conn.user.name}: ${bot}\n`
		+`${db.users[i][2].name}: ${user}\n`
		+`Duit anda: -${judiDuit.rupiah()} Rupe\n`
		)
	} else if (bot < user) {
		let judiDuit = parseInt(m.args[0]) * 2
		if (m.args[0] > db.users[i][2].coin) judiDuit = db.users[i][2].coin * 2
		db.users[i][2].coin += judiDuit
		repl(`BETTING WIN\n\n`
		+`${conn.user.name}: ${bot}\n`
		+`${db.users[i][2].name}: ${user}\n`
		+`Duit anda: +${judiDuit.rupiah()} Rupe\n`
		)
	}
}

export default handle;