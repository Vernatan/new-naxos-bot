const fs = require('fs')
const chalk = require('chalk')

//—————「 Command Server 」—————// UBAH TULISAN DI DALAM TANDA (') JIKA INGIN MENGUBAH COMMAND BOT
global.cmdmyprofil = 'myprofil'
global.cmdlistplayers = 'listplayers'
global.cmdlistucp = 'listucp'
global.cmddelcs = 'delcs'
global.cmdaddcs = 'addcs'
global.cmdsetadmin = 'setadmin'
global.cmdunadmin = 'unsetadmin'
global.cmdsetadminname = 'setadminname'
global.cmdchangename = 'changename'
global.cmdchangeucp = 'changeucp'
global.cmducp = 'register'
global.cmdwl = 'addwl'
global.cmdunwl = 'delwl'
global.cmdcekucp = 'cekucp'
global.cmdgetip = 'getplayerip'
global.cmdbanip = 'banip'
global.cmdban = 'ban'

//—————「 APIKEY & PANEL 」—————//
global.apikey = 'LOL_KEY' // LOLHUMAN APIKEY DAPATKAN APIKEY DI API.LOLHUMAN.XYZ
global.botkey = 'BOT_KEY' //BOT KEY, CHAT DEVLOPER UNTUK MEMBELI KEY
global.rosekey = 'cba86fac49e37d63f9bd4561' // ROSE KEY

//—————「 Set Host Untuk Koneksi ke Server WL 」—————//
global.host = 'HOST' // HOST SFTP
global.port = 'PORT' // PORT SFTP
global.username = 'USERNAME' //USERNAME SFTP
global.password = 'PASSWORD' //PASSWORD SFTP
global.wlgrupid = 'GRUPID' // UBAH MENJADI ID GROUP, GROUP WHITELIST KALIAN
global.grupwl = 'Whitelist' // UBAH MENJADI LINK GROUP WHITELIST KALIAN
global.sftppath = '/scriptfiles/whitelist/' //UBAH MENJADI PATH TEMPAT FILE WHITELIST KALIAN BERADA


//—————「 Setting UCP Jika menggunakan UCP 」—————//
global.requcp = 'GRUPID' // UBAH MENJADI ID GROUP, GROUP REQ UCP KALIAN
global.grupucp = "https://chat.whatsapp.com/JBOGKGP6D1P0Uc5BXkKyzJ" // UBAH MENJADI LINK GROUP REQ UCP KALIAN
global.grupofficial = "GRUPOFFICIAL" // UBAH MENJADI LINK GROUP OFFICIAL KALIAN
global.chatwarga = "GRUPCHAT" // UBAH MENJADI LINK GROUP CHAT WARGA KALIAN

//—————「 Setting Samp Query 」—————//
global.ipkah = 'PRIVAT' //UBAH MENJADI IP ATAU DOMAIN SERVER KALIAN JIKA INGIN DI MUNCULKAN DI !SERVERSTATUS
global.serverIP = 'IP_KALIAN' //UBAH MENJADI IP SERVER KALIAN
global.serverPort = 'PROT_KALIAN' // UBAH MENJADI PORT SERVER KALIAN

//—————「 Set Nama Bot & Own 」—————//
global.namabot = 'ɴᴀxᴏꜱ-ʙᴏᴛ' // UBAH MENJADI NAMA BOT KALIAN
global.namaowner = 'ᴀʀᴜʟʟ' // UBAH MENJADI NAMA OWNER KALIAN
global.servername = 'NAXOS CIITY' //UBAH MENJADI NAMA SERVER KALIAN

//—————「 Setting Owner 」—————//
global.owner = ['6289646775883'] // MASUKAN NOMOR OWNER
global.nomerowner = '6289646775883' // MASUKAN NOMOR OWNER
global.figlett = 'tess'  // MASUKAN NAMA TERSERAH KALIAN JIKA INGIN MENGUBAH NAMA DI TERMINAL

//—————「 Setting Server 」—————//
global.sultan = '500000' // UBAH MENJADI MINIMAL UANG UNTUK MENDAPATKAN STATUS SULTAN DI !MYPROFIL
global.kaya = '100000' // UBAH MENJADI MINIMAL UANG UNTUK MENDAPATKAN STATUS KAYA DI !MYPROFIL
global.biasa = '50000' // UBAH MENJADI MINIMAL UANG UNTUK MENDAPATKAN STATUS BIASA DI !MYPROFIL
global.ipport = 'IP_KALIAN:PORT_KALIAN' // UBAH MENJADI IP PORT SERVER KALIAN CONTOH : PLAY.ARIVENA.COM:7777 ATAU 235.22.8.130:3369
global.pendek = '5' // UBAH JIKA INGIN MENGGANTI MINIMAL HURUF KARAKTER NAMA UCP
global.panjang = '10' //UBAH JIKA INGIN MENGGANTI MAKSIMAL HURUF KARAKTER NAMA UCP

//—————「 THUMB 」—————//
global.thumb = 'https://telegra.ph/file/e86ebecedbd70c5be2935.png' // UBAH MENJADI FOTOMU

//—————「 Set Message 」—————// UBAH MESSAGE YANG DIKIRIM BOT
global.mess = {
    success: '🤗Done, Oke Desu~',
    admin: '❗Perintah Ini Hanya Bisa Digunakan Oleh Admin Group !',
    botAdmin: '❗Perintah Ini Hanya Bisa Digunakan Ketika Bot Menjadi Admin Group !',
    owner: '❗Lu Bukan Owner Bgst!',
    group: '❗Perintah Ini Hanya Bisa Digunakan Di Group Chat !',
    private: '❗Perintah Ini Hanya Bisa Digunakan Di Private Chat !',
    wait: '⏳ Sedang Di Proses !',
    error: '🚫 Fitur Sedang Error !',
}

//—————「 Batas Akhir 」—————//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
