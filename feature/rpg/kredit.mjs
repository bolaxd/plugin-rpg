const handle = async (m, { q, conn, db, repl }) => {
	let i = db.users.findIndex(v => v[0] == m.sender)
	if (!db.users[i][1].daftar) return repl('Anda belom mendaftar!, daftar dengan perintah .daftar nama');
	if (!m.args[0]) return repl('Masukan Jumlah Duit yang ingin di pinjam');
	if (!Number(m.args[0])) return repl('Invalid Nominal!')
	if (m.args[0] < 10000) return repl('Minimal Credit 10000 Rupe')
	if (m.args[0] > db.users[i][1].maxcredit) return repl(`Maksimal Credit anda adalah ${db.users[i][1].maxcredit.rupiah()} Rupe\nTibgkatkan level anda agar dapat meminjam Duit dengan banyak`)
	let jam = (parseInt(m.args[0]) / 10) * 2 * 60 * 60
	if (m.args[1] === 'y') {
		db.users[i][1].coin += parseInt(m.args[0])
		repl(`Sukses kredit!\nDuit anda sekarang menjadi: ${db.users[i][1].coin.rupiah()} Rupe`)
	} else {
		let teks = `Anda akan mengkredit Duit sebesar ${parseInt(m.args[0]).rupiah()} Rupe\n`
					+ `Dengan jatuh tempo ${jam.timers()} Lagi\n`
					+ `Apakah anda yakin ingin melanjutkan nya?\n\n`
					+ `--:--: Rules Kredit :--:--\n`
					+ `> Anda wajib membayar uang kredit sebelum jatuh tempo\n`
					+ `> Konsekuensi Jika tidak dibayar maka klaim harian anda akan dibekukan\n`
					+ `> Klaim harian dibekukan sesuai Duit yang anda kredit\n`
		conn.butteks(m.chat, teks, `Konfirmasi kredit agar dapat diteruskan ke Duit anda!`, [['KONFIRMASI',`.${m.command} ${m.args[0]} y`]], m)
	}
}

export default handle;