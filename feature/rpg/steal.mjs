const handle = async (m, { q, conn, db, repl }) => {
	let i = db.users.findIndex(v => v[0] == m.sender)
	if (!m.mentionedJid[0]) return repl(`Contoh steal: .${m.command} @user`)
	let u = db.users.findIndex(v => v[0] == m.mentionedJid[0])
	if (u == -1) return conn.sendteks(m.chat, `@${m.mentionedJid[0].split('@')[0]} tidak ada didalam db...`, m, {mentions: [m.mentionedJid[0]]})
	if (!db.users[i][1].daftar) return repl('Anda belom mendaftar!, daftar dengan perintah .daftar nama');
	if (!db.users[u][1].daftar) return repl('Dia belom mendaftar!, Ajaklah mendaftar dan bermainlah bersama...');
	if ((Date.now() - db.users[u][2].steal) < 10800000) return repl(`Dia baru saja di steal!\nSilahkan tunggu sampai ${(10800000 - (Date.now() - db.users[u][2].steal)).timers()} Lagi!`);
	let duitJarah = Math.floor(db.users[u][2].coin * 10) / 100 
	if (duitJarah > 5000000) duitJarah = 5000000
	let duitTarget = db.users[u][2].coin
	db.users[i][2].coin += duitJarah
	db.users[u][2].coin -= duitJarah
	repl(`Kamu mendapatkan curian sebesar: ${duitJarah.rupiah()} Rupe Dari *${db.users[u][2].name}*`);
	await q.delay(2000)
	conn.sendteks(m.mentionedJid[0], `Uang anda tercuri!\nAkibat anda lupa/lalai menghidupkan anti steal!\nDuit awal: ${duitTarget.rupiah()} Rupe\nTerpotong: -${duitJarah.rupiah()} Rupe`)
}

export default handle;