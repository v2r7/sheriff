const { Client, GatewayIntentBits, Events, ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, MessageButton } = require('discord.js');
const discordModals = require('discord-modals');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

discordModals(client); // This line ensures discord-modals is initialized

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const CHANNEL_ID = '1270355007732056077';


client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (message.content === '!apply22912') {
    const embed = new EmbedBuilder()
      .setTitle('Police Sheriff <:5_CancTs:1270510964193890436>')
      .setDescription(`\`\`\`بسم الله الرحمن الرحيم , السلام عليكم ورحمة االله وبركاته\`\`\`

**تعلن اكادمية الشرطة فتح التقديم لدى شرطة ساندي شور للانضمام برتبة <@&1270355006658449518>**

\`\`\`- عدم تكرار التقديم
- يجب ان يكون عمر المتقدم 19 فما فوق
- ان لا يكون لدى المتقدم سجل جنائي لدى الشرطة
- ان يكون الشخص على دراية و علم تام بقوانين الشرطة
- في حال قدمت هذا يعني انك ملتزم في اوقات الاختبار\`\`\`
`)
      .setColor('#ada174');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('start_application')
        .setLabel('Apply to Sheriff')
        .setStyle(ButtonStyle.Secondary)
    );

    await message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton() && interaction.customId === 'start_application') {
    const modal = new ModalBuilder()
      .setCustomId('application_form')
      .setTitle('Application Form')
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('applicant_name')
            .setLabel('اسمك :')
            .setPlaceholder('الاسم الكركتير .')
            .setStyle(TextInputStyle.Short)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('applicant_age')
            .setLabel('عمرك :')
            .setPlaceholder('العمر الكركتير .')
            .setStyle(TextInputStyle.Short)
        ),
        new ActionRowBuilder().addComponents( new TextInputBuilder()
                        .setCustomId('applicant_experience')
                        .setLabel('خبراتك :')
                        .setStyle(TextInputStyle.Paragraph)
                    ),
                    new ActionRowBuilder().addComponents(
                      new TextInputBuilder()
                        .setCustomId('application_reason')
                        .setLabel('سبب التقديم :')
                        .setStyle(TextInputStyle.Paragraph)
                    )
                  );

                try {
                  await interaction.showModal(modal);
                } catch (error) {
                  console.error('Error showing modal:', error);
                }
              } else if (interaction.isModalSubmit() && interaction.customId === 'application_form') {
                const name = interaction.fields.getTextInputValue('applicant_name');
                const age = interaction.fields.getTextInputValue('applicant_age');
                const experience = interaction.fields.getTextInputValue('applicant_experience');
                const reason = interaction.fields.getTextInputValue('application_reason');

                const embed = new EmbedBuilder()
                  .setTitle('New Application')
                  .addFields(
                    { name: 'اسم المقدم :', value: name, inline: true },
                    { name: 'عمر المقدم :', value: age, inline: true },
                    { name: 'خبرات المقدم :', value: experience, inline: false },
                    { name: 'سبب تقديم المقدم :', value: reason, inline: false }
                  )

                const channel = client.channels.cache.get('1270512463531737128'); // Replace with actual channel ID
                if (channel) {
                  await channel.send({ content: `${interaction.user}`, embeds: [embed] });
                }

                await interaction.reply({ content: `**نشكرك على تقديمك .
شاكرين لك .**`, ephemeral: true });
              }
            });

/////بلاغات/////

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    if (message.content === '!bly') {
        const embed = new EmbedBuilder()
            .setTitle('Police Sheriff <:5_CancTs:1270510964193890436>')
            .setDescription(`\`\`\`Reports\`\`\`
**للبلاغ عن سرقة،خطف،قتل،الخ

- يرجى كتابة النموذج بالكامل في حال المخالفة = تحذير اول

- في حال استلام بلاغك من احد العسكر سيتم ابلاغك في الخاص**`)
            .setColor('#ada174');

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('start_reports')
                .setLabel('Reports')
                .setStyle(ButtonStyle.Secondary)
        );

        await message.channel.send({ embeds: [embed], components: [row] });
    }
});

// معالج التفاعلات
client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isButton() && interaction.customId === 'start_reports') {
        const modal = new ModalBuilder()
            .setCustomId('application_bly')
            .setTitle('Reports Seriff')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('applicant_bly1')
                        .setLabel('بلاغك :')
                        .setPlaceholder('ارسل البلاغ بتفصيل ! .')
                        .setStyle(TextInputStyle.Short)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('applicant_bly2')
                        .setLabel('موقع البلاغ :')
                        .setStyle(TextInputStyle.Short)
                )
            );

        try {
            await interaction.showModal(modal);
        } catch (error) {
            console.error('Error showing modal:', error);
        }
    } else if (interaction.isModalSubmit() && interaction.customId === 'application_bly') {
        const bly1 = interaction.fields.getTextInputValue('applicant_bly1');
        const bly2 = interaction.fields.getTextInputValue('applicant_bly2');

        const embed = new EmbedBuilder()
            .setTitle('New Report')
            .addFields(
                { name: 'البلاغ :', value: bly1, inline: true },
                { name: 'موقع البلاغ :', value: bly2, inline: true }
            )
            .setColor('#ff0000');

        const channel = client.channels.cache.get(CHANNEL_ID);
        if (channel) {
            await channel.send({ content: `صاحب البلاغ : ${interaction.user} & <@&1270355006645604521>`, embeds: [embed] });
        } else {
            console.error('Channel not found');
        }

        await interaction.reply({ content: `**تم ارسال بلاغك .
سيتم ارسال وحدة عسكرية الان .**`, ephemeral: true });
    }
});


client.on('messageCreate', async (message) => { // ضمان استخدام الحدث الصحيح "messageCreate"
if (message.content === 'خط') {
try {
await message.delete(); // حذف الرسالة الأصلية
await message.channel.send({
files: ["https://cdn.discordapp.com/attachments/1264163361881329674/1270427347950108723/IMG_9999.jpg?ex=66b3a92b&is=66b257ab&hm=0f81c9403a853e69ecd60fb0c6b2121e685efdbde5063ae1700e0fe92705cc36&"]
});
} catch (error) {
console.error('Error sending message:', error);
}
}
});



client.on('messageCreate', message => {
    if (message.content.startsWith('-sk')) {
        message.delete();

        const embed1 = new EmbedBuilder()
            .setTitle('Police Sheriff <:5_CancTs:1270510964193890436>')
            .setImage('https://cdn.discordapp.com/attachments/1125317634414608424/1238434239226183691/970041967708880896.png?ex=663f4543&is=663df3c3&hm=633c784953bb5a73bfc3f71543e7d28b348971f18aa5e4abfe421f8f59b77354&')
            .setColor('#ada174');

      const button1 = new MessageButton()
        .setStyle('url')
        .setLabel('Military Schedule')
      .setURL('https://cdn.discordapp.com/attachments/1227958420729102397/1270690452974342194/IMG_9479.png?ex=66b49e34&is=66b34cb4&hm=ed887147a0bd707d445b7b0ff8ed0d421c49cb0997a4926977f318ef676afd04&');

      const actionRow = new MessageActionRow().addComponents(button1);

      mentionedUser.send({ embed: embed1, content : `${user}`, components: [actionRow] });
            }
          });


// تسجيل الدخول
client.login(process.env.token);
