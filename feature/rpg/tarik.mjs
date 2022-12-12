const handle = async (m, { q, conn, db, repl }) => {
	let i = db.users.findIndex(v => v[0] == m.sender)
	if (!db.users[i][1].daftar) return repl('Anda belom mendaftar!, daftar dengan perintah .daftar nama');
	let sisa = 3000 
	let v = db.users[i][2].bank - sisa
	if (m.args[0] === 'all') {
		db.users[i][2].coin += v;
		db.users[i][2].bank -= v;
		return repl(`PENARIKAN SUKSES\n\n`
				+`Detail penarikan:\n`
				+`Nama: ${db.users[i][2].name}\n`
				+`Jumlah penarikan: ${v.rupiah()}\n`
				+`Sisa saldo: ${db.users[i][2].bank.rupiah()}\n`
				+`Waktu menarik: ${(Date.now()).datestring()}\n`
			)
	}
	if (!Number(m.args[0]) || m.args[0] <1) return repl('Invalid angka!');
	if (db.users[i][2].bank <= 3000) return repl('Sisa saldo anda tidak cukup untuk ditarik');
	let jmlhTarik = parseInt(m.args[0])
	if (m.args[0] > v) jmlhTarik = v
	db.users[i][2].coin += jmlhTarik;
	db.users[i][2].bank -= jmlhTarik;
	repl(`PENARIKAN SUKSES\n\n`
	+`Detail penarikan:\n`
	+`Nama: ${db.users[i][2].name}\n`
	+`Jumlah penarikan: ${jmlhTarik.rupiah()} Rupe\n`
	+`Sisa saldo: ${db.users[i][2].bank.rupiah()} Rupe\n`
	+`Waktu menarik: ${(Date.now()).datestring()}\n`
	)
}

export default handle;