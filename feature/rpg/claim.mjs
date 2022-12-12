const handle = async (m, { q, conn, db, repl }) => {
	let i = db.users.findIndex(v => v[0] == m.sender)
	if (!db.users[i][1].daftar) return repl('Anda belom mendaftar!, daftar dengan perintah .daftar nama');
	let time = Date.now() - db.users[i][2].claim
	if (time < 86400000) return repl(`Ups!\nAnda hanya dapat mengklaim duit sehari sekali\nBarusaja anda mengklaim duitnya pada : ${time.timers()} yang lalu`)
	db.users[i][2].claim = Date.now()
	db.users[i][2].coin += db.users[i][2].hadiah
	repl(`Claim Duit harian sukses!\n`
		+ `Duit didapat: ${db.users[i][2].hadiah.rupiah()}`
		)
}

export default handle;