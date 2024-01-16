require('./config')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys");
const fs = require("fs");
const util = require("util");
var _0xe090=["\x63\x68\x61\x6C\x6B","\x63\x72\x79\x70\x74\x6F","\x61\x78\x69\x6F\x73","\x6D\x6F\x6D\x65\x6E\x74\x2D\x74\x69\x6D\x65\x7A\x6F\x6E\x65","\x68\x75\x6D\x61\x6E\x2D\x72\x65\x61\x64\x61\x62\x6C\x65","\x6A\x69\x6D\x70","\x73\x74\x72\x65\x61\x6D","\x6F\x70\x65\x6E\x61\x69","\x73\x61\x6D\x70\x2D\x71\x75\x65\x72\x79","\x73\x73\x68\x32\x2D\x73\x66\x74\x70\x2D\x63\x6C\x69\x65\x6E\x74"];const chalk=require(_0xe090[0]);const Crypto=require(_0xe090[1]);const axios=require(_0xe090[2]);const moment=require(_0xe090[3]);const {sizeFormatter}=require(_0xe090[4]);const Jimp=require(_0xe090[5]);const {defaultMaxListeners}=require(_0xe090[6]);const {Configuration,OpenAIApi}=require(_0xe090[7]);const query=require(_0xe090[8]);const Client=require(_0xe090[9])
const sftp = new Client();
const con = require('./lib/mysql')
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom, reSize } = require('./lib/myfunc')

const cfg = require('./config.json')
let setting = require("./config.json");

let antilinkSettings = {};
if (fs.existsSync('antilink.json')) {
  antilinkSettings = JSON.parse(fs.readFileSync('antilink.json'));
}

module.exports = sansekai = async (client, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
    const isCmd2 = body.startsWith(prefix);
    const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await client.decodeJid(client.user.id);
    const itsMe = m.sender == botNumber ? true : false;
    const isCreator = [botNumber,`${nomerowner}@s.whatsapp.net`].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    let text = (q = args.join(" "));
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);
    const from = m.chat;
    const reply = m.reply;
    const sender = m.sender;
    const mek = chatUpdate.messages[0];

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };

    const fkontak = {
      key: {
          participant: `0@s.whatsapp.net`,
          ...(m.chat ? {
              remoteJid: `status@broadcast`
          } : {})
      },
      message: {
          'contactMessage': {
              'displayName': `${namaowner}`,
              'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;Koi,;;;\nFN:${namabot}\nitem1.TEL;waid=${owner}:+${nomerowner}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
              'jpegThumbnail': thumb,
              thumbnail: thumb,
              sendEphemeral: true
          }   
      }
  }

    // Group
    const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const groupId = m.chat;
    const antilinkEnabled = antilinkSettings[groupId] === true;


        //Antilink
        if (antilinkEnabled && budy.match(`chat.whatsapp.com`)) {
          reply(`「 ANTI LINK WHATSAPP 」\n\n*JANGAN SHARE GC LAIN!!!*`);
          
          if (!isBotAdmins) return reply(`Ehh Bot Gak Admin T_T`);
        
          let gclink = `https://chat.whatsapp.com/` + (await client.groupInviteCode(m.chat));
          let isLinkThisGc = new RegExp(gclink, 'i');
          let isgclink = isLinkThisGc.test(m.text);
        
          if (isgclink) {
            return reply(`Ehh Maaf Gak Jadi, Link Group Ini Ternyata 😆`);
          }
        
          if (isAdmins || isCreator) {
            return reply(`Ehh Maaf Ternyata Kamu Admin/Owner 😁`);
          }
        
          // Delete the sender's message
          client.sendMessage(m.chat, { delete: m.key });
        
          // Kick the sender from the group
          client.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        }
        

    // Push Message To Console
    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

    if (isCmd2 && !m.isGroup) {
      console.log(chalk.black(chalk.bgWhite("[ LOGS ]")), color(argsLog, "turquoise"), chalk.magenta("From"), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`));
    } else if (isCmd2 && m.isGroup) {
      console.log(
        chalk.black(chalk.bgWhite("[ LOGS ]")),
        color(argsLog, "turquoise"),
        chalk.magenta("From"),
        chalk.green(pushname),
        chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`),
        chalk.blueBright("IN"),
        chalk.green(groupName)
      );
    }

    if (isCmd2) {
      switch (command) {
        case 'sc': 
        case 'sourcecode':
          case 'donasi': 
        case 'jadibot':
          case 'sewabot':
        case 'owner': 
        case 'creator':
                function _0x5ca7(){const _0x12f744=['TEL;type=MSG;type=CELL;type=VOICE;waid=','1455258XGRDbN','ORG:','BEGIN:VCARD\x0a','8glCARe','4Uzqwsv','2737098EYqbAV','6788187wCCBhV','26366AaJhZb','13XSwwdP','7943664guqOVl','7bWwjty','FN:','939415cowkZB','1175933EAkLmn','70nWsFEM'];_0x5ca7=function(){return _0x12f744;};return _0x5ca7();}const _0x2f4a42=_0x4670;function _0x4670(_0x177716,_0x1e9cb2){const _0x5ca7a2=_0x5ca7();return _0x4670=function(_0x46702d,_0xb3ce2f){_0x46702d=_0x46702d-0x103;let _0x21449b=_0x5ca7a2[_0x46702d];return _0x21449b;},_0x4670(_0x177716,_0x1e9cb2);}(function(_0x515640,_0x465970){const _0x171589=_0x4670,_0x11cc00=_0x515640();while(!![]){try{const _0x4dfac7=-parseInt(_0x171589(0x105))/0x1*(-parseInt(_0x171589(0x104))/0x2)+-parseInt(_0x171589(0x112))/0x3*(-parseInt(_0x171589(0x111))/0x4)+-parseInt(_0x171589(0x109))/0x5+-parseInt(_0x171589(0x10d))/0x6*(-parseInt(_0x171589(0x107))/0x7)+-parseInt(_0x171589(0x110))/0x8*(-parseInt(_0x171589(0x103))/0x9)+parseInt(_0x171589(0x10b))/0xa*(-parseInt(_0x171589(0x10a))/0xb)+-parseInt(_0x171589(0x106))/0xc;if(_0x4dfac7===_0x465970)break;else _0x11cc00['push'](_0x11cc00['shift']());}catch(_0x2c2891){_0x11cc00['push'](_0x11cc00['shift']());}}}(_0x5ca7,0x75c33));const vcard=_0x2f4a42(0x10f)+(_0x2f4a42(0x108)+namaowner+'\x0a')+(_0x2f4a42(0x10e)+namabot+';\x0a')+(_0x2f4a42(0x10c)+owner+':+'+nomerowner+'\x0a')+'END:VCARD';client['sendMessage'](m['chat'],{'contacts':{'displayName':namaowner,'contacts':[{'vcard':vcard}]}},{'quoted':fkontak});
        reply(`Chat Owner!`)
                break;
        case 'help':
        case 'menu':
          m.reply(`MENU BOT SERVER ${servername}\n
${prefix}${cmducp} 
${prefix}${cmdcekucp}
${prefix}owner
${prefix}sc
${prefix}serverstatus
${prefix}antilink on/off Ⓐ
${prefix}${cmdgetip} Ⓐ
${prefix}${cmdbanip} Ⓐ
${prefix}${cmdban} Ⓐ
${prefix}${cmdlistucp} Ⓐ
${prefix}${cmdlistplayers} Ⓐ
${prefix}${cmdchangeucp} Ⓐ
${prefix}${cmdchangename} Ⓐ
${prefix}${cmdwl} Ⓐ
${prefix}${cmdunwl} Ⓐ
${prefix}${cmdaddcs} Ⓐ
${prefix}${cmddelcs} Ⓐ
${prefix}${cmdsetadmin} Ⓐ
${prefix}${cmdunadmin} Ⓐ
${prefix}${cmdsetadminname} Ⓐ\n
Ⓐ = Admin/Owner Commands`)
          break;
case 'antilink': {
  if (isCreator && command === 'antilink' && args[0] === 'on') {
    antilinkSettings[groupId] = true;
    fs.writeFileSync('antilink.json', JSON.stringify(antilinkSettings, null, 2));
    reply('Antilink telah diaktifkan untuk grup ini.');
    return; // Exit the function to prevent further processing of the message
  }

  // Check if the command is for disabling antilink
  if (isCreator && command === 'antilink' && args[0] === 'off') {
    antilinkSettings[groupId] = false;
    fs.writeFileSync('antilink.json', JSON.stringify(antilinkSettings, null, 2));
    reply('Antilink telah dinonaktifkan untuk grup ini.');
    return; // Exit the function to prevent further processing of the message
  }
}
break;
          //—————「 Command Server 」—————//       
            case 'serverstatus':
              var _0xdd3e=["\x53\x65\x72\x76\x65\x72\x20","\x20\x73\x65\x64\x61\x6E\x67\x20\x6F\x66\x66\x6C\x69\x6E\x65\x2E","\x45\x72\x72\x6F\x72\x20\x71\x75\x65\x72\x79\x69\x6E\x67\x20\x53\x41\x2D\x4D\x50\x20\x73\x65\x72\x76\x65\x72\x3A","\x65\x72\x72\x6F\x72"];try{const serverStatus= await getServerStatus();if(serverStatus!== false){reply(serverStatus)}else {reply(`${_0xdd3e[0]}${servername}${_0xdd3e[1]}`)}}catch(error){console[_0xdd3e[3]](_0xdd3e[2],error)}
        break;

        case `${cmdgetip}`: {
          reply(`Fitur Khusus Owner!`);
        }
        break;

        case `${cmdbanip}`: {
          reply(`Fitur Khusus Owner!`);
        }
        break;

        case `${cmdban}`: {
          reply(`Fitur Khusus Owner!`);
        }
        break;

          case `${cmdwl}`: 
          var _0xb053=["\x63\x68\x61\x74","\x77\x6C\x67\x72\x75\x70\x69\x64","\x2A\x57\x68\x69\x74\x65\x6C\x69\x73\x74\x20\x68\x61\x6E\x79\x61\x20\x62\x69\x73\x61\x20\x64\x69\x6C\x61\x6B\x75\x6B\x61\x6E\x20\x64\x69\x20\x67\x72\x75\x70\x20","\x2A","\x41\x6E\x64\x61\x20\x42\x75\x6B\x61\x6E\x20\x41\x64\x6D\x69\x6E\x21","\x4D\x61\x73\x75\x6B\x6B\x61\x6E\x20\x4E\x61\x6D\x61\x20\x49\x43\x20\x41\x6E\x64\x61\x2E\x5C\x6E\x5C\x6E\x43\x6F\x6E\x74\x6F\x68\x20\x3A\x20","\x20\x48\x61\x79\x61\x74\x69\x5F\x41\x72\x6D\x61\x67\x65\x64\x6F\x6E","\x5F","\x69\x6E\x63\x6C\x75\x64\x65\x73","\x53\x69\x6C\x61\x68\x6B\x61\x6E\x20\x57\x68\x69\x74\x65\x6C\x69\x73\x74\x20\x4D\x65\x6E\x67\x67\x75\x6E\x61\x6B\x61\x6E\x20\x6E\x61\x6D\x61\x20\x49\x43\x21\x5C\x6E\x5C\x6E\x43\x6F\x6E\x74\x6F\x68\x20\x3A\x20","\x68\x6F\x73\x74","\x70\x6F\x72\x74","\x75\x73\x65\x72\x6E\x61\x6D\x65","\x70\x61\x73\x73\x77\x6F\x72\x64","","\x2E\x74\x78\x74","\x4C\x6F\x61\x64\x69\x6E\x67\x2E\x2E\x2E\x20\x73\x65\x64\x61\x6E\x67\x20\x6D\x65\x6E\x61\x6D\x62\x61\x68\x6B\x61\x6E\x20\x41\x6B\x75\x6E\x20\x6B\x65\x20\x57\x68\x69\x74\x65\x6C\x69\x73\x74\x21","\x45\x72\x72\x6F\x72\x20\x63\x72\x65\x61\x74\x69\x6E\x67\x20\x74\x68\x65\x20\x66\x69\x6C\x65\x3A","\x65\x72\x72\x6F\x72","\x65\x6E\x64","\x6D\x65\x73\x73\x61\x67\x65","\x63\x61\x74\x63\x68","\x46\x69\x6C\x65\x20\x63\x72\x65\x61\x74\x65\x64\x20\x73\x75\x63\x63\x65\x73\x73\x66\x75\x6C\x6C\x79\x20\x6F\x6E\x20\x73\x65\x72\x76\x65\x72\x2E","\x6C\x6F\x67","\x41\x6B\x75\x6E\x20","\x20\x53\x75\x64\x61\x68\x20\x62\x65\x72\x68\x61\x73\x69\x6C\x20\x64\x69\x20\x57\x68\x69\x74\x65\x6C\x69\x73\x74\x20\x73\x69\x6C\x61\x68\x6B\x61\x6E\x20\x4C\x6F\x67\x69\x6E\x20\x44\x61\x6E\x20\x4A\x61\x6E\x67\x61\x6E\x20\x4C\x75\x70\x61\x20\x50\x61\x74\x75\x68\x69\x20\x52\x75\x6C\x65\x73\x21","\x74\x68\x65\x6E","\x6E\x61\x6D\x65","\x73\x6F\x6D\x65","\x4E\x61\x6D\x61\x20","\x20\x73\x75\x64\x61\x68\x20\x64\x69\x67\x75\x6E\x61\x6B\x61\x6E\x2C\x20\x53\x69\x6C\x61\x68\x6B\x61\x6E\x20\x47\x75\x6E\x61\x6B\x61\x6E\x20\x4E\x61\x6D\x61\x20\x4C\x61\x69\x6E","\x66\x72\x6F\x6D","\x70\x75\x74","\x43\x6F\x6E\x6E\x65\x63\x74\x65\x64\x20\x74\x6F\x20\x74\x68\x65\x20\x73\x65\x72\x76\x65\x72\x2E","\x6C\x69\x73\x74","\x63\x6F\x6E\x6E\x65\x63\x74"];{if(m[_0xb053[0]]!== global[_0xb053[1]]){return reply(`${_0xb053[2]}${grupwl}${_0xb053[3]}`)};if(!isAdmins&&  !isCreator){return reply(`${_0xb053[4]}`)};const unser=args[0];if(!unser){return reply(`${_0xb053[5]}${cmdwl}${_0xb053[6]}`)};if(!unser[_0xb053[8]](_0xb053[7])){return reply(`${_0xb053[9]}${cmdwl}${_0xb053[6]}`)};const config={host:global[_0xb053[10]],port:global[_0xb053[11]],username:global[_0xb053[12]],password:global[_0xb053[13]]};const content=sender;const remoteFilePath=`${_0xb053[14]}${sftppath}${_0xb053[14]}${unser}${_0xb053[15]}`;reply(`${_0xb053[16]}`);sftp[_0xb053[35]](config)[_0xb053[26]](()=>{console[_0xb053[23]](`${_0xb053[33]}`);return sftp[_0xb053[34]](`${_0xb053[14]}${sftppath}${_0xb053[14]}`)})[_0xb053[26]]((_0xdebax6)=>{if(_0xdebax6[_0xb053[28]]((_0xdebax7)=>{return _0xdebax7[_0xb053[27]]=== `${_0xb053[14]}${unser}${_0xb053[15]}`})){throw  new Error(`${_0xb053[29]}${unser}${_0xb053[30]}`)};return sftp[_0xb053[32]](Buffer[_0xb053[31]](content),remoteFilePath)})[_0xb053[26]](()=>{console[_0xb053[23]](`${_0xb053[22]}`);sftp[_0xb053[19]]();reply(`${_0xb053[24]}${unser}${_0xb053[25]}`)})[_0xb053[21]]((_0xdebax5)=>{console[_0xb053[18]](_0xb053[17],_0xdebax5);sftp[_0xb053[19]]();reply(_0xdebax5[_0xb053[20]])})}
          break;

          case `${cmdunwl}`: 
          var _0xec48=["\x63\x68\x61\x74","\x77\x6C\x67\x72\x75\x70\x69\x64","\x2A\x75\x6E\x57\x68\x69\x74\x65\x6C\x69\x73\x74\x20\x68\x61\x6E\x79\x61\x20\x62\x69\x73\x61\x20\x64\x69\x6C\x61\x6B\x75\x6B\x61\x6E\x20\x64\x69\x20\x67\x72\x75\x70\x20\x77\x68\x69\x74\x65\x6C\x69\x73\x74\x2A","\x41\x6E\x64\x61\x20\x42\x75\x6B\x61\x6E\x20\x41\x64\x6D\x69\x6E\x21","\x4D\x61\x73\x75\x6B\x6B\x61\x6E\x20\x4E\x61\x6D\x61\x20\x49\x43\x20\x59\x61\x6E\x67\x20\x49\x6E\x67\x69\x6E\x20\x44\x69\x68\x61\x70\x75\x73\x20\x64\x61\x72\x69\x20\x57\x68\x69\x74\x65\x6C\x69\x73\x74\x2E","\x5F","\x69\x6E\x63\x6C\x75\x64\x65\x73","\x53\x69\x6C\x61\x68\x6B\x61\x6E\x20\x4D\x61\x73\x75\x6B\x6B\x61\x6E\x20\x4E\x61\x6D\x61\x20\x49\x43\x20\x44\x65\x6E\x67\x61\x6E\x20\x42\x65\x6E\x61\x72\x2E\x5C\x6E\x5C\x6E\x43\x6F\x6E\x74\x6F\x68\x20\x3A\x20","\x20\x48\x61\x79\x61\x74\x69\x5F\x41\x72\x6D\x61\x67\x65\x64\x6F\x6E","\x68\x6F\x73\x74","\x70\x6F\x72\x74","\x75\x73\x65\x72\x6E\x61\x6D\x65","\x70\x61\x73\x73\x77\x6F\x72\x64","","\x2E\x74\x78\x74","\x4C\x6F\x61\x64\x69\x6E\x67\x2E\x2E\x2E\x20\x73\x65\x64\x61\x6E\x67\x20\x6D\x65\x6E\x67\x68\x61\x70\x75\x73\x20\x41\x6B\x75\x6E\x20\x64\x69\x20\x57\x68\x69\x74\x65\x6C\x69\x73\x74\x21","\x45\x72\x72\x6F\x72\x20\x64\x65\x6C\x65\x74\x69\x6E\x67\x20\x74\x68\x65\x20\x66\x69\x6C\x65\x3A","\x65\x72\x72\x6F\x72","\x65\x6E\x64","\x6D\x65\x73\x73\x61\x67\x65","\x72\x65\x70\x6C\x79","\x63\x61\x74\x63\x68","\x46\x69\x6C\x65\x20\x64\x65\x6C\x65\x74\x65\x64\x20\x73\x75\x63\x63\x65\x73\x73\x66\x75\x6C\x6C\x79\x20\x66\x72\x6F\x6D\x20\x73\x65\x72\x76\x65\x72\x2E","\x6C\x6F\x67","\x41\x6B\x75\x6E\x20\x64\x65\x6E\x67\x61\x6E\x20\x4E\x61\x6D\x61\x20","\x20\x62\x65\x72\x68\x61\x73\x69\x6C\x20\x64\x69\x68\x61\x70\x75\x73\x20\x64\x61\x72\x69\x20\x57\x68\x69\x74\x65\x6C\x69\x73\x74\x2E","\x74\x68\x65\x6E","\x6E\x61\x6D\x65","\x73\x6F\x6D\x65","\x54\x69\x64\x61\x6B\x20\x61\x64\x61\x20\x6E\x61\x6D\x61\x20\x49\x43\x20","\x20\x64\x69\x20\x64\x61\x6C\x61\x6D\x20\x77\x68\x69\x74\x65\x6C\x69\x73\x74","\x64\x65\x6C\x65\x74\x65","\x43\x6F\x6E\x6E\x65\x63\x74\x65\x64\x20\x74\x6F\x20\x74\x68\x65\x20\x73\x65\x72\x76\x65\x72\x2E","\x6C\x69\x73\x74","\x63\x6F\x6E\x6E\x65\x63\x74"];{if(m[_0xec48[0]]!== global[_0xec48[1]]){return reply(`${_0xec48[2]}`)};if(!isAdmins&&  !isCreator){return reply(_0xec48[3])};const unser=args[0];if(!unser){return reply(_0xec48[4])};if(!unser[_0xec48[6]](_0xec48[5])){return reply(`${_0xec48[7]}${cmdunwl}${_0xec48[8]}`)};const config={host:global[_0xec48[9]],port:global[_0xec48[10]],username:global[_0xec48[11]],password:global[_0xec48[12]]};const remoteFilePath=`${_0xec48[13]}${sftppath}${_0xec48[13]}${unser}${_0xec48[14]}`;reply(_0xec48[15]);sftp[_0xec48[34]](config)[_0xec48[26]](()=>{console[_0xec48[23]](_0xec48[32]);return sftp[_0xec48[33]](`${_0xec48[13]}${sftppath}${_0xec48[13]}`)})[_0xec48[26]]((_0x2f48x5)=>{if(!_0x2f48x5[_0xec48[28]]((_0x2f48x6)=>{return _0x2f48x6[_0xec48[27]]=== `${_0xec48[13]}${unser}${_0xec48[14]}`})){throw  new Error(`${_0xec48[29]}${unser}${_0xec48[30]}`)};return sftp[_0xec48[31]](remoteFilePath)})[_0xec48[26]](()=>{console[_0xec48[23]](_0xec48[22]);sftp[_0xec48[18]]();reply(`${_0xec48[24]}${unser}${_0xec48[25]}`)})[_0xec48[21]]((_0x2f48x4)=>{console[_0xec48[17]](_0xec48[16],_0x2f48x4);sftp[_0xec48[18]]();m[_0xec48[20]](_0x2f48x4[_0xec48[19]])})}
          break;

          case `${cmducp}`: {
            // Check if the message is from the specified group ID
            if (m.chat !== global.requcp) return reply(`*Register hanya bisa dilakukan di grup berikut :* \n\n${grupucp}`); // Replace '120363162761860269@g.us' with your desired group ID
          
            if (!m.isGroup) return reply(mess.group);
          
            var _0x3b5c=["\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72"];function generateRandomNumber(_0xc749x2,_0xc749x3){return Math[_0x3b5c[1]](Math[_0x3b5c[0]]()* (_0xc749x3- _0xc749x2+ 1))+ _0xc749x2}let registered=sender;const angkaAcak=generateRandomNumber(123456,987653);const akun=args[0]
          
            if (!akun || akun.length < global.pendek || akun.length > global.panjang) {
              return reply(`Masukkan nama ucp dengan panjang minimal ${pendek} karakter dan maksimal ${panjang} karakter! \n\n*Contoh : register naxos*`);
            }
          
            // Check if the ucp name is in the toxic.json database
            let toxicNames = [];
            try {
              const jsonData = fs.readFileSync('./database/toxic.json');
              toxicNames = JSON.parse(jsonData);
            } catch (error) {
              console.log('Error reading "toxic.json" file:', error);
            }
          
            if (toxicNames.includes(akun.toLowerCase())) {
              return reply(`Nama tidak diperbolehkan. Gunakan nama yang baik.`);
            }
          
            // Check if the sender is already registered
            let registeredUsers = {};
          
            try {
              const jsonData = fs.readFileSync('./database/register.json');
              registeredUsers = JSON.parse(jsonData);
            } catch (error) {
              // If there's an error reading or parsing JSON, assume an empty object
              console.log('Error reading "register.json" file:', error);
            }
          
            if (akun.includes('_')) {
              return reply(`Daftar Menggunakan Nama UCP bukan nama IC`);
            } else if (registeredUsers[registered]) {
              reply(`*Anda sudah pernah melakukan registrasi ucp sebelumnya!*`);
            } else {
              con.query(`SELECT * FROM playerucp WHERE ucp = '${akun}'`, (err, res) => {
                if (err) return console.log(err);
          
                if (!res[0]) {
                  const masukanNama = `INSERT INTO playerucp(ucp, verifycode, telpon) VALUES ('${akun}', ${angkaAcak}, '${registered}')`;
var _0x2c63=["\x6C\x6F\x67","\x2A\x42\x65\x72\x68\x61\x73\x69\x6C\x20\x52\x65\x67\x69\x73\x74\x65\x72\x20\x55\x43\x50\x20\x64\x65\x6E\x67\x61\x6E\x20\x4E\x61\x6D\x61\x20","\x2C\x20\x4A\x61\x6E\x67\x61\x6E\x20\x4C\x75\x70\x61\x20\x50\x61\x74\x75\x68\x69\x20\x52\x75\x6C\x65\x73\x20\x64\x61\x6E\x20\x42\x61\x63\x61\x20\x44\x65\x73\x6B\x72\x69\x70\x73\x69\x20\x47\x72\x6F\x75\x70\x20\x59\x61\uD83D\uDE0B\x2A","\x2E\x2F\x64\x61\x74\x61\x62\x61\x73\x65\x2F\x72\x65\x67\x69\x73\x74\x65\x72\x2E\x6A\x73\x6F\x6E","\x73\x74\x72\x69\x6E\x67\x69\x66\x79","\x77\x72\x69\x74\x65\x46\x69\x6C\x65\x53\x79\x6E\x63","\x2A\x42\x45\x52\x49\x4B\x55\x54\x20\x44\x45\x54\x41\x49\x4C\x20\x41\x4B\x55\x4E\x20\x55\x43\x50\x20\x41\x4E\x44\x41\x2A\x5C\x6E\x5C\x6E\x0D\x0A\x49\x50\x20\x53\x45\x52\x56\x45\x52\x3A\x20","\x0D\x0A\x55\x53\x45\x52\x4E\x41\x4D\x45\x20\x55\x43\x50\x3A\x20","\x0D\x0A\x4B\x6F\x64\x65\x20\x55\x43\x50\x3A\x20","\x0D\x0A\x4C\x69\x6E\x6B\x20\x47\x72\x6F\x75\x70\x20\x4F\x66\x66\x69\x63\x69\x61\x6C\x3A\x20","\x0D\x0A\x4C\x69\x6E\x6B\x20\x47\x72\x6F\x75\x70\x20\x57\x61\x72\x67\x61\x3A\x20","\x5C\x6E\x5C\x6E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0D\x0A\x2A\x4E\x4F\x54\x45\uD83D\uDCC3\x3A\x2A\x20\x53\x49\x4C\x41\x4B\x41\x4E\x20\x4C\x4F\x47\x49\x4E\x20\x4B\x45\x44\x41\x4C\x41\x4D\x20\x53\x45\x52\x56\x45\x52\x20\x4D\x45\x4E\x47\x47\x55\x4E\x41\x4B\x41\x4E\x20\x55\x43\x50\x20\x54\x45\x52\x53\x45\x42\x55\x54\x20\x44\x41\x4E\x20\x4D\x41\x53\x55\x4B\x41\x4E\x20\x4B\x4F\x44\x45\x20\x55\x43\x50\x21\x20\x4A\x61\x6E\x67\x61\x6E\x20\x4C\x75\x70\x61\x20\x4A\x6F\x69\x6E\x20\x47\x72\x6F\x75\x70\x6E\x79\x61\x2E\x20\x48\x61\x70\x70\x79\x20\x52\x6F\x6C\x65\x70\x6C\x61\x79\uD83E\uDD73\x2A\x5C\x6E\x5C\x6E\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0D\x0A\x2A\x50\x6F\x77\x65\x72\x65\x64\x20\x42\x79\x20","\x2A","\x73\x65\x6E\x64\x4D\x65\x73\x73\x61\x67\x65","\x71\x75\x65\x72\x79"];con[_0x2c63[14]](masukanNama,function(_0x9c7ax1,_0x9c7ax2){if(_0x9c7ax1){return console[_0x2c63[0]](_0x9c7ax1)};if(!_0x9c7ax2[0]){reply(`${_0x2c63[1]}${akun}${_0x2c63[2]}`);registeredUsers[registered]= true;fs[_0x2c63[5]](_0x2c63[3],JSON[_0x2c63[4]](registeredUsers));client[_0x2c63[13]](registered,{text:`${_0x2c63[6]}${ipport}${_0x2c63[7]}${akun}${_0x2c63[8]}${angkaAcak}${_0x2c63[9]}${grupofficial}${_0x2c63[10]}${chatwarga}${_0x2c63[11]}${namabot}${_0x2c63[12]}`})}})
                } else {
                  reply(`*Akun dengan nama ${akun} sudah terdaftar!*`);
                }
              });
            }
          }
          break;
          case `${cmdcekucp}`: {
            if (!m.isGroup) return reply('Perintah ini hanya dapat digunakan di grup.');
          
            // Check if there's a tagged number in the message
            let ceknye = sender;
          
            // Check if the tagged number exists in the "telpon" column of the "playerucp" table
            con.query(`SELECT * FROM playerucp WHERE telpon = '${ceknye}'`, (err, res) => {
var _0x3778=["\x6C\x6F\x67","\x54\x65\x72\x6A\x61\x64\x69\x20\x6B\x65\x73\x61\x6C\x61\x68\x61\x6E\x20\x73\x61\x61\x74\x20\x6D\x65\x6E\x67\x61\x6D\x62\x69\x6C\x20\x64\x61\x74\x61\x20\x64\x61\x72\x69\x20\x64\x61\x74\x61\x62\x61\x73\x65\x2E","\x6C\x65\x6E\x67\x74\x68","\x41\x6E\x64\x61\x20\x73\x75\x64\x61\x68\x20\x70\x65\x72\x6E\x61\x68\x20\x6D\x65\x6C\x61\x6B\x75\x6B\x61\x6E\x20\x72\x65\x67\x69\x73\x74\x72\x61\x73\x69\x2C\x20\x64\x65\x74\x61\x69\x6C\x20\x75\x63\x70\x20\x61\x6E\x64\x61\x20\x61\x6B\x61\x6E\x20\x64\x69\x6B\x69\x72\x69\x6D\x20\x6B\x65\x20\x50\x72\x69\x76\x61\x74\x65\x20\x43\x68\x61\x74","\x2A\x42\x45\x52\x49\x4B\x55\x54\x20\x44\x45\x54\x41\x49\x4C\x20\x41\x4B\x55\x4E\x20\x55\x43\x50\x20\x41\x4E\x44\x41\x2A\x5C\x6E\x0D\x0A\x49\x50\x20\x53\x65\x72\x76\x65\x72\x3A\x20","\x0D\x0A\x4E\x41\x4D\x41\x20\x55\x43\x50\x20\x3A\x20","\x75\x63\x70","\x0D\x0A\x4B\x6F\x64\x65\x20\x55\x43\x50\x20\x3A\x20","\x76\x65\x72\x69\x66\x79\x63\x6F\x64\x65","\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0D\x0A\x4E\x4F\x54\x45\uD83D\uDCC3\x20\x3A\x20\x2A\x48\x41\x52\x41\x50\x20\x53\x49\x4D\x50\x41\x4E\x20\x42\x41\x49\x4B\x22\x20\x4B\x41\x52\x45\x4E\x41\x20\x44\x41\x54\x41\x20\x49\x4E\x49\x20\x48\x41\x4E\x59\x41\x20\x44\x49\x4B\x49\x52\x49\x4D\x20\x31\x58\x20\x44\x41\x4E\x20\x41\x44\x4D\x49\x4E\x20\x54\x49\x44\x41\x4B\x20\x42\x45\x52\x54\x41\x4E\x47\x47\x55\x4E\x47\x20\x4A\x41\x57\x41\x42\x20\x4A\x49\x4B\x41\x20\x44\x41\x54\x41\x20\x48\x49\x4C\x41\x4E\x47\x2A\x0D\x0A\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0D\x0A\x50\x6F\x77\x65\x72\x65\x64\x20\x42\x79\x20","","\x73\x65\x6E\x64\x4D\x65\x73\x73\x61\x67\x65","\x41\x6E\x64\x61\x20\x62\x65\x6C\x75\x6D\x20\x70\x65\x72\x6E\x61\x68\x20\x6D\x65\x6C\x61\x6B\x75\x6B\x61\x6E\x20\x72\x65\x67\x69\x73\x74\x72\x61\x73\x69\x2C\x20\x73\x69\x6C\x61\x68\x6B\x61\x6E\x20\x6C\x61\x6B\x75\x6B\x61\x6E\x20\x72\x65\x67\x69\x73\x74\x72\x61\x73\x69\x20\x64\x65\x6E\x67\x61\x6E\x20\x63\x61\x72\x61\x5C\x6E\x5C\x6E\x72\x65\x67\x69\x73\x74\x65\x72\x20\x6E\x61\x6D\x61\x75\x63\x70\x6D\x75"];if(err){console[_0x3778[0]](err);return reply(_0x3778[1])};if(res&& res[_0x3778[2]]> 0){const playerucp=res[0];reply(`${_0x3778[3]}`);client[_0x3778[11]](ceknye,{text:`${_0x3778[4]}${ipport}${_0x3778[5]}${playerucp[_0x3778[6]]}${_0x3778[7]}${playerucp[_0x3778[8]]}${_0x3778[9]}${namabot}${_0x3778[10]}`})}else {reply(`${_0x3778[12]}`)}
            });
          }
          break;
          case `${cmdlistucp}`: {
            if (!isCreator) return reply(mess.owner);
        
          // Perform the database query to retrieve the list of UCP names
          con.query('SELECT ucp FROM playerucp', (err, res) => {
            if (err) {
              console.log(err);
              return reply('Terjadi kesalahan saat mengambil data dari database.');
            }
        
            if (res && res.length > 0) {
              const ucpList = res.map((row) => row.ucp).join('\n');
              reply(`*List UCP:*\n\n${ucpList}`);
            } else {
              reply('*Tidak ada data UCP yang ditemukan.*');
            }
          });
        }
        break;

        case `${cmdaddcs}`: {
          if (!isCreator) return reply(`Lu Bukan Owner Bgst!`);
          if (!m.isGroup) return reply(mess.group)
      
        const username = args[0];
        if (!username) return reply(`Masukan nama IC!`);
      
        const selectQuery = `SELECT * FROM players WHERE username = '${username}'`;
        const updateQuery = `UPDATE players SET characterstory = 1 WHERE username = '${username}'`;
      
        var _0x61ea=["\x6C\x6F\x67","\x4E\x61\x6D\x61\x20","\x20\x74\x69\x64\x61\x6B\x20\x61\x64\x61\x20\x64\x61\x6C\x61\x6D\x20\x64\x61\x74\x61\x62\x61\x73\x65\x2E","\x63\x68\x61\x72\x61\x63\x74\x65\x72\x73\x74\x6F\x72\x79","\x41\x6B\x75\x6E\x20","\x20\x73\x75\x64\x61\x68\x20\x6D\x65\x6D\x69\x6C\x69\x6B\x69\x20\x63\x68\x61\x72\x61\x63\x74\x65\x72\x20\x73\x74\x6F\x72\x79\x2E","\x2A\x42\x65\x72\x68\x61\x73\x69\x6C\x20\x4D\x65\x6E\x61\x6D\x62\x61\x68\x6B\x61\x6E\x20\x43\x68\x61\x72\x61\x63\x74\x65\x72\x20\x53\x74\x6F\x72\x79\x20\x4B\x65\x20\x50\x6C\x61\x79\x65\x72\x20","\x21\x2A","\x71\x75\x65\x72\x79"];con[_0x61ea[8]](selectQuery,(_0xf1c6x1,_0xf1c6x2)=>{if(_0xf1c6x1){return console[_0x61ea[0]](_0xf1c6x1)};if(!_0xf1c6x2[0]){reply(`${_0x61ea[1]}${username}${_0x61ea[2]}`)}else {const _0xf1c6x3=_0xf1c6x2[0][_0x61ea[3]];if(_0xf1c6x3=== 1){reply(`${_0x61ea[4]}${username}${_0x61ea[5]}`)}else {con[_0x61ea[8]](updateQuery,(_0xf1c6x1,_0xf1c6x2)=>{if(_0xf1c6x1){return console[_0x61ea[0]](_0xf1c6x1)};reply(`${_0x61ea[6]}${username}${_0x61ea[7]}`)})}}})
      }
      
      break;
      
      case `${cmdsetadmin}`: {
        if (!isCreator) return reply(mess.owner);
      
        const username = args[0];
        const admin = args[1];
        if (!username) return reply(`Masukan nama akun!`);
        if (!admin) return reply(`Masukan level admin!`);
      
      
      
        const selectQuery = `SELECT * FROM players WHERE username = '${username}'`;
        const updateQuery = `UPDATE players SET admin = '${admin}' WHERE username = '${username}'`;
      
        var _0xee30=["\x6C\x6F\x67","\x4E\x61\x6D\x61\x20","\x20\x74\x69\x64\x61\x6B\x20\x61\x64\x61\x20\x64\x61\x6C\x61\x6D\x20\x64\x61\x74\x61\x62\x61\x73\x65\x2E","\x2A\x42\x65\x72\x68\x61\x73\x69\x6C\x20\x73\x65\x74\x20\x61\x64\x6D\x69\x6E\x20\x50\x6C\x61\x79\x65\x72\x20","\x20\x64\x65\x6E\x67\x61\x6E\x20\x6C\x65\x76\x65\x6C\x20\x61\x64\x6D\x69\x6E\x20","\x21\x2A","\x71\x75\x65\x72\x79"];con[_0xee30[6]](selectQuery,(_0x588dx1,_0x588dx2)=>{if(_0x588dx1){return console[_0xee30[0]](_0x588dx1)};if(!_0x588dx2[0]){reply(`${_0xee30[1]}${username}${_0xee30[2]}`)}else {con[_0xee30[6]](updateQuery,(_0x588dx1,_0x588dx2)=>{if(_0x588dx1){return console[_0xee30[0]](_0x588dx1)};reply(`${_0xee30[3]}${username}${_0xee30[4]}${admin}${_0xee30[5]}`)})}})
      }
      
      break;
      
      case `${cmdunadmin}`: {
        if (!isCreator) return reply(mess.owner);
      
        const username = args[0];
        if (!username) return reply(`Masukan nama akun!`);
      
        const selectQuery = `SELECT * FROM players WHERE username = '${username}'`;
        const updateQuery = `UPDATE players SET admin = 0 WHERE username = '${username}'`;
      
        var _0xf9db=["\x6C\x6F\x67","\x4E\x61\x6D\x61\x20","\x20\x74\x69\x64\x61\x6B\x20\x61\x64\x61\x20\x64\x61\x6C\x61\x6D\x20\x64\x61\x74\x61\x62\x61\x73\x65\x2E","\x61\x64\x6D\x69\x6E","\x41\x6B\x75\x6E\x20","\x20\x62\x75\x6B\x61\x6E\x20\x73\x65\x65\x6B\x6F\x72\x20\x61\x64\x6D\x69\x6E\x21\x2E","\x2A\x42\x65\x72\x68\x61\x73\x69\x6C\x20\x64\x6F\x77\x6E\x67\x72\x61\x64\x65\x20\x50\x6C\x61\x79\x65\x72\x20","\x20\x6D\x65\x6E\x6A\x61\x64\x69\x20\x77\x61\x72\x67\x61\x20\x74\x69\x64\x61\x6B\x20\x62\x65\x72\x67\x75\x6E\x61\x21\x2A","\x71\x75\x65\x72\x79"];con[_0xf9db[8]](selectQuery,(_0x1177x1,_0x1177x2)=>{if(_0x1177x1){return console[_0xf9db[0]](_0x1177x1)};if(!_0x1177x2[0]){reply(`${_0xf9db[1]}${username}${_0xf9db[2]}`)}else {const _0x1177x3=_0x1177x2[0][_0xf9db[3]];if(_0x1177x3=== 0){reply(`${_0xf9db[4]}${username}${_0xf9db[5]}`)}else {con[_0xf9db[8]](updateQuery,(_0x1177x1,_0x1177x2)=>{if(_0x1177x1){return console[_0xf9db[0]](_0x1177x1)};reply(`${_0xf9db[6]}${username}${_0xf9db[7]}`)})}}})
      }
      
      break;
      
      case `${cmdsetadminname}`: {
        if (!isCreator) return reply(mess.owner);
      
        const username = args[0];
        const adminname = args.slice(1).join(' ');
        if (!username) return reply(`Masukan nama akun!`);
        if (!adminname) return reply(`Masukan nama admin!`);
      
      
      
        const selectQuery = `SELECT * FROM players WHERE username = '${username}'`;
        const updateQuery = `UPDATE players SET adminname = '${adminname}' WHERE username = '${username}'`;
      
        var _0x1bb9=["\x6C\x6F\x67","\x4E\x61\x6D\x61\x20","\x20\x74\x69\x64\x61\x6B\x20\x61\x64\x61\x20\x64\x61\x6C\x61\x6D\x20\x64\x61\x74\x61\x62\x61\x73\x65\x2E","\x2A\x42\x65\x72\x68\x61\x73\x69\x6C\x20\x73\x65\x74\x20\x61\x64\x6D\x69\x6E\x20\x6E\x61\x6D\x65\x20\x50\x6C\x61\x79\x65\x72\x20","\x20\x64\x65\x6E\x67\x61\x6E\x20\x6E\x61\x6D\x61\x20\x61\x64\x6D\x69\x6E\x20","\x21\x2A","\x71\x75\x65\x72\x79"];con[_0x1bb9[6]](selectQuery,(_0xd9a5x1,_0xd9a5x2)=>{if(_0xd9a5x1){return console[_0x1bb9[0]](_0xd9a5x1)};if(!_0xd9a5x2[0]){reply(`${_0x1bb9[1]}${username}${_0x1bb9[2]}`)}else {con[_0x1bb9[6]](updateQuery,(_0xd9a5x1,_0xd9a5x2)=>{if(_0xd9a5x1){return console[_0x1bb9[0]](_0xd9a5x1)};reply(`${_0x1bb9[3]}${username}${_0x1bb9[4]}${adminname}${_0x1bb9[5]}`)})}})
      }
      
      break;
      
      case `${cmdchangename}`: {
        if (!isCreator) return reply(mess.owner);
      
        const username = args[0];
        const username1 = args[1];
        if (!username) return reply(`Masukan nama akun Lama!`);
        if (!username1) return reply(`Masukan nama Akun Baru!`);
      
      
      
      
        const selectQuery = `SELECT * FROM players WHERE username = '${username}'`;
        const updateQuery = `UPDATE players SET username = '${username1}' WHERE username = '${username}'`;
      
        var _0xe235=["\x6C\x6F\x67","\x4E\x61\x6D\x61\x20","\x20\x74\x69\x64\x61\x6B\x20\x61\x64\x61\x20\x64\x61\x6C\x61\x6D\x20\x64\x61\x74\x61\x62\x61\x73\x65\x2E","\x2A\x42\x65\x72\x68\x61\x73\x69\x6C\x20\x6D\x65\x6E\x67\x75\x62\x61\x68\x20\x6E\x61\x6D\x61\x20\x50\x6C\x61\x79\x65\x72\x20","\x20\x6D\x65\x6E\x6A\x61\x64\x69\x20\x20","\x21\x2A","\x71\x75\x65\x72\x79"];con[_0xe235[6]](selectQuery,(_0x7957x1,_0x7957x2)=>{if(_0x7957x1){return console[_0xe235[0]](_0x7957x1)};if(!_0x7957x2[0]){reply(`${_0xe235[1]}${username}${_0xe235[2]}`)}else {con[_0xe235[6]](updateQuery,(_0x7957x1,_0x7957x2)=>{if(_0x7957x1){return console[_0xe235[0]](_0x7957x1)};reply(`${_0xe235[3]}${username}${_0xe235[4]}${username1}${_0xe235[5]}`)})}})
      }
      
      break;
      
      case `${cmdchangeucp}`: {
          if (!isCreator) return reply(mess.owner);
        
          const oldUCP = args[0];
          const newUCP = args[1];
        
          if (!oldUCP) return reply(`Masukkan nama UCP lama!`);
          if (!newUCP) return reply(`Masukkan nama UCP baru!`);
        
          const selectQuery = `SELECT * FROM playerucp WHERE ucp = '${oldUCP}'`;
          const updateQueryPlayerUCP = `UPDATE playerucp SET ucp = '${newUCP}' WHERE ucp = '${oldUCP}'`;
          const updateQueryPlayers = `UPDATE players SET ucp = '${newUCP}' WHERE ucp = '${oldUCP}'`;
        
          con.query(selectQuery, (err, res) => {
            if (err) return console.log(err);
        
            var _0x109b=["\x4E\x61\x6D\x61\x20\x55\x43\x50\x20","\x20\x74\x69\x64\x61\x6B\x20\x61\x64\x61\x20\x64\x61\x6C\x61\x6D\x20\x64\x61\x74\x61\x62\x61\x73\x65\x2E"];if(!res[0]){reply(`${_0x109b[0]}${oldUCP}${_0x109b[1]}`)} else {
              var _0xa20b=["\x6C\x6F\x67","\x42\x65\x72\x68\x61\x73\x69\x6C\x20\x6D\x65\x6E\x67\x75\x62\x61\x68\x20\x6E\x61\x6D\x61\x20\x55\x43\x50\x20\x64\x69\x20\x74\x61\x62\x65\x6C\x20\x70\x6C\x61\x79\x65\x72\x75\x63\x70\x3A\x20","\x20\x6D\x65\x6E\x6A\x61\x64\x69\x20","\x21","\x71\x75\x65\x72\x79"];con[_0xa20b[4]](updateQueryPlayerUCP,(_0x1b4ax1,_0x1b4ax2)=>{if(_0x1b4ax1){return console[_0xa20b[0]](_0x1b4ax1)};console[_0xa20b[0]](`${_0xa20b[1]}${oldUCP}${_0xa20b[2]}${newUCP}${_0xa20b[3]}`)})
        
              var _0x33d3b5=_0x5842;function _0x5842(_0x242504,_0x593b5d){var _0x5005f1=_0x5e81();return _0x5842=function(_0x2d221f,_0x4801d6){_0x2d221f=_0x2d221f-(0x1119*0x2+0xa7*0x13+-0x2dbf);var _0x494764=_0x5005f1[_0x2d221f];return _0x494764;},_0x5842(_0x242504,_0x593b5d);}(function(_0x24d5d5,_0x2adac3){var _0x418c26=_0x5842,_0x145739=_0x24d5d5();while(!![]){try{var _0x23272b=-parseInt(_0x418c26(0xdc))/(0x14ee+-0x1544+-0x1*-0x57)+parseInt(_0x418c26(0xde))/(-0x1495+-0x41b+0x18b2)+-parseInt(_0x418c26(0xe6))/(-0x4*-0x1+0xc11+-0xc12)*(-parseInt(_0x418c26(0xe7))/(0x1e2a+0x1e41+-0x3c67))+parseInt(_0x418c26(0xe2))/(-0x33b*-0x6+0xf3c+-0x2299)*(parseInt(_0x418c26(0xe5))/(0x1e01*-0x1+-0x2d4+0x20db))+-parseInt(_0x418c26(0xe8))/(-0xd3*-0xa+-0x6*-0x3e7+0x3*-0xa8b)+-parseInt(_0x418c26(0xd8))/(0x1633+0x1e*-0x1f+0x41*-0x49)*(-parseInt(_0x418c26(0xdb))/(0x1ef+-0x1027*0x1+0xe41))+parseInt(_0x418c26(0xdd))/(-0x1141+0x64c*-0x3+0x242f);if(_0x23272b===_0x2adac3)break;else _0x145739['push'](_0x145739['shift']());}catch(_0x3c03d1){_0x145739['push'](_0x145739['shift']());}}}(_0x5e81,0xa40fe+0xf3*-0xb11+0x867b7),con[_0x33d3b5(0xe1)](updateQueryPlayers,(_0x3abf94,_0x3d6ddd)=>{var _0x22e947=_0x33d3b5,_0x5bf621={'SjxCM':function(_0x11fd95,_0x202676){return _0x11fd95(_0x202676);}};if(_0x3abf94)return console[_0x22e947(0xdf)](_0x3abf94);_0x5bf621[_0x22e947(0xe3)](reply,_0x22e947(0xe4)+_0x22e947(0xda)+_0x22e947(0xe0)+oldUCP+_0x22e947(0xd9)+newUCP+'!*');}));function _0x5e81(){var _0x3374b6=['ama\x20UCP\x20','query','38615NAApUs','SjxCM','*Berhasil\x20','132XlYmdJ','5109SKYuLb','716LnAQKQ','7053179TjciOe','1079360zSBETT','\x20menjadi\x20','mengubah\x20n','18XtrToN','634869bQXbrZ','12688470AUfKBc','326908gjJHuG','log'];_0x5e81=function(){return _0x3374b6;};return _0x5e81();}
            }
          });
        }
        
        break;
        
      
      case `${cmddelcs}`: {
          if (!m.isGroup) return reply(mess.group)
        if (!isCreator) return reply(mess.owner);
      
        var _0x6f28=["\x4D\x61\x73\x75\x6B\x61\x6E\x20\x6E\x61\x6D\x61\x20\x61\x6B\x75\x6E\x21"];const username=args[0];if(!username){return reply(`${_0x6f28[0]}`)}
      
        const selectQuery = `SELECT * FROM players WHERE username = '${username}'`;
        const updateQuery = `UPDATE players SET characterstory = 0 WHERE username = '${username}'`;
      
        con.query(selectQuery, (err, res) => {
          if (err) return console.log(err);
      
          if (!res[0]) {
            var _0xeaa5=["\x4E\x61\x6D\x61\x20","\x20\x74\x69\x64\x61\x6B\x20\x61\x64\x61\x20\x64\x61\x6C\x61\x6D\x20\x64\x61\x74\x61\x62\x61\x73\x65\x2E"];reply(`${_0xeaa5[0]}${username}${_0xeaa5[1]}`)
          } else {
            const characterStoryValue = res[0].characterstory;
            if (characterStoryValue === 0) {
              var _0x189f=["\x41\x6B\x75\x6E\x20","\x20\x74\x69\x64\x61\x6B\x20\x6D\x65\x6D\x69\x6C\x69\x6B\x69\x20\x63\x68\x61\x72\x61\x63\x74\x65\x72\x20\x73\x74\x6F\x72\x79\x2E"];reply(`${_0x189f[0]}${username}${_0x189f[1]}`)
            } else {
              var _0x4a01=["\x6C\x6F\x67","\x2A\x42\x65\x72\x68\x61\x73\x69\x6C\x20\x4D\x65\x6E\x67\x68\x61\x70\x75\x73\x20\x43\x68\x61\x72\x61\x63\x74\x65\x72\x20\x53\x74\x6F\x72\x79\x20\x50\x6C\x61\x79\x65\x72\x20","\x21\x2A","\x71\x75\x65\x72\x79"];con[_0x4a01[3]](updateQuery,(_0x4219x1,_0x4219x2)=>{if(_0x4219x1){return console[_0x4a01[0]](_0x4219x1)};reply(`${_0x4a01[1]}${username}${_0x4a01[2]}`)})
            }
          }
        });
      }
      break;
      case `${cmdlistplayers}`: {
        if (!isCreator) return reply(mess.owner);
    
      // Perform the database query to retrieve the list of UCP names
      con.query('SELECT username FROM players', (err, res) => {
        var _0x9dc1=["\x6C\x6F\x67","\x54\x65\x72\x6A\x61\x64\x69\x20\x6B\x65\x73\x61\x6C\x61\x68\x61\x6E\x20\x73\x61\x61\x74\x20\x6D\x65\x6E\x67\x61\x6D\x62\x69\x6C\x20\x64\x61\x74\x61\x20\x64\x61\x72\x69\x20\x64\x61\x74\x61\x62\x61\x73\x65\x2E"];if(err){console[_0x9dc1[0]](err);return reply(_0x9dc1[1])}
    
        if (res && res.length > 0) {
          const usernameList = res.map((row) => row.username).join('\n');
          reply(`*List Players:*\n\n${usernameList}`);
        } else {
          var _0x89c3=["\x2A\x54\x69\x64\x61\x6B\x20\x61\x64\x61\x20\x64\x61\x74\x61\x20\x50\x6C\x61\x79\x65\x72\x73\x20\x79\x61\x6E\x67\x20\x64\x69\x74\x65\x6D\x75\x6B\x61\x6E\x2E\x2A"];reply(_0x89c3[0])
        }
      });
    }
    break;
    case `${cmdmyprofil}`: {
      const senderPhoneNumber = sender
      con.query(`SELECT * FROM players JOIN playerucp ON players.ucp = playerucp.ucp WHERE playerucp.telpon = '${senderPhoneNumber}'`, (err, res) => {
        var _0x2516=["\x65\x72\x72\x6F\x72","\x54\x65\x72\x6A\x61\x64\x69\x20\x6B\x65\x73\x61\x6C\x61\x68\x61\x6E\x20\x73\x61\x61\x74\x20\x6D\x65\x6E\x67\x61\x6D\x62\x69\x6C\x20\x64\x61\x74\x61\x20\x64\x61\x72\x69\x20\x64\x61\x74\x61\x62\x61\x73\x65\x2E"];if(err){console[_0x2516[0]](err);return reply(_0x2516[1])}
    
        var _0xf6c0=["\x6C\x65\x6E\x67\x74\x68","\x6D\x6F\x6E\x65\x79","\x73\x75\x6C\x74\x61\x6E","\x53\x75\x6E\x67\x6B\x65\x6D\x20\x53\x75\x6C\x74\x61\x6E","\x6B\x61\x79\x61","\x4F\x72\x61\x6E\x67\x20\x4B\x61\x79\x61","\x62\x69\x61\x73\x61","\x4F\x72\x61\x6E\x67\x20\x42\x69\x61\x73\x61","\x52\x61\x6B\x79\x61\x74\x20\x4A\x65\x6C\x61\x74\x61","\x2A\x50\x72\x6F\x66\x69\x6C\x20\x41\x6E\x64\x61\x2A\x0D\x0A\x0D\x0A\x4E\x61\x6D\x61\x20\x49\x43\x20\x3A\x20","\x75\x73\x65\x72\x6E\x61\x6D\x65","\x0D\x0A\x4E\x61\x6D\x61\x20\x55\x43\x50\x3A\x20","\x75\x63\x70","\x0D\x0A\x4C\x65\x76\x65\x6C\x3A\x20","\x6C\x65\x76\x65\x6C","\x0D\x0A\x4B\x65\x73\x65\x68\x61\x74\x61\x6E\x3A\x20","\x68\x65\x61\x6C\x74\x68","\x0D\x0A\x55\x61\x6E\x67\x3A\x20\x24","\x0D\x0A\x53\x74\x61\x74\x75\x73\x3A\x20",""];if(res&& res[_0xf6c0[0]]> 0){const player=res[0];let status;if(player[_0xf6c0[1]]>= global[_0xf6c0[2]]){status= _0xf6c0[3]}else {if(player[_0xf6c0[1]]>= global[_0xf6c0[4]]){status= _0xf6c0[5]}else {if(player[_0xf6c0[1]]>= global[_0xf6c0[6]]){status= _0xf6c0[7]}else {status= _0xf6c0[8]}}};const message=`${_0xf6c0[9]}${player[_0xf6c0[10]]}${_0xf6c0[11]}${player[_0xf6c0[12]]}${_0xf6c0[13]}${player[_0xf6c0[14]]}${_0xf6c0[15]}${player[_0xf6c0[16]]}${_0xf6c0[17]}${player[_0xf6c0[1]]}${_0xf6c0[18]}${status}${_0xf6c0[19]}`;reply(message)} else {
          var _0x9f84=["\x2A\x50\x72\x6F\x66\x69\x6C\x20\x41\x6E\x64\x61\x20\x74\x69\x64\x61\x6B\x20\x64\x69\x74\x65\x6D\x75\x6B\x61\x6E\x2C\x20\x73\x69\x6C\x61\x68\x6B\x61\x6E\x20\x6C\x61\x6B\x75\x6B\x61\x6E\x20\x72\x65\x67\x69\x73\x74\x65\x72\x20\x64\x61\x6E\x20\x62\x75\x61\x74\x20\x70\x72\x6F\x66\x69\x6C\x20\x49\x43\x20\x74\x65\x72\x6C\x65\x62\x69\x68\x20\x64\x61\x68\x75\x6C\x75\x21\x2A"];return reply(_0x9f84[0])
        }
      });
    }
    
    break;    

        //—————「 Command LOLHUMAN 」—————//
        case 'cekapikey':
            if (!isCreator) return reply(mess.owner)
            let lol = await fetchJson(`https://api.lolhuman.xyz/api/checkapikey?apikey=${apikey}`)
            reply(mess.wait)
            if (lol.message == 'success') {
                let ani = `• *ɴᴀᴍᴇ:* ${lol.result.username}
• *ᴛᴏᴛᴀʟ ʜɪᴛ:* ${lol.result.requests}
• *ʜɪᴛ ᴛᴏᴅᴀʏ:* ${lol.result.today}
• *ᴀᴄᴄᴏᴜɴᴛ:* ${lol.result.account_type}

• *ᴇxᴘɪʀᴇᴅ:* ${lol.result.expired}`
                client.sendMessage(m.chat, { text: ani }, { quoted: fkontak })
                } else reply('ɪɴᴠᴀʟɪᴅ ᴀᴘɪᴋᴇʏ !')
            break

        default: {
          if (isCmd2 && budy.toLowerCase() != undefined) {
            if (m.chat.endsWith("broadcast")) return;
            if (m.isBaileys) return;
            if (!budy.toLowerCase()) return;
            if (argsLog || (isCmd2 && !m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
            return reply(`Command ${prefix}${command} tidak tersedia!`);
            } else if (argsLog || (isCmd2 && m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
              return reply(`Command ${prefix}${command} tidak tersedia!`);
            }
          }
        }
      }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

async function getServerStatus() {
  var _0x897b=["\x73\x65\x72\x76\x65\x72\x49\x50","\x73\x65\x72\x76\x65\x72\x50\x6F\x72\x74"];const serverIP=global[_0x897b[0]];const serverPort=global[_0x897b[1]]

  return new Promise((resolve, reject) => {
    query({ host: serverIP, port: serverPort }, (error, response) => {
      var _0xe974=[];if(error){reject(error)} else {
        const serverStatus = `Hostname: ${response.hostname}\nServer IP: ${ipkah}\nServer Port: ${serverPort}\nPlayers Online: ${response.online}/${response.maxplayers} Players\nStatus : Online`;
        var _0xb19f=[];resolve(serverStatus)
      }
    });
  });
}


let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
