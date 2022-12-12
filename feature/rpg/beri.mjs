const handle = async (m, { q, conn, db, repl }) => {
	let i = db.users.findIndex(v => v[0] == m.sender)
	if (!m.mentionedJid[0]) return repl(`Contoh beri: .${m.command} @user 1000`)
	let u = db.users.findIndex(v => v[0] == m.mentionedJid[0])
	if (!m.args[1]) return repl(`Contoh beri: .${m.command} @user 1000`)
	if (u == -1) return conn.sendteks(m.chat, `@${m.mentionedJid[0].split('@')[0]} tidak ada didalam db...`, m, {mentions: [m.mentionedJid[0]]})
	if (!db.users[i][1].daftar) return repl('Anda belom mendaftar!, daftar dengan perintah .daftar nama');
	if (!db.users[u][1].daftar) return repl('Dia belom mendaftar!, Ajaklah mendaftar dan bermainlah bersama...');
	if (!Number(m.args[1]) || m.args[1] < 1) return repl('Invalid angka!\nMasukan angka dengan benar');
	db.users[i][2].coin -= parseInt(m.args[1])
	db.users[u][2].coin += parseInt(m.args[1])
	repl(`Sukses menyumbang ${db.users[i][2].name}, ${db.users[i][2].name} telah menerima Duit sebesar ${parseInt(m.args[1]).rupiah()} Rupe\nSisa Duitmu ${db.users[i][2].coin.rupiah()} Rupe`)
}

export default handle;