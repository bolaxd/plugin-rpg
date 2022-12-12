const handle = async (m, { q, conn, db, repl }) => {
	let i = db.users.findIndex(v => v[0] == m.sender)
	if (!db.users[i][1].daftar) return repl('Anda belom mendaftar!, daftar dengan perintah .daftar nama');
	if (!m.args[1]) return repl(`Silahkan masukan emas yg ingin anda beli\nSilahkan masukan jumlahnya!`);
	if (m.args[0] === 'promo') {
	} else if (m.args[0] === 'buyemas') {
	} else if (m.args[0] === 'buyperak') {
	} else {
		let list = [
			['Perak 10000'],
			['Perak 30000'],
			['Perak 50000'],
			['Perak 70000'],
			['Perak 90000'],
			['Perak 120000'],
			['Emas 8000'],
			['Emas 16000'],
			['Emas 32000'],
			['Emas 64000'],
			['Emas 128000'],
			]
		conn.sendlist(`SHOPING TIME\n\n`)
	}
}

export default handle;