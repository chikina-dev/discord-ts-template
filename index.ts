import { Client, Events, GatewayIntentBits, TextChannel } from "discord.js";
import * as send from "./src/lib/send";
// import GenerateRobot from "./src/generate";

const client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });

const message = "正論ハラスメント"

client.once(Events.ClientReady, c => {
  console.log(`起動しました ログインタグは ${c.user.tag}`);
	if (process.env.DISCORD_BOT_NAME != client.user?.username) {
		console.error('設定されたBOT名とログインしたBOT名が一致しません。');
		process.exit(1);
	}
	main();
});

client.login(process.env.DISCORD_BOT_TOKEN).catch((error) => {
	console.error('ログインに失敗しました:', error);
	process.exit(1);
});

function main() {
	try {
		client.user?.setActivity(message, { type: 0 })

		// GenerateRobot(client);

	} catch (error) {
		console.error('An error occurred:', error);
		process.exit(1);
	}
}
