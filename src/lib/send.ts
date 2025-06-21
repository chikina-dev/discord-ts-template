import { ActionRowBuilder, AttachmentBuilder, BaseGuildTextChannel, ButtonBuilder, ButtonStyle, CommandInteraction, ColorResolvable, EmbedBuilder, InteractionReplyOptions, InteractionResponse, MessageCreateOptions, MessagePayloadOption, WebhookMessageEditOptions } from "discord.js";
import { styleText } from "util";

function GenerateText(text: string, ephemeral?: true) {
	if (ephemeral) {
		return {content: text, ephemeral: true};
	}
	return {content: text};
}

function GenerateEmbed(text: { title: string, description: string, color: ColorResolvable}) {
	const embedObject = new EmbedBuilder()
														.setColor(text.color)
														.setTitle(text.title)
														.setDescription(text.description)
	return {embeds: [embedObject]};
}

function GenerateButton(id: string, label: string, style: ButtonStyle) {
	const button = new ButtonBuilder()
											.setCustomId(id)
											.setLabel(label)
											.setStyle(style);
	const actionRow = new ActionRowBuilder<ButtonBuilder>()
													.addComponents(button);
	return {components: [actionRow]};
}

function GenerateFile(file: AttachmentBuilder) {
	return {files: [file]};
}

async function SendMessage(channel: BaseGuildTextChannel, data: MessageCreateOptions) {
	sendLog(data);
	return await channel.send(data);
}

async function SendReply(interaction: CommandInteraction, data: InteractionReplyOptions): Promise<InteractionResponse> {
	sendLog(data);
	return await interaction.reply(data);
}

async function SendEdit(interaction: InteractionResponse, data: WebhookMessageEditOptions) {
	sendLog(data);
	return await interaction.edit(data);
}

function sendLog(data: MessagePayloadOption) {
	const text = typeof data === 'object' && !(data.files) ? JSON.stringify(data, null, 1) : data;
	console.log(styleText('bgWhiteBright', styleText('black','----- Send Log -----')));
	console.log(styleText('yellow', `日付: ${new Date().toLocaleString()}`));
	if (typeof text === 'string') {
		console.log(styleText('white', `内容: ${text}\n`));
	} else if (data.files && data.files[0] instanceof AttachmentBuilder) {
		console.log(styleText('white', `ファイル名: ${JSON.stringify(data.files[0].name, null, 1)}`));
		console.log(styleText('white', `画像ファイルのため表示できません\n`));
	}
}

export { GenerateText, GenerateEmbed, GenerateButton, GenerateFile, SendMessage, SendReply, SendEdit};
