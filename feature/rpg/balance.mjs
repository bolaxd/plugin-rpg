const handle = async (m, { q, conn, db, repl }) => {
	let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
	let i = db.users.findIndex(v => v[0] == user)
	if (!db.users[i][1].daftar) return repl('Anda belom mendaftar!, daftar dengan perintah .daftar nama');
	repl(`BALANCE USER\n\n`
		+`Nama: ${db.users[i][2].name}\n`
		+`Level: ${db.users[i][2].level}\n`
		+`Progress: ${db.users[i][2].xp} XP\n`
		+`Duit: ${db.users[i][2].coin.rupiah()} Rupe\n`
		+`Perak: ${db.users[i][2].silver.rupiah()} Batang\n`
		+`Emas: ${db.users[i][2].gold.rupiah()} Batang\n`
		+`Simpanan: ${db.users[i][2].bank.rupiah()} Rupe / ${db.users[i][2].maxbank.rupiah()}\n`
		+`Menang: ${db.users[i][2].win}\n`
		+`Kalah: ${db.users[i][2].win}\n`
		+`Kartu Ganti Nama: ${db.users[i][2].cn}\n`
		)
}

export default handle;