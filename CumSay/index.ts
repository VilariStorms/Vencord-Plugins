import { ApplicationCommandInputType, ApplicationCommandOptionType, findOption } from "@api/Commands";
import definePlugin from "@utils/types";
import { findByPropsLazy } from "@webpack";
import { FluxDispatcher } from "@webpack/common";
import { warn } from "console";

// Credit to Sparkster for the code and Lotus.html for the idea!
// All errors are Deltara's fault

function Cum(cum)
{
    var msg = [
    "\`\`\`",
    "/‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒\\",
    " ",
    ` ${cum} `,
    " ",
    "\\‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒/ ",
    "                 ____     _/ ",
    " ______     ___.'  o \`.  / ",
    "/~----,\\___/,--.   ,_  | ",
    "        `-----'   `---'",
    "\`\`\`"
    ].join("\n")

    return msg;
}




const MessageCreator = findByPropsLazy("getSendMessageOptionsForReply", "sendMessage");
const PendingReplyStore = findByPropsLazy("getPendingReply");

function sendMessage(channelId, message) {
    message = {
        invalidEmojis: [],
        tts: false,
        validNonShortcutEmojis: [],
        ...message
    };
    const reply = PendingReplyStore.getPendingReply(channelId);
    MessageCreator.sendMessage(channelId, message, void 0, MessageCreator.getSendMessageOptionsForReply(reply))
        .then(() => {
            if (reply) {
                FluxDispatcher.dispatch({ type: "DELETE_PENDING_REPLY", channelId });
            }
        });
}


export default definePlugin({
    name: "Cumsay cum",
    description: "Just a bit of cum for all you cum lovers!",
    authors: [{
        id: 1095427026413965364n,
        name: "VilariStorms"
    }],
    dependencies: ["CommandsAPI"],
    commands: [{
        name: "Cumsay",
        description: "I <3 cum!",
        inputType: ApplicationCommandInputType.BUILT_IN,
        options: [{
            name: "text_to_ejaculate",
            description: "cumsay <text-to-ejaculate>",
            type: ApplicationCommandOptionType.STRING,
            required: false
        }],
        execute: async (_, ctx) => {
            var text_to_ejaculate: string = findOption(_, "text_to_ejaculate", "");
            if (!text_to_ejaculate) text_to_ejaculate = "cum!";
            sendMessage(ctx.channel.id, {
                content: Cum(text_to_ejaculate)
            });
        }
    }]
});
