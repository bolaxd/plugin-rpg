const handle = async (m, { q, conn, db, repl }) => {
	let i = db.users.findIndex(v => v[0] == m.sender)
	if (!m.mentionedJid[0]) return repl(`Contoh Transfer: .${m.command} @user 1000`)
	let u = db.users.findIndex(v => v[0] == m.mentionedJid[0])
	if (!m.args[1]) return repl(`Contoh Transfer: .${m.command} @user 1000`)
	if (u == -1) return conn.sendteks(m.chat, `@${m.mentionedJid[0].split('@')[0]} tidak ada didalam db...`, m, {mentions: [m.mentionedJid[0]]})
	if (!db.users[i][1].daftar) return repl('Anda belom mendaftar!, daftar dengan perintah .daftar nama');
	if (!db.users[u][1].daftar) return repl('Dia belom mendaftar!, Ajaklah mendaftar dan bermainlah bersama...');
	if (db.users[u][2].bank >= db.users[u][2].maxbank) return repl('Bank nya telah penuh!');
	let sisa = db.users[u][2].maxbank - db.users[u][2].bank
	if (m.args[1] === 'all') {
		let tfAll = db.users[i][2].bank
		if (db.users[i][2].bank > sisa) tfAll = sisa
		db.users[u][2].bank += tfAll;
		db.users[i][2].bank -= tfAll;
		return repl(`TRANSFER BANK SUCCESS\n\n`
		+`Detail Trsnsaksi:\n`
		+`Nama: ${db.users[i][2].name}\n`
		+`Nama Tujuan: ${db.users[u][2].name}\n`
		+`Jumlah transfer: ${tfAll.rupiah()} Rupe\n`
		+`Waktu transfer: ${(Date.now()).datestring()}`
		);
	}
	if (!Number(m.args[1]) || m.args[1] < 1) return repl('Invalid angka!\nMasukan angka dengan benar');
	let tfTo = parseInt(m.args[1]);
	if (m.args[1] > sisa) tfTo = sisa;
	db.users[i][2].bank -= tfTo;
	db.users[u][2].bank += tfTo;
	repl(`TRANSFER BANK SUCCESS\n\n`
		+`Detail Transaksi:\n`
		+`Nama: ${db.users[i][2].name}\n`
		+`Nama Tujuan: ${db.users[u][2].name}\n`
		+`Jumlah transfer: ${tfTo.rupiah()} Rupe\n`
		+`Waktu transfer: ${(Date.now()).datestring()}`
		)
}

export default handle;