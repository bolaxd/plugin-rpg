const handle = async (m, { q, conn, db, repl, bot }) => {
	let i = db.users.findIndex(v => v[0] == m.sender) 
	let b = db.users.findIndex(v => v[0] == b) 
	if (db.users[i][1].daftar) return repl('Anda telah mendaftarkan Nomor anda!');
	let [n, verif] = m.query.split('|') 
	if (!n) return repl('Masukan nama anda!\nPastikan Memilih font nama yang bagus...');
	if (n.length < 4) return repl('Invalid nama!\nMinimal 4 karakter')
	if (n.length > 25) return repl('Invalid nama!\nMaks 25 karakter')
	if (!verif) return conn.butteks(m.chat, db.set[b][1].term, 'Baca rules dalam menggunakan bot rpg ini...', [['Setuju',`.${m.command} ${n}|verif`]], m)
	if (verif == 'verif') {
		// Pertama daftar
		var name = m.query
		var coin = 15000
		var bank = 1000
		var maxbank = 100000
		var level = 1 
		var work = 0 
		var claim = 0 
		var hadiah = 20000
		var maxcredit = 30000
		var lasthit = 0
		var gold = 2000
		var silver = 3500
		var up = 150 
		var xp = 0 
		var cn = 1
		var steal = 0
		var antisteal = 0
		var antistealjumlah = 0
		db.users[i].push({
			nama,
			coin,
			bank,
			gold,
			silver,
			maxbank,
			level,
			work,
			claim,
			hadiah,
			credit,
			maxcredit,
			lasthit,
			up,
			xp,
			cn,
			steal,
			antisteal,
			antistealjumlah,
		});
		repl(
			 `*Terdaftar!*\n\n`
			+`Nama: ${nama}\n`
			+`Level: ${level}\n`
			+`Progress: ${xp} XP\n`
			+`Duit: ${coin.rupiah()} Rupe\n`
			+`Perak: ${silver} Batang\n`
			+`Emas: ${gold} Batang\n`
			+`Simpanan: ${bank.rupiah()} Rupe\n`
			+`Kartu Ganti Nama: ${cn}\n`
			+`\nUntuk lainnya cek detail di balance anda`
			)
	}
}

export default handle;