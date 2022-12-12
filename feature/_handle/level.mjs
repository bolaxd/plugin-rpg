const handle = async (m, { q, conn, db, repl }) => {
	let i = db.users.findIndex(v => v[0] == m.sender)
	let command = db.cmd.filter(v => v[1].startsWith('rpg'));
	if (!db.users[i][1].daftar) return
	command.map(v => { if (m.command === v[0]) db.users[i][2].xp += 1 })
	if (db.users[i][2].xp == db.users[i][2].up) {
		let teks;
		db.users[i][2].xp += 1
		let levelAwal = db.users[i][2].level
		db.users[i][2].level += 1
		db.users[i][2].up *= db.users[i][2].level
		let hadiah = db.users[i][2].hadiah
		db.users[i][2].hadiah *= 3
		let maxbank = db.users[i][2].maxbank 
		db.users[i][2].maxbank *= 3
		let maxcredit = db.users[i][2].maxcredit
		db.users[i][2].maxcredit *= 2
		repl(`LEVEL UP!!!\n\n`
		+ `Level: ${levelAwal} => ${db.users[i][2].level}\n`
		+ `Hadiah: +${(hadiah * 3).rupiah()}\n`
		+ `Progress XP: ${db.users[i][2].up}\n\n`
		+ `Kapasitas Bank: ${maxbank.rupiah()} => ${db.users[i][2].maxbank.rupiah()} Rupe\n`
		+ `Max Kredit: ${maxcredit.rupiah()} => ${db.users[i][2].maxcredit.rupiah()}`
		+ teks
		)
	}
}

export default handle;