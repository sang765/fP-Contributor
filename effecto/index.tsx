/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

// This plugin is a port from Alyxia's Vendetta plugin
import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import { copyWithToast } from "@utils/misc";
import definePlugin, { OptionType } from "@utils/types";
import { Forms } from "@webpack/common";
import { User } from "discord-types/general";
import virtualMerge from "virtual-merge";


interface UserProfile extends User {
    profileEffectId?: number;
}


const decode = (text: string): string => {
    const codePoints = [...(detectSpecialChars(text) ?? "")].map(c => c.codePointAt(0)).filter((cp): cp is number => cp !== undefined);

    const output: string[] = [];
    for (const char of codePoints) {
        if (char !== undefined) {
            output.push(
                String.fromCodePoint(
                    char - (char > 0xe0000 && char < 0xe007f ? 0xe0000 : 0)
                ).toString()
            );
        }
    }
    const result = output.join("");
    return result ?? "";
};

const encode = (text: string): string => {
    const codePoints = [...text].map(c => c.codePointAt(0)).filter((cp): cp is number => cp !== undefined);

    const output: string[] = [];
    for (const char of codePoints) {
        if (char !== undefined) {
            output.push(
                String.fromCodePoint(
                    char + (char > 0x00 && char < 0x7f ? 0xe0000 : 0)
                ).toString()
            );
        }
    }

    return output.join("");
};

const detectSpecialChars = (text: string): string | null => {
    const codePoints = [...text].map(c => c.codePointAt(0)).filter((cp): cp is number => cp !== undefined);

    const specialChars = codePoints.filter(c => c > 0xe0000 && c < 0xe007f);

    if (specialChars.length > 0) {
        return String.fromCodePoint(...specialChars);
    } else {
        return null;
    }
};

function onChange(selectedOption) {
    const decodedId = encode(selectedOption);
    copyWithToast(decodedId);
}

const settings = definePluginSettings({
    nitroFirst: {
        description: "Select a theme",
        type: OptionType.SELECT,
        onChange: selectedOption => onChange(selectedOption),
        options: [
            {
                label: "Hydro Blast",
                value: "1139323075519852625",
                default: false
            },
            {
                label: "Shatter",
                value: "1139323093114962021",
                default: false
            },
            {
                label: "Magic Hearts",
                value: "1139323100127834223",
                default: false
            },
            {
                label: "Sakura Dreams",
                value: "1174460912699191336",
                default: false
            },
            {
                label: "Power Surge",
                value: "1139323101444845690",
                default: false
            },
            {
                label: "Shuriken Strike",
                value: "1139323100568244356",
                default: false
            },
            {
                label: "Mystic Vines",
                value: "1139323098810822696",
                default: false
            },
            {
                label: "Pixie Dust",
                value: "1139323099251232829",
                default: false
            },
            {
                label: "Discord-Os",
                value: "1139323095304392864",
                default: false
            },
            {
                label: "Breakfast Plate",
                value: "1139323095744790569",
                default: false
            },
            {
                label: "Ghoulish Graffiti",
                value: "1139323101881061467",
                default: false
            },
            {
                label: "Dark Omens",
                value: "1139323102753468546",
                default: false
            },
            {
                label: "Zombie Slime",
                value: "1139323094431973427",
                default: false
            },
            {
                label: "Fall Foliage",
                value: "1159277016571449404",
                default: false
            },
            {
                label: "Lillypad Life",
                value: "1159275733764550728",
                default: false
            },
            {
                label: "Deck the halls",
                value: "1146328960481886318",
                default: false
            },
            {
                label: "Snowy Shenanigans",
                value: "1146328960951668777",
                default: false
            },
            {
                label: "Goozilla",
                value: "1179493515126898809",
                default: false
            },
            {
                label: "Heartzilla",
                value: "1179493515126898812",
                default: false
            },
            {
                label: "Monster Pop",
                value: "1179493515126898815",
                default: false
            },
            {
                label: "Boost Relic",
                value: "1139323097930027068",
                default: false
            },
            {
                label: "Cyberspace",
                value: "1139323098370424933",
                default: false
            }
        ]
    }
});

export default definePlugin({
    name: "Effecto",
    description: "Use discord profile effects without nitro.",
    authors: [{ id: 984015688807100419n, name: "Sampath" }],
    patches: [
        {
            find: "UserProfileStore",
            replacement: {
                match: /(?<=getUserProfile\(\i\){return )(\i\[\i\])/,
                replace: "$self.profileDecodeHook($1)"
            }
        }
    ],


    settingsAboutComponent: () => (
        <Forms.FormSection>
            <Forms.FormTitle tag="h3">Usage</Forms.FormTitle>
            <Forms.FormText>
                After enabling this plugin, you will see effects from people also using Effecto. <br />
                To set Profile effects:
                <ul>
                    <li>Select a theme in below options.</li>
                    <li>Automatically id will be copied.</li>
                    <li>Paste it at the end of bio so that it will be easy to remove, Save it and enjoy!!</li>
                </ul><br />
            </Forms.FormText>
        </Forms.FormSection>
    ),
    settings,
    profileDecodeHook(user: UserProfile) {
        if (user) {
            if (settings.store.nitroFirst && user.profileEffectId) return user;
            const profileeffect = decode(user.bio);
            if (profileeffect) {
                return virtualMerge(user, {
                    premiumType: 2,
                    profileEffectId: `${profileeffect}`
                });
            }
        }
        return user;
    }
});
