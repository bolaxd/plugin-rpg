const handle = async (m, { q, conn, db, repl }) => {
	conn.slot = conn.slot ? conn.slot : {}
	let id = m.chat
	let i = db.users.findIndex(v => v[0] == m.sender)
	if (!db.users[i][1].daftar) return repl('Anda belom mendaftar!, daftar dengan perintah .daftar nama');
	if (m.args[0] === 'start') {
		if (!(id in conn.slot)) return repl('Tidak ada yg menyelenggarakan slot disini...');
		await repl('Mulai mengacak pemenang dalam 5 detik...')
		await q.delay(1000)
		await repl('5')
		await q.delay(1000)
		await repl('4')
		await q.delay(1000)
		await repl('3')
		await q.delay(1000)
		await repl('2')
		await q.delay(1000)
		let jumlahIkut = conn.slot[id][1].length
		let pemenang = conn.slot[id][1].rendem()
		let hadiah = jumlahIkut * parseInt(conn.slot[id][0])
		let __i = db.users.findIndex(x => x[0] == pemenang)
		db.users[__i][2].coin += parseInt(hadiah);
		delete conn.slot[id]
		conn.sendteks(m.chat, `Selamat kepada @${pemenang.split('@')[0]}\nyng telah memenangkan slot dari semua participant ${jumlahIkut}\nHadiah: ${hadiah.rupiah()} Rupe`, m, { mentions: [pemenang] })
	} else if (m.args[0] === 'cancel') {
		if (!(id in conn.slot)) return repl('Tidak ada yg menyelenggarakan slot disini...');
		if (conn.slot[id][1][0] !== m.sender) return repl('Anda bukan penyelenggara slot!');
		conn.slot[id][1].map((parti) => {
			let _i = db.users.findIndex(j => j[0] == parti)
			db.users[_i][2].coin += conn.slot[id][0]
		})
		delete conn.slot[id]
		repl('Sukses membatalkan game slot ini...')
	} else if (m.args[0] === 'include') {
		if (!(id in conn.slot)) return repl('Tidak ada yg menyelenggarakan slot disini...');
		if (conn.slot[id][1].concat(conn.slot[id][1]).includes(m.sender)) return repl('Anda sudah memasang slot anda!')
		if (db.users[i][2].coin < conn.slot[id][0]) return repl('Duit anda tidak cukup untuk memasang slot ini...');
		conn.slot[id][1].push(m.sender);
		db.users[i][2].coin -= parseInt(conn.slot[id][0]);
		let list = [
			['Pasang', `.${m.command} include`, 'Pasang lah slot disini'],
			['Mulai', `.${m.command} start`, 'Mulai slot ini untuk mengacak pemenang!'],
			['Batalkan', `.${m.command} cancel`, 'Bagalkan slot ini, hanya penyelenggara yg dapat membatalkan!']
		]
		conn.sendlist(m.chat, `SLOT JUDI\n\n`
		+`Penyelenggara slot: ${conn.slot[id][1][0]}\n`
		+`Jumlah Duit ditaruhkan: ${conn.slot[id][0].rupiah()} Rupe\n`
		+`Total ikut: ${conn.slot[id][1].length}\n`
		+`${conn.slot[id][1].map((v, i) => `${i+1}. ${v.split('@')[0]}`).join('\n')}`, 
		q.name, list, m)
	} else {
		if (!Number(m.args[0])) return repl('Invalid angka!');
		if (db.users[i][2].level < 3) return repl('Level anda masih rendah!\nMenjadi penyelenggara slot harus level 3 keatas');
		let kurangDuit = parseInt(m.args[0])
		if (m.args[0] > db.users[i][2].coin) kurangDuit = db.users[i][2].coin
		conn.slot[id] = [
				kurangDuit,
				[m.sender],
			]
		db.users[i][2].coin -= kurangDuit
		let list = [
			['Pasang', `.${m.command} include`, 'Pasang lah slot disini'],
			['Mulai', `.${m.command} start`, 'Mulai slot ini untuk mengacak pemenang!'],
			['Batalkan', `.${m.command} cancel`, 'Bagalkan slot ini, hanya penyelenggara yg dapat membatalkan!']
		]
		conn.sendlist(m.chat, `SLOT JUDI\n\n`
		+`Penyelenggara slot: ${conn.slot[id][1][0]}\n`
		+`Jumlah Duit ditaruhkan: ${conn.slot[id][0].rupiah()} Rupe\n`
		+`Total ikut: ${conn.slot[id][1].length}\n`
		+`${conn.slot[id][1].map((v, i) => `${i+1}. ${v.split('@')[0]}`).join('\n')}`, 
		q.name, list, m)
	}
}

export default handle;