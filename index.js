const express = require("express");
const app = express();

// تشغيل الخادم على المنفذ المحدد أو 2000
const listener = app.listen(process.env.PORT || 2000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/', (req, res) => {
  res.send(`
    <body>
    <center><h1>Bot 24H ON!</h1></center>
    </body>`);
});

// استيراد مكتبات discord.js
const { Client, GatewayIntentBits, Events, ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discordModals = require('discord-modals');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

discordModals(client); // This line ensures discord-modals is initialized

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const CHANNEL_ID = '1270355007732056077';

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  if (message.content === '!apply22912') {
    const embed = new EmbedBuilder()
      .setTitle('Police Sheriff <:5_CancTs:1270510964193890436>')
      .setDescription(`\`\`\`In the name of Allah, the Most Gracious, the Most Merciful\`\`\`

**The Police Academy announces the opening of applications for joining the Sandy Shore Police Department at the rank of <@&1270355006658449518>**

\`\`\`- Do not repeat the application
- The applicant must be 19 years old or older
- The applicant must not have a criminal record with the police
- The applicant must be fully aware of the police regulations
- By applying, you agree to adhere to the test times\`\`\`
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

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isButton() && interaction.customId === 'start_application') {
    const modal = new ModalBuilder()
      .setCustomId('application_form')
      .setTitle('Application Form')
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('applicant_name')
            .setLabel('Your Name:')
            .setPlaceholder('Your name.')
            .setStyle(TextInputStyle.Short)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('applicant_age')
            .setLabel('Your Age:')
            .setPlaceholder('Your age.')
            .setStyle(TextInputStyle.Short)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('applicant_experience')
            .setLabel('Your Experience:')
            .setStyle(TextInputStyle.Paragraph)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('application_reason')
            .setLabel('Reason for Applying:')
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
        { name: 'Applicant Name:', value: name, inline: true },
        { name: 'Applicant Age:', value: age, inline: true },
        { name: 'Applicant Experience:', value: experience, inline: false },
        { name: 'Reason for Applying:', value: reason, inline: false }
      );

    const channel = client.channels.cache.get('1270512463531737128'); // Replace with actual channel ID
    if (channel) {
      await channel.send({ content: `${interaction.user}`, embeds: [embed] });
    }

    await interaction.reply({ content: `**Thank you for applying. We appreciate it.**`, ephemeral: true });
  }
});

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  if (message.content === '!bly') {
    const embed = new EmbedBuilder()
      .setTitle('Police Sheriff <:5_CancTs:1270510964193890436>')
      .setDescription(`\`\`\`Reports\`\`\`
**To report theft, kidnapping, murder, etc.:

- Please fill out the entire form in case of violation = First Warning
- If your report is received by a soldier, you will be notified in private**`)
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

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isButton() && interaction.customId === 'start_reports') {
    const modal = new ModalBuilder()
      .setCustomId('application_bly')
      .setTitle('Report Form')
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('applicant_bly1')
            .setLabel('Your Report:')
            .setPlaceholder('Send the report in detail!')
            .setStyle(TextInputStyle.Short)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('applicant_bly2')
            .setLabel('Report Location:')
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
        { name: 'Report:', value: bly1, inline: true },
        { name: 'Report Location:', value: bly2, inline: true }
      )
      .setColor('#ff0000');

    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) {
      await channel.send({ content: `Reporter: ${interaction.user} & <@&1270355006645604521>`, embeds: [embed] });
    } else {
      console.error('Channel not found');
    }

    await interaction.reply({ content: `**Your report has been sent. A military unit will be dispatched now.**`, ephemeral: true });
  }
});

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  if (message.content === 'خط') {
    try {
      await message.delete(); // حذف الرسالة الأصلية
      await message.channel.send({
        files: ["https://cdn.discordapp.com/attachments/1264163361881329674/1270427347950108723/IMG_9999.jpg"]
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
});


// تسجيل الدخول
client.login(process.env.token);
