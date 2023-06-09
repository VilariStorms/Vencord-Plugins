import { ApplicationCommandInputType, ApplicationCommandOptionType, findOption } from "@api/Commands";
import definePlugin from "@utils/types";
import { findByPropsLazy } from "@webpack";
import { FluxDispatcher } from "@webpack/common";
import { warn } from "console";

// Credit to Sparkster! 
// All errors are Deltara's fault

const MessageCreator = findByPropsLazy("getSendMessageOptionsForReply", "sendMessage");
const PendingReplyStore = findByPropsLazy("getPendingReply");

// Function to wrap the hidden link with angle brackets. Example: "<https://example.com>"
// This is to prevent Discord from automatically turning the link into an embed.
function wrapLink(link) {
    // If the link is already wrapped, return it as is.
  if (link.startsWith("<") && link.endsWith(">")) return link; 
  // Otherwise, wrap it and return it.

  // Remove any spaces from the link.
  link = link.replace(/\s/g, "");
  // If the link doesn't start with "http" or "https" add "https://" by default.
  if (!link.startsWith("http")) link = "https://" + link;
  // Return the wrapped link.
  return `<${link}>`;
}

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


function gaylilspoiler(HiddenLink: string, RealLink: string){
    HiddenLink = wrapLink(HiddenLink); // Wrap the hidden link.
    var uselessgaystring: string = "  ||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _ _";
    return `${HiddenLink}${uselessgaystring}${RealLink}`;
    
}

export default definePlugin({
    name: "HiddenLink",
    description: "Just a bit of cum for all you cum lovers!",
    authors: [{
        id: 1095427026413965364n,
        name: "VilariStorms"
    }],
    dependencies: ["CommandsAPI"],
    commands: [{
        name: "hiddenlink",
        description: "Send hidden links disguised as another!",
        inputType: ApplicationCommandInputType.BUILT_IN,
        options: [{
            name: "Fake",
            description: "Link to disguise as",
            type: ApplicationCommandOptionType.STRING,
            required: true
        }, {
            name: "Real",
            description: "Link to send",
            type: ApplicationCommandOptionType.STRING,
            required: true

        }],
        execute: async (_, ctx) => {
            var HiddenLink: string = findOption(_, "Fake", "");
            var RealLink: string = findOption(_, "Real", "");
            sendMessage(ctx.channel.id, {
                content: gaylilspoiler(HiddenLink, RealLink)
            });
        }
    }]
});
