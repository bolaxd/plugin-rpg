const handle = async (m, { q, conn, db, repl }) => {
	if (!m.isOwn) return repl(q.owner);
	let i = db.users.findIndex(v => v[0] === m.query.replace(/[^0-9]/g, '')+'@s.whatsapp.net')
	if (!db.users[i][1].daftar) return repl('Dia tidak mendaftar game rpg')
	db.users[i].pop()
	repl('sukses mendelete akun tersebut!')
}

export default handle;