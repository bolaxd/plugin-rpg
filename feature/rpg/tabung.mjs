const handle = async (m, { q, conn, db, repl }) => {
	let i = db.users.findIndex(v => v[0] == m.sender)
	if (!db.users[i][1].daftar) return repl('Anda belom mendaftar!, daftar dengan perintah .daftar nama');
	if (db.users[i][2].maxbank >= db.users[i][2].bank) return repl(`Bank mu sudah penuh!, tingkatkan level untuk memiliki kapasitas bank yang besar!`);
	let sisa = db.users[i][2].maxbank - db.users[i][2].bank;
	if (m.args[0] == 'all') {
		let tabungAll = db.users[i][2].coin
		if (db.users[i][2].coin > sisa) tabungAll = sisa
		db.users[i][2].bank += tabungAll;
		db.users[i][2].coin -= tabungAll;
		return repl(`PENABUNGAN SUKSES\n\n`
		+`Detail deposit:\n`
		+`Nama: ${db.users[i][2].name}\n`
		+`Bank Sebelum Deposit: ${(db.users[i][2].bank - tabungAll).rupiah()} Rupe\n`
		+`Bank Setelah Deposit: ${db.users[i][2].bank.rupiah()} Rupe\n`
		+`Jumlah Menabung: ${tabungAll.rupiah()} Rupe\n`
		+`Waktu Menabung: ${(Date.now()).datestring()}\n`
		);
	}
	if (!Number(m.args[0]) || m.args[0] <1) return repl('Invalid angka!');
	if (m.args[0] < 1000) return repl('Minimal menabung adalah 1000');
	let jmlhTabung = parseInt(m.args[0]);
	if (m.args[0] > sisa) jmlhTabung = sisa
	db.users[i][2].bank += jmlhTabung; 
	db.users[i][2].coin -= jmlhTabung;
	repl(`PENABUNGAN SUKSES\n\n`
	+`Detail deposit:\n`
	+`Nama: ${db.users[i][2].name}\n`
	+`Bank Sebelum Deposit: ${(db.users[i][2].bank - jmlhTabung).rupiah()} Rupe\n`
	+`Bank Setelah Deposit: ${db.users[i][2].bank.rupiah()} Rupe\n`
	+`Jumlah Menabung: ${jmlhTabung.rupiah()} Rupe\n`
	+`Waktu Menabung: ${(Date.now()).datestring()}\n`
	);
}

export default handle;